// 'use client';

// import { useEditor, EditorContent, Extension } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Link from '@tiptap/extension-link';
// import Image from '@tiptap/extension-image';
// import Placeholder from '@tiptap/extension-placeholder';
// import { Button } from './ui/button';
// import {
//     Bold,
//     Italic,
//     List,
//     ListOrdered,
//     Link as LinkIcon,
//     Image as ImageIcon,
//     File as FileIcon,
// } from 'lucide-react';
// import { useEffect, useRef, useState } from 'react';
// import Underline from '@tiptap/extension-underline';
// import Highlight from '@tiptap/extension-highlight';
// import TextAlign from '@tiptap/extension-text-align';
// import Color from '@tiptap/extension-color';


// // Custom File Attachment Extension
// const FileAttachment = Extension.create({
//     name: 'fileAttachment',
//     addNodeView() {
//         return ({ node }) => {
//             const dom = document.createElement('div');
//             const a = document.createElement('a');
//             a.href = node.attrs.src;
//             a.textContent = node.attrs.name || 'Attached File';
//             a.className = 'text-blue-600 underline';
//             a.target = '_blank';
//             dom.appendChild(a);
//             return { dom };
//         };
//     },
//     addAttributes() {
//         return {
//             src: { default: null },
//             name: { default: null },
//         };
//     },
//     parseHTML() {
//         return [{ tag: 'a[data-type="file-attachment"]' }];
//     },
//     renderHTML({ attrs }) {
//         return ['a', { href: attrs.src, 'data-type': 'file-attachment' }, attrs.name || 'Attached File'];
//     },
// });

// interface RichTextEditorProps {
//     content: string;
//     onChange: (content: string) => void;
//     placeholder?: string;
// }

// export function RichTextEditor({
//     content,
//     onChange,
//     placeholder = '내용을 입력하세요...',
// }: RichTextEditorProps) {
//     const editor = useEditor({
//         extensions: [
//             StarterKit.configure({
//                 bulletList: { keepMarks: true, keepAttributes: false },
//                 orderedList: { keepMarks: true, keepAttributes: false },
//             }),
//             Underline,
//             Highlight,
//             Color,
//             TextAlign.configure({
//                 types: ['heading', 'paragraph'],
//             }),
//             Link.configure({ openOnClick: false }),
//             Image,
//             FileAttachment,
//             Placeholder.configure({ placeholder }),
//         ],
//         content,
//         onUpdate: ({ editor }) => {
//             onChange(editor.getHTML());
//         },
//     });

//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const imageInputRef = useRef<HTMLInputElement>(null);
//     const [uploading, setUploading] = useState(false);

//     useEffect(() => {
//         if (editor && content !== editor.getHTML()) {
//             editor.commands.setContent(content);
//         }
//     }, [content, editor]);

//     // Trigger file input for images
//     const handleImageUpload = () => {
//         imageInputRef.current?.click();
//     };

//     // Trigger file input for attachments
//     const handleFileUploadTrigger = () => {
//         fileInputRef.current?.click();
//     };

//     // Handle image file selection
//     const onImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (!file || !editor) return;

//         if (file.size > 5 * 1024 * 1024) {
//             alert('파일 크기는 5MB를 초과할 수 없습니다.');
//             return;
//         }

//         setUploading(true);
//         try {
//             const { url } = await handleFileUpload(file, 'image');
//             editor.chain().focus().setImage({ src: url }).run();
//         } catch (error) {
//             console.error('Image upload error:', error);
//             alert('이미지 업로드에 실패했습니다.');
//         } finally {
//             setUploading(false);
//             event.target.value = ''; // Reset input
//         }
//     };

//     if (!editor) {
//         return null;
//     }

//     return (
//         <div
//             className="bg-white shadow-sm border border-gray-200 rounded-lg min-h-[200px] max-h-[400px] cursor-text focus:outline-none focus:ring-0"
//             onClick={() => editor.commands.focus()}
//         >
//             <div className="border-b border-gray-200 p-2 flex gap-1">
//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => editor.chain().focus().toggleBold().run()}
//                     className={editor.isActive('bold') ? 'bg-muted hover:cursor-pointer' : 'hover:cursor-pointer'}
//                     disabled={uploading}
//                 >
//                     <Bold className="h-4 w-4" />
//                 </Button>
//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => editor.chain().focus().toggleItalic().run()}
//                     className={editor.isActive('italic') ? 'bg-muted hover:cursor-pointer' : 'hover:cursor-pointer'}
//                     disabled={uploading}
//                 >
//                     <Italic className="h-4 w-4" />
//                 </Button>
//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => editor.chain().focus().toggleUnderline().run()}
//                     className={editor.isActive('underline') ? 'bg-muted' : ''}
//                 >
//                     <u className="text-sm">U</u>
//                 </Button>

