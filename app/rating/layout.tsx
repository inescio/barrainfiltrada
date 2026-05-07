import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calificar el Café',
  description: 'Calificá el grano de hoy. Tu veredicto ayuda a construir la memoria de cada edición de Barra Infiltrada.',
}

export default function RatingLayout({ children }: { children: React.ReactNode }) {
  return children
}
