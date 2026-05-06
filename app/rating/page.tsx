'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const varietals = [
  {
    id: 'guji-sidamo',
    name: 'Guji Sidamo G1',
    origin: 'Etiopía',
    process: 'Lavado',
    notes: 'Notas Cítricas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6kFCJ_VSJEORCJwGn_qxIgUJ-cO7Bw4-n8IVcHAG5iTpm8u0_jDhe_oOebw6D0NEloQ54w6jJV_x2DAmPg27oU-J0FW15KdRyalIOp_L9gEVci8K_o4DIbmGfhKUbc3pdq7wwpfnzx7LXUyYZ1hjcdGCe9jX6RriGll2X3ndd_9lJUNw_QSgd0ml28J4F1i-a0aR53-KHG-OYNr3KgYx_dz0Z1SypljXbrg1NTKjzmDk-YxDH69bS5JMPCSQUgMdCxJ9lV9jI7VHK',
    active: true,
    profile: {
      roast: 'Medio-Ligero',
      process: 'Lavado Extendido',
      description: '"Una taza compleja que evoluciona desde notas de té negro hacia una dulzura de durazno maduro."',
      origin: 'Sidama, Ethiopia',
      originStory: 'Explora la historia de la familia Bekele y su compromiso con la biodiversidad en la región de Guji.',
      originImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv_y3FZun3fmJNJtBriQ4ifdPXeDNGL_fIZY3PtZ8ZfID9ISYcm0zj1UDbR7CE8jvC2ZzvJV5DWjWOOqJapCXLa9QcJJbjY-HCkXwj6xlJTCuLBgU-zpitjKYmhsp59SQHCjdQLArmkPko3__2jECToXMU3y9gOr4UCyBMFGTfeLkT4xANgbzDR0fC5Amk-tZaIouW98wYGbCQSIyFZNaihqPPKi1IEmhQcMcdNtGRg3GKhHXUqIAALQkwx3MEOn05Elwr_2Dg2HM7',
    },
  },
  {
    id: 'huila-geisha',
    name: 'Huila Geisha',
    origin: 'Colombia',
    process: 'Natural',
    notes: 'Jazmín',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqZdMom4JQKxg9s0-R9VfCfc77bgoB1u9whpTGTGHfL3X7-G0x0gf-prlXT3jd5Xe80J9AS0K5a1U6lYZh35dFY29-nHTiQM0OYITxVdKppDWohNfUkCgkkXFVX3HgAxQvKnU68Wbugtwr7WV6_0m6Lry1pYuZDaT2TeN-uZ15yT36iEo0uCDf3xgRFcYoNhOPWNzbf7wle5HMA7oRCUTI06215qZCN4_YUoMvwnPNBNiOLrAzDhWqUt-pXHISTlsjkYf2iTbS_SpP',
    active: false,
    profile: {
      roast: 'Ligero',
      process: 'Natural',
      description: '"Notas florales de jazmín con una acidez brillante y un retrogusto dulce prolongado."',
      origin: 'Huila, Colombia',
      originStory: 'Descubre las fincas del departamento de Huila y su tradición cafetera de alta calidad.',
      originImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv_y3FZun3fmJNJtBriQ4ifdPXeDNGL_fIZY3PtZ8ZfID9ISYcm0zj1UDbR7CE8jvC2ZzvJV5DWjWOOqJapCXLa9QcJJbjY-HCkXwj6xlJTCuLBgU-zpitjKYmhsp59SQHCjdQLArmkPko3__2jECToXMU3y9gOr4UCyBMFGTfeLkT4xANgbzDR0fC5Amk-tZaIouW98wYGbCQSIyFZNaihqPPKi1IEmhQcMcdNtGRg3GKhHXUqIAALQkwx3MEOn05Elwr_2Dg2HM7',
    },
  },
]

