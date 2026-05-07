import Link from 'next/link'

const links = [
  { label: 'Instagram', href: 'https://www.instagram.com/gonzalo.barista/', external: true },
  { label: 'Historias de Origen', href: '/explorar', external: false },
  { label: 'Guías de Preparación', href: '/#metodos', external: false },
]

export default function Footer({ variant = 'centered' }: { variant?: 'centered' | 'left' }) {
  if (variant === 'left') {
    return (
      <footer className="w-full py-section-gap border-t border-outline-variant/30 px-6 bg-background">
        <div className="max-w-container-max mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <span className="font-headline-sm text-headline-sm text-primary">Barra In-filtrada</span>
            <nav className="flex flex-col gap-4">
              {links.map(({ label, href, external }) =>
                external ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    key={label}
                    href={href}
                    className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                )
              )}
            </nav>
          </div>
          <div className="pt-8 border-t border-primary/5">
            <p className="font-body-md text-sm text-on-surface-variant opacity-60">
              © 2025 Barra In-filtrada by Be Coffee.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-background border-t border-outline-variant/30 py-16 px-6">
      <div className="flex flex-col items-center text-center gap-12 max-w-container-max mx-auto">
        <span className="font-headline-sm text-[28px] text-primary">Barra In-filtrada</span>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {links.map(({ label, href, external }) =>
            external ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase"
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                href={href}
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase"
              >
                {label}
              </Link>
            )
          )}
        </nav>
        <p className="font-body-md text-on-surface-variant text-[12px] opacity-60">
          © 2025 Barra In-filtrada by Be Coffee.
        </p>
      </div>
    </footer>
  )
}
