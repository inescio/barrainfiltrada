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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,400&family=DM+Sans:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background selection:bg-primary/30 overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
