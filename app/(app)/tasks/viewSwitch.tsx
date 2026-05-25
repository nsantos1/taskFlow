'use client'

type View = 'list' | 'board'

export function ViewSwitch({
  view,
  onChange,
}: {
  view: View
  onChange: (v: View) => void
}) {
  const options: { value: View; label: string }[] = [
    { value: 'list', label: 'Lista' },
    { value: 'board', label: 'Quadro' },
  ]

  return (
    <div className="flex gap-0.5 p-0.5 rounded-lg bg-surface-2 border border-border-base">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`h-7 px-3 rounded-md text-[12px] font-medium transition-colors ${
            view === opt.value
              ? 'bg-elevated text-text-primary shadow-sm'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
