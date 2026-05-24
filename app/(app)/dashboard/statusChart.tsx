'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

type ChartData = {
  todo: number
  doing: number
  done: number
}

const COLORS = {
  todo: '#3B82F6',
  doing: '#F59E0B',
  done: '#10B981',
}

export function StatusChart({ data }: { data: ChartData }) {
  const total = data.todo + data.doing + data.done

  const slices = [
    { name: 'A fazer', value: data.todo, color: COLORS.todo },
    { name: 'Em andamento', value: data.doing, color: COLORS.doing },
    { name: 'Concluído', value: data.done, color: COLORS.done },
  ]

  if (total === 0) {
    return (
      <div className="h-[180px] flex items-center justify-center text-[13px] text-ink-400">
        Crie tarefas para ver a distribuição.
      </div>
    )
  }

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-[160px] h-[160px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={slices}
              dataKey="value"
              innerRadius={52}
              outerRadius={75}
              paddingAngle={2}
              stroke="none"
            >
              {slices.map((slice) => (
                <Cell key={slice.name} fill={slice.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[22px] font-semibold text-ink-900">
            {total}
          </span>
          <span className="text-[11px] text-ink-400">tarefas</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {slices.map((slice) => (
          <div key={slice.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: slice.color }}
            />
            <span className="text-[13px] text-ink-600 flex-1">
              {slice.name}
            </span>
            <span className="text-[13px] font-semibold text-ink-900">
              {slice.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
