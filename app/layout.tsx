import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Barra Infiltrada by Be Coffee',
  description: 'Un ritual itinerante donde el grano, el agua y el tiempo se entrelazan en la perfección efímera.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="dark" lang="es">
      <body className="bg-background text-on-background selection:bg-primary/30 overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
