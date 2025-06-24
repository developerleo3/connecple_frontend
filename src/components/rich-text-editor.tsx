'use client';

import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from './ui/button';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Link as LinkIcon,
    Image as ImageIcon,
    File as FileIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Custom File Attachment Extension
const FileAttachment = Extension.create({
    name: 'fileAttachment',
    addNodeView() {
        return ({ node }) => {
            const dom = document.createElement('div');
            const a = document.createElement('a');
            a.href = node.attrs.src;
            a.textContent = node.attrs.name || 'Attached File';
            a.className = 'text-blue-600 underline';
            a.target = '_blank';
            dom.appendChild(a);
            return { dom };
        };
    },
    addAttributes() {
        return {
            src: { default: null },
            name: { default: null },
        };
    },
    parseHTML() {
        return [{ tag: 'a[data-type="file-attachment"]' }];
    },
    renderHTML({ attrs }) {
        return ['a', { href: attrs.src, 'data-type': 'file-attachment' }, attrs.name || 'Attached File'];
    },
});

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export function RichTextEditor({
    content,
    onChange,
    placeholder = '내용을 입력하세요...',
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false }),
            Image,
            FileAttachment,
            Placeholder.configure({ placeholder }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [attachedFiles, setAttachedFiles] = useState<{ name: string; url: string }[]>([]);

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    // Handle file upload (images or files)
    const handleFileUpload = async (
        file: File,
        type: 'image' | 'file'
    ): Promise<{ url: string; name?: string }> => {
        const formData = new FormData();
        formData.append('file', file);

        // Replace with your actual upload API endpoint
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('File upload failed');
        }

        const { url, name } = await response.json();
        return { url, name: type === 'file' ? name || file.name : undefined };
    };

    // Trigger file input for images
    const handleImageUpload = () => {
        imageInputRef.current?.click();
    };

    // Trigger file input for attachments
    const handleFileUploadTrigger = () => {
        fileInputRef.current?.click();
    };

    // Handle image file selection
    const onImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !editor) return;

        try {
            const { url } = await handleFileUpload(file, 'image');
            editor.chain().focus().setImage({ src: url }).run();
        } catch (error) {
            console.error('Image upload error:', error);
            alert('이미지 업로드에 실패했습니다.');
        }
        event.target.value = ''; // Reset input
    };

    // Handle file attachment selection
    const onFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !editor) return;

        try {
            const { url, name } = await handleFileUpload(file, 'file');
            editor
                .chain()
                .focus()
                .insertContent({
                    type: 'fileAttachment',
                    attrs: { src: url, name },
                })
                .run();
            // Add to attached files list
            setAttachedFiles((prev) => [...prev, { name: name || file.name, url }]);
        } catch (error) {
            console.error('File upload error:', error);
            alert('파일 업로드에 실패했습니다.');
        }
        event.target.value = ''; // Reset input
    };

    if (!editor) {
        return null;
    }

    return (
        <div
            className="bg-white shadow-sm border border-gray-200 rounded-lg min-h-[200px] max-h-[400px] cursor-text focus:outline-none focus:ring-0"
            onClick={() => editor.commands.focus()}
        >
            <div className="border-b border-gray-200 p-2 flex gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'bg-muted hover:cursor-pointer' : 'hover:cursor-pointer'}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'bg-muted hover:cursor-pointer' : 'hover:cursor-pointer'}
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleImageUpload}>
                    <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleFileUploadTrigger}>
                    <FileIcon className="h-4 w-4" />
                </Button>
            </div>
            <div className="max-h-[352px] overflow-y-auto">
                <EditorContent
                    editor={editor}
                    className="p-4 min-h-[300px] max-h-[300px] prose prose-sm max-w-none focus:outline-none focus:ring-0"
                />
            </div>
            {attachedFiles.length > 0 && (
                <div className="border-t border-gray-200 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">첨부된 파일</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        {attachedFiles.map((file, index) => (
                            <li key={index}>
                                <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    {file.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <input
                type="file"
                ref={imageInputRef}
                accept="image/*"
                onChange={onImageSelect}
                className="hidden"
            />
            <input
                type="file"
                ref={fileInputRef}
                accept="*/*"
                onChange={onFileSelect}
                className="hidden"
            />
        </div>
    );
}