const attributeLabels = [
  { key: 'aroma', label: 'Aroma' },
  { key: 'acidity', label: 'Acidez' },
  { key: 'sweetness', label: 'Dulzura' },
  { key: 'body', label: 'Cuerpo' },
  { key: 'aftertaste', label: 'Retrogusto' },
]

type AttributeKey = 'aroma' | 'acidity' | 'sweetness' | 'body' | 'aftertaste'

export default function RatingPage() {
  const [selectedVarietal, setSelectedVarietal] = useState(0)
  const [generalRating, setGeneralRating] = useState(4)
  const [hoverRating, setHoverRating] = useState(0)
  const [attributes, setAttributes] = useState<Record<AttributeKey, number>>({
    aroma: 4,
    acidity: 3,
    sweetness: 5,
    body: 4,
    aftertaste: 4,
  })
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const currentVarietal = varietals[selectedVarietal]

  const handleBarClick = (key: AttributeKey, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const ratio = x / rect.width
    const score = Math.max(1, Math.min(5, Math.round(ratio * 5)))
    setAttributes(prev => ({ ...prev, [key]: score }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coffee_id: null,
          general_rating: generalRating,
          aroma: attributes.aroma,
          acidity: attributes.acidity,
          sweetness: attributes.sweetness,
          body: attributes.body,
          aftertaste: attributes.aftertaste,
          notes,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al enviar')
      }

      setSubmitted(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al enviar tu ritual'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <NavBar showBack showMenu />
      <main className="pt-24 pb-section-gap px-6 max-w-container-max mx-auto space-y-12">

        {/* Header */}
        <header className="text-center space-y-2">
          <p className="font-label-caps text-label-caps text-primary uppercase tracking-[0.3em]">Experiencia Sensorial</p>
          <h1 className="font-display-md text-display-md text-on-surface">Barra del Día</h1>
          <div className="flex justify-center items-center gap-2 py-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">12 personas calificando en vivo</span>
          </div>
        </header>

        {/* Varietal Selection */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Selecciona tu Varietal</h2>
            <span className="font-label-caps text-label-caps text-primary">VER TODO</span>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-6 px-6">
            {varietals.map((v, i) => (
              <div
                key={v.id}
                onClick={() => setSelectedVarietal(i)}
                className={`min-w-[280px] glass-card rounded-xl p-4 space-y-4 cursor-pointer transition-all ${
                  selectedVarietal === i ? 'border-primary/40' : 'opacity-70'
                }`}
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden relative">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    className="object-cover grayscale-[0.3]"
                  />
                  {v.active && (
                    <div className="absolute top-2 right-2 bg-primary text-on-primary px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
                      ACTIVO
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-headline-sm text-[24px] text-on-surface">{v.name}</h3>
                  <p className="font-body-md text-on-surface-variant text-sm">{v.origin} • {v.process} • {v.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Descriptor de Perfil */}
        <section className="glass-card rounded-xl p-8 space-y-6">
          <h3 className="font-headline-sm text-[20px] text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
            Descriptor de Perfil
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="font-label-caps text-label-caps text-on-surface-variant">TUESTE</span>
              <p className="font-body-md text-primary">{currentVarietal.profile.roast}</p>
            </div>
            <div className="space-y-1">
              <span className="font-label-caps text-label-caps text-on-surface-variant">PROCESO</span>
              <p className="font-body-md text-primary">{currentVarietal.profile.process}</p>
            </div>
          </div>
          <div className="pt-4 border-t border-primary/10">
            <p className="font-body-md text-on-surface-variant italic">{currentVarietal.profile.description}</p>
          </div>
        </section>

        {/* Rating Form */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="font-display-md text-[32px] text-on-surface">Califica tu Ritual</h2>
            <p className="font-body-md text-on-surface-variant">La precisión en tu percepción define la excelencia del proceso.</p>
          </div>

          {submitted ? (
            <div className="glass-card rounded-xl p-10 text-center space-y-6">
              <span
                className="material-symbols-outlined text-primary text-[64px] block"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <h3 className="font-headline-sm text-[28px] text-on-surface">Ritual Completado</h3>
              <p className="font-body-md text-on-surface-variant max-w-[280px] mx-auto">
                Tu percepción sensorial ha sido registrada. Gracias por contribuir al mapa de sabor de hoy.
              </p>
              <Link href="/">
                <button className="bg-primary text-on-primary font-label-caps text-label-caps tracking-widest py-4 px-8 rounded-lg uppercase font-bold transition-all active:scale-95">
                  Volver al inicio
                </button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* General Rating */}
              <div className="space-y-4">
                <label className="font-label-caps text-label-caps text-primary">IMPRESIÓN GENERAL</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => {
                    const filled = star <= (hoverRating || generalRating)
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setGeneralRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform active:scale-90"
                      >
                        <span
                          className={`material-symbols-outlined text-[40px] ${filled ? 'text-primary' : 'text-outline'}`}
                          style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
                        >
                          star
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Attribute Sliders */}
              <div className="space-y-8 glass-card rounded-xl p-6">
                <h4 className="font-label-caps text-label-caps text-on-surface-variant border-b border-primary/10 pb-4">
                  ATRIBUTOS ESPECÍFICOS
                </h4>
                {attributeLabels.map(({ key, label }) => {
                  const score = attributes[key as AttributeKey]
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-body-md text-on-surface">{label}</span>
                        <span className="text-primary font-bold">{score}/5</span>
                      </div>
                      <div
                        className="h-[2px] w-full bg-surface-container-highest rounded-full overflow-hidden cursor-pointer relative"
                        onClick={(e) => handleBarClick(key as AttributeKey, e)}
                      >
                        <div
                          className="h-full bg-primary transition-all duration-150 rounded-full"
                          style={{ width: `${(score / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Personal Notes */}
              <div className="space-y-4">
                <label className="font-label-caps text-label-caps text-primary">NOTAS DE CATA PERSONALES</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-surface/30 border-b border-primary/30 focus:border-primary focus:ring-0 text-on-surface placeholder:text-on-surface-variant/50 p-4 font-body-md h-32 rounded-lg resize-none"
                  placeholder="Describe la evolución de la temperatura y los descriptores detectados..."
                />
              </div>

              {error && (
                <p className="font-body-md text-error text-sm">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-on-primary font-label-caps text-[14px] tracking-[0.2em] py-5 rounded-lg font-bold shadow-lg shadow-primary/10 active:scale-95 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'ENVIANDO...' : 'ENVIAR MI RITUAL'}
              </button>
            </form>
          )}
        </section>

        {/* Origin Capsule */}
        <section className="relative h-[240px] rounded-xl overflow-hidden glass-card group">
          <Image
            src={currentVarietal.profile.originImage}
            alt={`Paisaje de origen: ${currentVarietal.profile.origin}`}
            fill
            className="object-cover opacity-40 grayscale-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div className="relative z-10 p-6 flex flex-col justify-end h-full">
            <span className="font-label-caps text-[10px] text-primary tracking-widest">CÁPSULA DE ORIGEN</span>
            <h4 className="font-display-md text-[28px] text-on-surface">{currentVarietal.profile.origin}</h4>
            <p className="font-body-md text-sm text-on-surface-variant line-clamp-2">{currentVarietal.profile.originStory}</p>
          </div>
        </section>

      </main>

      <Footer variant="left" />

      {/* Bottom Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-surface/80 backdrop-blur-xl border-t border-primary/10 flex justify-around items-center h-20 z-50 px-6">
        <Link href="/" className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-caps text-[9px]">HOME</span>
        </Link>
        <a href="#" className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>coffee</span>
          <span className="font-label-caps text-[9px]">BARRA</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">history</span>
          <span className="font-label-caps text-[9px]">HISTORY</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">settings_input_component</span>
          <span className="font-label-caps text-[9px]">METHODS</span>
        </a>
      </div>
    </>
  )
}
