import Link from 'next/link'
import Image from 'next/image'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="pt-24 pb-section-gap overflow-x-hidden">

        {/* Hero Section */}
        <section className="px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-label-caps text-label-caps uppercase mb-8 badge-glow animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            Experiencia de degustación
          </div>
          <h1 className="font-display-lg text-[56px] leading-[1] mb-6">
            Barra <span className="italic text-primary font-light">Infiltrada</span>
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-[320px] mx-auto mb-12">
            Café de especialidad en espacios que no esperás. Cada edición, un lugar diferente.
          </p>
          <div className="flex flex-col gap-4 max-w-[280px] mx-auto">
            <Link href="/rating" className="w-full">
              <button className="w-full bg-primary text-on-primary font-label-caps text-label-caps tracking-widest py-5 px-8 rounded-lg uppercase font-bold transition-all active:scale-95 shadow-lg shadow-primary/20">
                ☕ Calificar el Café de Hoy
              </button>
            </Link>
            <Link href="/explorar" className="w-full">
              <button className="w-full glass-card text-primary border border-primary/20 font-label-caps text-label-caps tracking-widest py-5 px-8 rounded-lg uppercase transition-all active:scale-95">
                Explorar Cafés
              </button>
            </Link>
          </div>
        </section>

        {/* Selección de Grano */}
        <section className="px-6 mb-section-gap">
          <div className="flex flex-col gap-4 mb-8">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.3em]">Curaduría de Origen</span>
            <h2 className="font-headline-sm text-on-surface">Selección de Grano</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                origin: 'Brasil', name: 'Terroir', roaster: 'Ángel',
                notes: ['Chocolate', 'Azúcar Mascabo', 'Ácido Cítrico', 'Crema'],
                proceso: 'Natural', altitud: '700–1.100 msnm',
              },
              {
                origin: 'Brasil', name: 'Berry Bliss', roaster: 'Ángel',
                notes: ['Arándanos', 'Jarabe de Arce', 'Azúcar Mascabo', 'Crema'],
                proceso: 'Natural', altitud: '700–1.100 msnm',
              },
              {
                origin: 'Colombia', name: 'San Agustín', roaster: 'Ángel',
                notes: ['Frutos Rojos', 'Caramelo', 'Chocolate Negro'],
                proceso: 'Lavado', altitud: '1.700 msnm',
              },
            ].map((coffee) => (
              <div key={coffee.name} className="glass-card rounded-xl p-8 overflow-hidden relative group">
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">{coffee.origin}</span>
                    <h3 className="font-headline-sm text-[28px] mt-1">{coffee.name}</h3>
                    <p className="font-label-caps text-[12px] text-primary/80 mt-1">Tostado por: {coffee.roaster}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {coffee.notes.map(n => (
                      <span key={n} className="bg-surface-container-high text-secondary px-3 py-1 rounded-full text-[11px] font-label-caps uppercase">{n}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-primary/10 pt-6">
                    <div>
                      <p className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-1">Proceso</p>
                      <p className="font-body-md text-on-surface">{coffee.proceso}</p>
                    </div>
                    <div>
                      <p className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-1">Altitud</p>
                      <p className="font-body-md text-on-surface">{coffee.altitud}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* La precisión del ritual */}
        <section id="metodos" className="px-6 mb-section-gap">
          <div className="flex flex-col gap-4 mb-8">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.3em]">Extracción Consciente</span>
            <h2 className="font-headline-sm text-on-surface">La precisión del ritual</h2>
          </div>
          <div className="space-y-4">
            {/* V60 */}
            <div className="glass-card rounded-xl p-6 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-3xl">coffee_maker</span>
              </div>
              <div className="flex-1">
                <h4 className="font-headline-sm text-[20px]">V60 Hario</h4>
                <div className="flex gap-4 mt-2">
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">3:00 min</span>
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">92°C</span>
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">1:16 Ratio</span>
                </div>
              </div>
            </div>

            {/* Chemex */}
            <div className="glass-card rounded-xl p-6 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-3xl">water_drop</span>
              </div>
              <div className="flex-1">
                <h4 className="font-headline-sm text-[20px]">Chemex</h4>
                <div className="flex gap-4 mt-2">
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">4:30 min</span>
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">94°C</span>
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">1:15 Ratio</span>
                </div>
              </div>
            </div>

            {/* AeroPress */}
            <div className="glass-card rounded-xl p-6 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-3xl">precision_manufacturing</span>
              </div>
              <div className="flex-1">
                <h4 className="font-headline-sm text-[20px]">AeroPress</h4>
                <div className="flex gap-4 mt-2">
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">2:15 min</span>
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">88°C</span>
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Invertido</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Crónicas de Infiltración */}
        <section className="px-6 mb-section-gap">
          <div className="flex flex-col gap-4 mb-8">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.3em]">Archivo de Experiencias</span>
            <h2 className="font-headline-sm text-on-surface">Crónicas de Infiltración</h2>
          </div>
          <div className="space-y-6">
            {/* Edition Card 1 */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden group">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9mWxP58k1Rl9HQEyi1Q-_I30jFSjAnRrN5F9LAVeo4taYBn03JNNJmk9XWhyoBQtk528wFXG72p0mJZeth_rSvtGmdJ4NjQAyzb45MWY4bwBMFtj1VSct_yVPFFNUCJCJ_Z8xzjr0vDaOPYzwUi1wK9bmyfB3cjV4l_lI2s8Sg2Lx2nftmKaB4AJvcgABBTgPcyGw7fF7eLxId3TTKJMiqQz_f2k5ef0mUk2XN55HjBejX2hS1Orlfy1yVhNrlaqQFEAazJ4odefp"
                alt="A moody, high-contrast interior of an art gallery with a minimalist coffee setup."
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="inline-block bg-primary text-on-primary font-label-caps text-[9px] px-2 py-0.5 rounded uppercase mb-3">Edición 04</div>
                <h3 className="font-headline-sm text-white text-[24px]">Galería Objeto</h3>
                <p className="font-body-md text-on-surface-variant text-[14px] mt-2 italic">Arte contemporáneo y café de especialidad.</p>
                <div className="flex gap-4 mt-4 opacity-70">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">groups</span>
                    <span className="text-[12px] font-label-caps">42 Asistentes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    <span className="text-[12px] font-label-caps">4.9 Rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edition Card 2 */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden group">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuByAKWRu8GW3jmc8da_KrH7iLLfCgpNm45wjyLlf5DdkSyW1Nnc7Xjo5NqTYRlV6kQYUPwbhIH6fB42qU23weIBUh4ctFWL5_9RDTl9M5fEqvgAakcDu8zgeI_7h31KWg6YzRQcnBixLomJTRBjDdXCj1yE5tdyYthN6nHoB2A8unPwT2o_b6KksWn_W021g9cPo3ZED4fMYni8Wwr3v0iTBVIXPr6ACoB13XE1mfxYAEVtb161xxsbG-Vg0fZ1MJDHquHHW8HtZ0cV"
                alt="An industrial workshop transformed into a temporary coffee bar."
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="inline-block bg-primary text-on-primary font-label-caps text-[9px] px-2 py-0.5 rounded uppercase mb-3">Edición 03</div>
                <h3 className="font-headline-sm text-white text-[24px]">Taller Industrial</h3>
                <p className="font-body-md text-on-surface-variant text-[14px] mt-2 italic">Espacio industrial, café de altura.</p>
                <div className="flex gap-4 mt-4 opacity-70">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">groups</span>
                    <span className="text-[12px] font-label-caps">35 Asistentes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    <span className="text-[12px] font-label-caps">4.8 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 mb-section-gap">
          <div className="glass-card rounded-2xl p-10 text-center border-primary/40 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px]"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 blur-[80px]"></div>
            <h2 className="font-headline-sm text-[32px] mb-4">Tu veredicto importa</h2>
            <p className="font-body-md text-on-surface-variant mb-10 max-w-[280px] mx-auto">
              Contanos qué sentiste. Tus notas ayudan a construir la memoria de cada edición.
            </p>
            <Link href="/rating" className="w-full">
              <button className="w-full bg-primary text-on-primary font-label-caps text-label-caps tracking-widest py-6 px-8 rounded-lg uppercase font-bold transition-all active:scale-95 flex items-center justify-center gap-3">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grade</span>
                Calificar Grano Actual
              </button>
            </Link>
          </div>
        </section>

      </main>
      <Footer variant="centered" />
    </>
  )
}
