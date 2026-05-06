'use client'

import { useState, useEffect } from 'react'
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
      description: 'Notas de té negro, frutos del bosque y un final largo y dulce.',
      origin: 'Sidama, Etiopía',
      originStory: 'Cultivado en la región de Guji, a más de 1.900 metros de altura.',
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
      description: 'Floral, con acidez suave y un retrogusto dulce.',
      origin: 'Huila, Colombia',
      originStory: 'Cultivado en el departamento de Huila, una de las regiones cafeteras más reconocidas de Colombia.',
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

type Averages = {
  general_rating: number
  aroma: number
  acidity: number
  sweetness: number
  body: number
  aftertaste: number
}

export default function RatingPage() {
  const [selectedVarietal, setSelectedVarietal] = useState(0)
  const [generalRating, setGeneralRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [attributes, setAttributes] = useState<Record<AttributeKey, number>>({
    aroma: 0,
    acidity: 0,
    sweetness: 0,
    body: 0,
    aftertaste: 0,
  })
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [liveCount, setLiveCount] = useState<number | null>(null)
  const [communityResults, setCommunityResults] = useState<{ count: number; averages: Averages } | null>(null)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/count')
        const data = await res.json()
        setLiveCount(data.count)
      } catch {
        // silently fail, keep null
      }
    }
    fetchCount()
    const interval = setInterval(fetchCount, 30000)
    return () => clearInterval(interval)
  }, [])

  const currentVarietal = varietals[selectedVarietal]

  const handleBarClick = (key: AttributeKey, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const score = Math.max(1, Math.min(5, Math.ceil((x / rect.width) * 5)))
    setAttributes(prev => ({ ...prev, [key]: score }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (generalRating === 0) {
      setError('Seleccioná al menos una estrella.')
      return
    }
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coffee_id: null,
          general_rating: generalRating,
          aroma: attributes.aroma || null,
          acidity: attributes.acidity || null,
          sweetness: attributes.sweetness || null,
          body: attributes.body || null,
          aftertaste: attributes.aftertaste || null,
          notes,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al enviar')
      }

      const resultsRes = await fetch('/api/results')
      const resultsData = await resultsRes.json()
      if (resultsData.averages) setCommunityResults(resultsData)

      setSubmitted(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al enviar tu calificación'
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
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              {liveCount !== null ? `${liveCount} personas calificaron hoy` : 'Cargando...'}
            </span>
          </div>
        </header>

        {/* Varietal Selection */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Seleccioná tu Varietal</h2>
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
                  <Image src={v.image} alt={v.name} fill className="object-cover grayscale-[0.3]" />
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

        {/* Rating Form / Results */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="font-display-md text-[32px] text-on-surface">Calificá tu Ritual</h2>
            <p className="font-body-md text-on-surface-variant">Calificá cada atributo según lo que percibís en la taza.</p>
          </div>

          {submitted ? (
            <Results
              myRating={generalRating}
              myAttributes={attributes}
              communityResults={communityResults}
            />
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

              {/* Attribute Bars */}
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
                        <span className="text-primary font-bold">{score > 0 ? `${score}/5` : '–'}</span>
                      </div>
                      <div
                        className="h-[6px] w-full bg-surface-container-highest rounded-full overflow-hidden cursor-pointer"
                        onClick={(e) => handleBarClick(key as AttributeKey, e)}
                      >
                        <div
                          className="h-full bg-primary transition-all duration-150 rounded-full"
                          style={{ width: score > 0 ? `${(score / 5) * 100}%` : '0%' }}
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
                  placeholder="¿Qué percibiste en la taza? Anotá libremente..."
                />
              </div>

              {error && <p className="font-body-md text-error text-sm">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-on-primary font-label-caps text-[14px] tracking-[0.2em] py-5 rounded-lg font-bold shadow-lg shadow-primary/10 active:scale-95 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'ENVIANDO...' : 'ENVIAR MI CALIFICACIÓN'}
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
          <span className="font-label-caps text-[9px]">INICIO</span>
        </Link>
        <a href="#" className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>coffee</span>
          <span className="font-label-caps text-[9px]">BARRA</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">history</span>
          <span className="font-label-caps text-[9px]">HISTORIAL</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">settings_input_component</span>
          <span className="font-label-caps text-[9px]">MÉTODOS</span>
        </a>
      </div>
    </>
  )
}

function Results({
  myRating,
  myAttributes,
  communityResults,
}: {
  myRating: number
  myAttributes: Record<AttributeKey, number>
  communityResults: { count: number; averages: Averages } | null
}) {
  const attributeLabels = [
    { key: 'aroma' as AttributeKey, label: 'Aroma' },
    { key: 'acidity' as AttributeKey, label: 'Acidez' },
    { key: 'sweetness' as AttributeKey, label: 'Dulzura' },
    { key: 'body' as AttributeKey, label: 'Cuerpo' },
    { key: 'aftertaste' as AttributeKey, label: 'Retrogusto' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card rounded-xl p-8 text-center space-y-4">
        <span
          className="material-symbols-outlined text-primary text-[56px] block"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <h3 className="font-headline-sm text-[28px] text-on-surface">¡Gracias!</h3>
        <p className="font-body-md text-on-surface-variant">
          Tu calificación fue registrada.
          {communityResults && (
            <> Ya son <span className="text-primary font-bold">{communityResults.count}</span> personas que cataron hoy.</>
          )}
        </p>
      </div>

      {/* Comparison */}
      {communityResults?.averages && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h4 className="font-label-caps text-label-caps text-primary tracking-[0.2em]">TU CATA VS. EL GRUPO</h4>
          </div>

          {/* General rating comparison */}
          <div className="glass-card rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-primary/10">
              <span className="font-body-md text-on-surface">Impresión general</span>
              <div className="flex items-center gap-4 text-sm font-label-caps">
                <span className="text-on-surface-variant">
                  Grupo: <span className="text-secondary">{communityResults.averages.general_rating}/5</span>
                </span>
                <span className="text-primary">Vos: {myRating}/5</span>
              </div>
            </div>

            {attributeLabels.map(({ key, label }) => {
              const mine = myAttributes[key]
              const avg = communityResults.averages[key]
              if (mine === 0) return null
              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-body-md text-on-surface">{label}</span>
                    <div className="flex items-center gap-4 text-sm font-label-caps">
                      <span className="text-on-surface-variant">
                        Grupo: <span className="text-secondary">{avg}/5</span>
                      </span>
                      <span className="text-primary">Vos: {mine}/5</span>
                    </div>
                  </div>
                  <div className="relative h-[6px] w-full bg-surface-container-highest rounded-full overflow-hidden">
                    {/* Community average */}
                    <div
                      className="absolute h-full bg-secondary/40 rounded-full"
                      style={{ width: `${(avg / 5) * 100}%` }}
                    />
                    {/* My rating */}
                    <div
                      className="absolute h-full bg-primary rounded-full"
                      style={{ width: `${(mine / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-[3px] bg-primary rounded-full" />
                <span className="font-label-caps text-[10px] text-on-surface-variant">Tu calificación</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-[3px] bg-secondary/40 rounded-full" />
                <span className="font-label-caps text-[10px] text-on-surface-variant">Promedio del grupo</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Link href="/">
        <button className="w-full glass-card text-primary border border-primary/20 font-label-caps text-label-caps tracking-widest py-5 px-8 rounded-lg uppercase transition-all active:scale-95">
          Volver al inicio
        </button>
      </Link>
    </div>
  )
}
