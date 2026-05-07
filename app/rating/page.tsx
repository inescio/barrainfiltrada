'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const varietals = [
  {
    id: 'terroir',
    name: 'Terroir',
    origin: 'Brasil',
    process: 'Natural',
    notes: 'Chocolate · Ácido Cítrico',
    image: '/pdf/terroir.jpg',
    active: true,
    profile: {
      roast: 'Medio',
      process: 'Natural',
      varietal: 'Catuaí Amarelo / Mundo Novo',
      flavorNotes: ['Chocolate', 'Azúcar Mascabo', 'Ácido Cítrico', 'Crema'],
      description: 'Ácido, herbal y acaramelado.',
      origin: 'Águas Paulistas, Brasil',
      originStory: 'Fincas selectas a 700–1.100 msnm.',
      originImage: '/pdf/terroir.jpg',
    },
  },
  {
    id: 'berry-bliss',
    name: 'Berry Bliss',
    origin: 'Brasil',
    process: 'Natural',
    notes: 'Arándanos · Jarabe de Arce',
    image: '/pdf/berry-bliss.jpg',
    active: false,
    profile: {
      roast: 'Medio-Ligero',
      process: 'Natural',
      varietal: 'Obatã',
      flavorNotes: ['Arándanos', 'Jarabe de Arce', 'Azúcar Mascabo', 'Crema'],
      description: 'Balanceado y cremoso. Suave, dulce y aromático.',
      origin: 'Alta Mogiana, Brasil',
      originStory: 'Varietal Obatã a 700–1.100 msnm en la región de Alta Mogiana.',
      originImage: '/pdf/berry-bliss.jpg',
    },
  },
  {
    id: 'san-agustin',
    name: 'San Agustín',
    origin: 'Colombia',
    process: 'Lavado',
    notes: 'Frutos Rojos · Caramelo',
    image: '/pdf/san-agustin.jpg',
    active: false,
    profile: {
      roast: 'Medio',
      process: 'Lavado',
      varietal: null,
      flavorNotes: ['Frutos Rojos', 'Caramelo', 'Chocolate Negro'],
      description: 'Balanceado y sutil con cuerpo sedoso y aroma bien intenso.',
      origin: 'Huila, Colombia',
      originStory: 'Finca San Agustín a 1.700 msnm en el departamento del Huila.',
      originImage: '/pdf/san-agustin.jpg',
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
  const [selectedVarietal, setSelectedVarietal] = useState<number | null>(null)
  const [submittedVarietals, setSubmittedVarietals] = useState<Set<number>>(new Set())
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
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [liveCount, setLiveCount] = useState<number | null>(null)
  const [communityResults, setCommunityResults] = useState<{ count: number; averages: Averages } | null>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const allSubmitted = submittedVarietals.size === varietals.length

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/count')
        const data = await res.json()
        setLiveCount(data.count)
      } catch {
        // silently fail
      }
    }
    fetchCount()
    const interval = setInterval(fetchCount, 30000)
    return () => clearInterval(interval)
  }, [])

  const currentVarietal = selectedVarietal !== null ? varietals[selectedVarietal] : null

  const handleSelectVarietal = (i: number) => {
    if (submittedVarietals.has(i)) return
    setSelectedVarietal(i)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const resetForm = () => {
    setGeneralRating(0)
    setHoverRating(0)
    setAttributes({ aroma: 0, acidity: 0, sweetness: 0, body: 0, aftertaste: 0 })
    setNotes('')
    setError('')
  }

  const handleBarClick = (key: AttributeKey, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const score = Math.max(1, Math.min(5, Math.ceil((x / rect.width) * 5)))
    setAttributes(prev => ({ ...prev, [key]: score }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedVarietal === null) {
      setError('Seleccioná un café primero.')
      return
    }
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

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al enviar')

      const newSubmitted = new Set(submittedVarietals)
      newSubmitted.add(selectedVarietal)
      setSubmittedVarietals(newSubmitted)

      const isLast = newSubmitted.size === varietals.length

      if (isLast) {
        try {
          const resultsRes = await fetch('/api/results')
          if (resultsRes.ok) {
            const resultsData = await resultsRes.json()
            if (resultsData.averages) setCommunityResults(resultsData)
          }
        } catch { /* silently fail */ }
      }

      resetForm()
      setSelectedVarietal(null)

      if (!isLast) {
        setTimeout(() => {
          carouselRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
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

        {/* Progress */}
        {submittedVarietals.size > 0 && !allSubmitted && (
          <div className="glass-card rounded-xl px-6 py-4 flex items-center gap-4">
            <div className="flex gap-2">
              {varietals.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    submittedVarietals.has(i) ? 'bg-primary' : 'bg-surface-container-highest'
                  }`}
                />
              ))}
            </div>
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              {submittedVarietals.size} de {varietals.length} cafés calificados — seleccioná el siguiente
            </span>
          </div>
        )}

        {/* Varietal Selection */}
        <section ref={carouselRef} className="space-y-6 scroll-mt-24">
          <div className="space-y-1">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">¿Qué café tomaste?</h2>
            <p className="font-body-md text-on-surface-variant text-sm">Tocá el café que querés calificar</p>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-6 px-6">
            {varietals.map((v, i) => {
              const isSelected = selectedVarietal === i
              const isDone = submittedVarietals.has(i)
              return (
                <div
                  key={v.id}
                  onClick={() => handleSelectVarietal(i)}
                  className={`min-w-[260px] glass-card rounded-xl p-4 space-y-4 transition-all duration-200 ${
                    isDone
                      ? 'opacity-40 cursor-default'
                      : isSelected
                      ? 'ring-2 ring-primary scale-[1.02] opacity-100 cursor-pointer'
                      : selectedVarietal !== null
                      ? 'opacity-60 hover:opacity-80 cursor-pointer'
                      : 'opacity-80 hover:opacity-100 cursor-pointer'
                  }`}
                >
                  <div
                    className="aspect-[4/3] rounded-lg overflow-hidden relative cursor-zoom-in"
                    onClick={(e) => { e.stopPropagation(); setLightbox(v.image) }}
                  >
                    <Image src={v.image} alt={v.name} fill className="object-cover grayscale-[0.3]" />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {v.active && !isDone && (
                        <div className="bg-primary text-on-primary px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
                          ACTIVO
                        </div>
                      )}
                      {isDone && (
                        <div className="bg-primary text-on-primary w-7 h-7 rounded-full flex items-center justify-center shadow-lg">
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                        </div>
                      )}
                      {isSelected && !isDone && (
                        <div className="bg-primary text-on-primary w-7 h-7 rounded-full flex items-center justify-center shadow-lg">
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>coffee</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-headline-sm text-[22px] text-on-surface">{v.name}</h3>
                    <p className="font-body-md text-on-surface-variant text-sm">{v.origin} • {v.process}</p>
                    <p className="font-body-md text-primary/70 text-xs">{v.notes}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-label-caps tracking-wider pt-1 border-t border-primary/20 ${
                    isDone ? 'text-on-surface-variant' : isSelected ? 'text-primary' : 'text-transparent'
                  }`}>
                    {isDone ? (
                      <>
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        Calificado
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                        Calificá abajo
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Descriptor de Perfil */}
        {currentVarietal && (
          <section className="glass-card rounded-xl p-8 space-y-6">
            <h3 className="font-headline-sm text-[20px] text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
              Perfil — {currentVarietal.name}
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
              {currentVarietal.profile.varietal && (
                <div className="col-span-2 space-y-1">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">VARIETAL</span>
                  <p className="font-body-md text-primary">{currentVarietal.profile.varietal}</p>
                </div>
              )}
            </div>
            <div className="space-y-3 pt-4 border-t border-primary/10">
              <span className="font-label-caps text-label-caps text-on-surface-variant">NOTAS DE CATA</span>
              <div className="flex flex-wrap gap-2">
                {currentVarietal.profile.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="bg-surface-container-high text-secondary px-3 py-1.5 rounded-full text-[11px] font-label-caps uppercase"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-2">
              <p className="font-body-md text-on-surface-variant italic">{currentVarietal.profile.description}</p>
            </div>
          </section>
        )}

        {/* Rating Form / Results */}
        <section ref={formRef} className="space-y-8 scroll-mt-24">
          {allSubmitted ? (
            <Results communityResults={communityResults} />
          ) : (
          <>
          <div className="space-y-2">
            <h2 className="font-display-md text-[32px] text-on-surface">Calificá tu Ritual</h2>
            {currentVarietal ? (
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>coffee</span>
                <p className="font-body-md text-primary font-semibold">{currentVarietal.name}</p>
              </div>
            ) : (
              <p className="font-body-md text-on-surface-variant">↑ Seleccioná un café arriba para calificar</p>
            )}
          </div>

          {currentVarietal && (
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
                {submitting ? 'ENVIANDO...' : submittedVarietals.size === varietals.length - 1 ? 'ENVIAR Y VER RESULTADOS' : 'ENVIAR Y CALIFICAR SIGUIENTE'}
              </button>
            </form>
          )}
          </>
          )}
        </section>

        {/* Origin Capsule */}
        {currentVarietal && (
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
        )}

      </main>

      <Footer variant="left" />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <span className="material-symbols-outlined text-[32px]">close</span>
          </button>
          <div className="relative w-full max-w-2xl aspect-[4/3]">
            <Image src={lightbox} alt="Vista ampliada" fill className="object-contain" />
          </div>
        </div>
      )}

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
  communityResults,
}: {
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
      <div className="glass-card rounded-xl p-8 text-center space-y-4">
        <span
          className="material-symbols-outlined text-primary text-[56px] block"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <h3 className="font-headline-sm text-[28px] text-on-surface">¡Calificaste los 3 cafés!</h3>
        <p className="font-body-md text-on-surface-variant">
          {communityResults
            ? <>Ya son <span className="text-primary font-bold">{communityResults.count}</span> personas que cataron hoy.</>
            : 'Tus calificaciones fueron registradas.'}
        </p>
      </div>

      {communityResults?.averages && (
        <div className="space-y-4">
          <h4 className="font-label-caps text-label-caps text-primary tracking-[0.2em]">PROMEDIOS DEL GRUPO</h4>
          <div className="glass-card rounded-xl p-6 space-y-5">
            {[
              { key: 'general_rating', label: 'Impresión general' },
              ...attributeLabels.map(a => ({ key: a.key, label: a.label })),
            ].map(({ key, label }) => {
              const avg = communityResults.averages[key as keyof Averages]
              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-body-md text-on-surface">{label}</span>
                    <span className="text-primary font-bold font-label-caps">{avg}/5</span>
                  </div>
                  <div className="h-[6px] w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(avg / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
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
