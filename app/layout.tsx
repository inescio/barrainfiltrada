import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://barraIn-filtrada.com'
const gaId = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Barra In-filtrada — Café de Especialidad',
    template: '%s | Barra In-filtrada',
  },
  description: 'Café de especialidad en espacios que no esperás. Cada edición, un lugar diferente. Calificá el grano, explorá las crónicas.',
  keywords: ['café de especialidad', 'specialty coffee', 'barra In-filtrada', 'be coffee', 'café argentina', 'coffee tasting', 'café pop-up', 'V60', 'chemex'],
  authors: [{ name: 'Be Coffee' }],
  creator: 'Be Coffee',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: siteUrl,
    siteName: 'Barra In-filtrada',
    title: 'Barra In-filtrada — Café de Especialidad',
    description: 'Café de especialidad en espacios que no esperás. Cada edición, un lugar diferente.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Barra In-filtrada — Café de Especialidad' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barra In-filtrada — Café de Especialidad',
    description: 'Café de especialidad en espacios que no esperás. Cada edición, un lugar diferente.',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');})();`,
          }}
        />
        <meta name="theme-color" content="#1c1409" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0..1,0&display=block"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,400&family=DM+Sans:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0..1,0&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background selection:bg-primary/30 overflow-x-hidden">
        {children}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  )
}
