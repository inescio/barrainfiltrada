'use client'
import { useEffect, useState } from 'react'

interface Results {
  count: number
  averages: { general_rating: number } | null
}

export default function LiveVoting() {
  const [data, setData] = useState<Results | null>(null)

  useEffect(() => {
    const load = () =>
      fetch('/api/results')
        .then(r => r.json())
        .then(setData)
        .catch(() => {})
    load()
    const id = setInterval(load, 12000)
    return () => clearInterval(id)
  }, [])

  if (!data || data.count === 0) return null

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <div className="h-px w-12 bg-primary/20"></div>
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">En vivo</span>
        </div>
        <span className="text-on-surface-variant/40 text-[10px]">·</span>
        <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">
          <span className="text-on-surface">{data.count}</span>{' '}
          {data.count === 1 ? 'persona calificó' : 'personas calificaron'}
        </span>
        {data.averages && (
          <>
            <span className="text-on-surface-variant/40 text-[10px]">·</span>
            <span className="font-label-caps text-[10px] text-primary uppercase tracking-widest">
              ★ {data.averages.general_rating.toFixed(1)} promedio
            </span>
          </>
        )}
      </div>
    </div>
  )
}
