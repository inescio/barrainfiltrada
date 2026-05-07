import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { createClient } from '@supabase/supabase-js'

export const metadata: Metadata = {
  title: 'Explorar Cafés',
  description: 'Explorá todos los granos de café de especialidad que pasaron por Barra Infiltrada. Origen, proceso, notas de sabor y ratings de la comunidad.',
}

type CoffeeWithStats = {
  id: string
  name: string
  origin: string
  process: string
  altitude: string | null
  roaster: string | null
  flavor_notes: string[]
  is_active: boolean
  avg_rating: number | null
  total_ratings: number
}

async function getCoffees(): Promise<CoffeeWithStats[]> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    )

    const { data: coffees } = await supabase
      .from('coffees')
      .select('id, name, origin, process, altitude, roaster, flavor_notes, is_active')
      .order('is_active', { ascending: false })

    if (!coffees) return []

    const results = await Promise.all(
      coffees.map(async (coffee) => {
        const { data: ratings } = await supabase
          .from('ratings')
          .select('general_rating')
          .eq('coffee_id', coffee.id)

        const total = ratings?.length ?? 0
        const avg =
          total > 0
            ? Math.round((ratings!.reduce((s, r) => s + (r.general_rating ?? 0), 0) / total) * 10) / 10
            : null

        return { ...coffee, avg_rating: avg, total_ratings: total }
      })
    )

    return results
  } catch {
    return fallbackCoffees
  }
}

const fallbackCoffees: CoffeeWithStats[] = [
  {
    id: '1',
    name: 'Kochere Natural',
    origin: 'Etiopía',
    process: 'Natural Seco',
    altitude: '1,950 msnm',
    roaster: 'Inefable',
    flavor_notes: ['Jazmín', 'Moras', 'Té Negro'],
    is_active: true,
    avg_rating: null,
    total_ratings: 0,
  },
  {
    id: '2',
    name: 'El Paraíso',
    origin: 'Colombia',
    process: 'Doble Anaeróbico',
    altitude: '1,800 msnm',
    roaster: 'El Recreo',
    flavor_notes: ['Lychee', 'Yogurt', 'Fruta Roja'],
    is_active: false,
    avg_rating: null,
    total_ratings: 0,
  },
]

export default async function ExplorarPage() {
  const coffees = await getCoffees()

  return (
    <>
      <NavBar showBack />
      <main className="pt-24 pb-section-gap px-6 max-w-container-max mx-auto space-y-12">

        {/* Header */}
        <header className="space-y-3 pt-4">
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.3em]">Curaduría de Origen</span>
          <h1 className="font-headline-sm text-on-surface">Explorar Cafés</h1>
          <p className="font-body-md text-on-surface-variant">
            Todos los varietales que pasaron por la barra, con las calificaciones del grupo.
          </p>
        </header>

        {/* Coffee list */}
        <section className="space-y-6">
          {coffees.map((coffee) => (
            <div key={coffee.id} className="glass-card rounded-xl p-8 space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">
                    {coffee.origin}
                  </span>
                  <h2 className="font-headline-sm text-[28px] mt-1">{coffee.name}</h2>
                  {coffee.roaster && (
                    <p className="font-label-caps text-[12px] text-primary/80 mt-1">Tostado por: {coffee.roaster}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  {coffee.is_active && (
                    <span className="bg-primary text-on-primary font-label-caps text-[9px] px-2 py-0.5 rounded uppercase">
                      Activo hoy
                    </span>
                  )}
                  {coffee.avg_rating !== null ? (
                    <div className="flex items-center gap-1 mt-1">
                      <span
                        className="material-symbols-outlined text-primary text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="font-label-caps text-[14px] text-primary font-bold">{coffee.avg_rating}</span>
                    </div>
                  ) : (
                    <span className="font-label-caps text-[10px] text-on-surface-variant mt-1">Sin calificaciones</span>
                  )}
                </div>
              </div>

              {/* Flavor notes */}
              {coffee.flavor_notes?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {coffee.flavor_notes.map((note) => (
                    <span
                      key={note}
                      className="bg-surface-container-high text-secondary px-3 py-1 rounded-full text-[11px] font-label-caps uppercase"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              )}

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 border-t border-primary/10 pt-6">
                <div>
                  <p className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-1">Proceso</p>
                  <p className="font-body-md text-on-surface">{coffee.process}</p>
                </div>
                {coffee.altitude && (
                  <div>
                    <p className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-1">Altitud</p>
                    <p className="font-body-md text-on-surface">{coffee.altitude}</p>
                  </div>
                )}
              </div>

              {/* Rating count + CTA */}
              <div className="flex justify-between items-center pt-2">
                <span className="font-label-caps text-[10px] text-on-surface-variant">
                  {coffee.total_ratings > 0
                    ? `${coffee.total_ratings} calificación${coffee.total_ratings !== 1 ? 'es' : ''}`
                    : 'Sé el primero en calificar'}
                </span>
                {coffee.is_active && (
                  <Link href="/rating">
                    <button className="bg-primary text-on-primary font-label-caps text-[11px] tracking-widest py-2.5 px-5 rounded-lg uppercase font-bold transition-all active:scale-95">
                      Calificar
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </section>

      </main>
      <Footer variant="centered" />
    </>
  )
}
