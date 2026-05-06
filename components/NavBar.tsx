'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface NavBarProps {
  showBack?: boolean
  showMenu?: boolean
}

export default function NavBar({ showBack = false, showMenu = false }: NavBarProps) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/45 backdrop-blur-[20px] border-b border-primary/20">
      <div className="flex justify-between items-center h-20 px-6 max-w-container-max mx-auto">
        {showBack ? (
          <Link href="/" className="font-headline-sm text-[32px] leading-[1.3] text-on-surface tracking-tight">
            Barra Infiltrada
          </Link>
        ) : (
          <span className="font-headline-sm text-[24px] md:text-headline-sm text-on-surface tracking-tight font-bold">
            Barra Infiltrada by Be Coffee
          </span>
        )}
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="material-symbols-outlined text-primary p-2 rounded-full hover:bg-primary/10 active:scale-95 transition-all"
            aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {dark ? 'light_mode' : 'dark_mode'}
          </button>
          {showMenu && (
            <span className="material-symbols-outlined text-on-surface">menu</span>
          )}
        </div>
      </div>
    </nav>
  )
}
