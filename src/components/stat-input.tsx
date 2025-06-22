"use client"

interface StatInputProps {
  id: number
  title: string
  client: string
  count: string
  onChange: (id: number, field: string, value: string) => void
  showError?: boolean
}

export default function StatInput({ id, title, client, count, onChange, showError = false }: StatInputProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div>
        <input
          type="text"
          placeholder="커넥플과 함께 성장한"
          className="w-full border rounded-lg p-2"
          value={title}
          onChange={(e) => onChange(id, "title", e.target.value)}
        />
        {showError && <p className="text-sm text-red-500 mt-1">통계정보를 모두 작성해주세요.</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="고객사 기업 · 기관"
          className="w-full border rounded-lg p-2"
          value={client}
          onChange={(e) => onChange(id, "client", e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="12개"
          className="w-full border rounded-lg p-2"
          value={count}
          onChange={(e) => onChange(id, "count", e.target.value)}
        />
      </div>
    </div>
  )
}