//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => editor.chain().focus().toggleStrike().run()}
//                     className={editor.isActive('strike') ? 'bg-muted' : ''}
//                 >
//                     <s className="text-sm">S</s>
//                 </Button>

//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => editor.chain().focus().toggleHighlight().run()}
//                     className={editor.isActive('highlight') ? 'bg-muted' : ''}
//                 >
//                     <span className="bg-yellow-300 px-1">H</span>
//                 </Button>

//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => editor.chain().focus().toggleCode().run()}
//                     className={editor.isActive('code') ? 'bg-muted' : ''}
//                 >
//                     {'<>'}
//                 </Button>

//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//                     className={editor.isActive('codeBlock') ? 'bg-muted' : ''}
//                 >
//                     {'{ }'}
//                 </Button>

//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => editor.chain().focus().toggleBlockquote().run()}
//                     className={editor.isActive('blockquote') ? 'bg-muted' : ''}
//                 >
//                     “”
//                 </Button>

//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => editor.chain().focus().setColor('#EF4444').run()}
//                 >
//                     <span className="w-4 h-4 rounded-full bg-red-500 inline-block" />
//                 </Button>

//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => editor.chain().focus().setTextAlign('left').run()}
//                 >
//                     좌
//                 </Button>
//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => editor.chain().focus().setTextAlign('center').run()}
//                 >
//                     중
//                 </Button>
//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => editor.chain().focus().setTextAlign('right').run()}
//                 >
//                     우
//                 </Button>
//             </div>
//             <div className="max-h-[352px] overflow-y-auto">
//                 <EditorContent
//                     editor={editor}
//                     className="p-4 min-h-[300px] max-h-[300px] prose prose-sm max-w-none focus:outline-none focus:ring-0"
//                 />
//             </div>

//             <input
//                 type="file"
//                 ref={imageInputRef}
//                 accept="image/*"
//                 onChange={onImageSelect}
//                 className="hidden"
//                 disabled={uploading}
//             />

//             {uploading && (
//                 <div className="p-2 text-center text-sm text-gray-600">업로드 중...</div>
//             )}
//         </div>
//     );
// }

'use client';

import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from './ui/button';
import {
    Bold,
    Italic,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const PreserveWhitespace = Extension.create({
    name: 'preserveWhitespace',
    addGlobalAttributes() {
        return [
            {
                types: ['paragraph'],
                attributes: {
                    'data-keep-empty': {
                        default: null,
                    },
                },
            },
        ];
    },
});


interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder = '내용을 입력하세요...' }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            PreserveWhitespace,
            Underline,
            Highlight,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    const imageInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);



    if (!editor) {
        return null;
    }

    return (
        <div
            className="bg-white shadow-sm border border-gray-200 rounded-lg min-h-[200px] max-h-[400px] cursor-text focus:outline-none focus:ring-0"
            onClick={() => editor.commands.focus()}
        >
            <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1">
                <Button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-muted' : ''}>
                    <Bold className="h-4 w-4" />
                </Button>
                <Button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-muted' : ''}>
                    <Italic className="h-4 w-4" />
                </Button>
                <Button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'bg-muted' : ''}>
                    <u className="text-sm">U</u>
                </Button>
                <Button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'bg-muted' : ''}>
                    <s className="text-sm">S</s>
                </Button>

                {/* Text Align */}
                {['left', 'center', 'right'].map((align) => (
                    <Button
                        key={align}
                        onClick={() => editor.chain().focus().setTextAlign(align).run()}
                        className={editor.isActive({ textAlign: align }) ? 'bg-muted' : ''}
                    >
                        {align[0].toUpperCase()}
                    </Button>
                ))}
            </div>

            <div className="max-h-[352px] overflow-y-auto">
                <EditorContent
                    editor={editor}
                    className="p-4 min-h-[300px] max-h-[300px] prose prose-sm max-w-none focus:outline-none focus:ring-0"
                />
            </div>


            {uploading && <div className="p-2 text-center text-sm text-gray-600">업로드 중...</div>}
        </div>
    );
}