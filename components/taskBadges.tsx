const STATUS = {
  todo:  { label: 'A fazer',      dot: '#3B82F6' },
  doing: { label: 'Em andamento', dot: '#F59E0B' },
  done:  { label: 'Concluído',    dot: '#10B981' },
}

const PRIORITY = {
  low:    { label: 'Baixa', cls: 'text-ink-500 bg-ink-100' },
  medium: { label: 'Média', cls: 'text-amber-700 bg-amber-50' },
  high:   { label: 'Alta',  cls: 'text-red-700 bg-red-50' },
}

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS[status as keyof typeof STATUS] ?? STATUS.todo
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-600">
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: s.dot }}
      />
      {s.label}
    </span>
  )
}

export function PriorityBadge({ priority }: { priority: string }) {
  const p = PRIORITY[priority as keyof typeof PRIORITY] ?? PRIORITY.medium
  return (
    <span
      className={`inline-flex items-center text-[11px] font-medium px-1.5 py-0.5 rounded ${p.cls}`}
    >
      {p.label}
    </span>
  )
}
