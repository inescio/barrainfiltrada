import Link from 'next/link'
import Image from 'next/image'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import LiveVoting from '@/components/LiveVoting'

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="pt-24 pb-section-gap overflow-x-hidden">

        {/* Hero Section */}
        <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">

          {/* Coffee beans SVG pattern — subtle en light, visible en dark */}
          <div className="absolute inset-0 overflow-hidden dark:opacity-[0.18] opacity-[0.06] pointer-events-none select-none" aria-hidden="true">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="coffee-beans" x="0" y="0" width="110" height="110" patternUnits="userSpaceOnUse">
                  {/* Bean A */}
                  <g transform="translate(22,20) rotate(-30)">
                    <ellipse cx="0" cy="0" rx="9" ry="14" fill="none" stroke="#7a5c2e" strokeWidth="1.3"/>
                    <path d="M0,-12 C-4,-5 4,5 0,12" fill="none" stroke="#7a5c2e" strokeWidth="1"/>
                  </g>
                  {/* Bean B */}
                  <g transform="translate(78,75) rotate(20)">
                    <ellipse cx="0" cy="0" rx="10" ry="15" fill="none" stroke="#7a5c2e" strokeWidth="1.3"/>
                    <path d="M0,-13 C-4,-5 4,5 0,13" fill="none" stroke="#7a5c2e" strokeWidth="1"/>
                  </g>
                  {/* Bean C */}
                  <g transform="translate(88,20) rotate(50)">
                    <ellipse cx="0" cy="0" rx="7" ry="11" fill="none" stroke="#7a5c2e" strokeWidth="1"/>
                    <path d="M0,-9 C-3,-4 3,4 0,9" fill="none" stroke="#7a5c2e" strokeWidth="0.8"/>
                  </g>
                  {/* Bean D */}
                  <g transform="translate(20,88) rotate(-15)">
                    <ellipse cx="0" cy="0" rx="7" ry="11" fill="none" stroke="#7a5c2e" strokeWidth="1"/>
                    <path d="M0,-9 C-3,-4 3,4 0,9" fill="none" stroke="#7a5c2e" strokeWidth="0.8"/>
                  </g>
                  {/* Bean E (tiny accent) */}
                  <g transform="translate(55,42) rotate(70)">
                    <ellipse cx="0" cy="0" rx="5" ry="8" fill="none" stroke="#7a5c2e" strokeWidth="0.8"/>
                    <path d="M0,-6 C-2,-2 2,2 0,6" fill="none" stroke="#7a5c2e" strokeWidth="0.6"/>
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#coffee-beans)"/>
            </svg>
          </div>

          {/* Radial glow — solo en dark mode */}
          <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-primary/[0.14] blur-[90px] rounded-full pointer-events-none" aria-hidden="true"></div>

          {/* Fade to background at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10 py-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border dark:border-primary/30 border-on-surface/25 dark:bg-primary/10 bg-on-surface/8 dark:text-primary text-on-surface font-label-caps text-label-caps uppercase mb-8 badge-glow animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Experiencia de degustación
            </div>
            <h1 className="font-display-lg text-[56px] leading-[1] mb-6 text-on-surface dark:drop-shadow-[0_2px_24px_rgba(242,195,107,0.18)]">
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
                <button className="w-full glass-card dark:text-primary text-on-surface border dark:border-primary/20 border-on-surface/20 font-label-caps text-label-caps tracking-widest py-5 px-8 rounded-lg uppercase transition-all active:scale-95">
                  Explorar Cafés
                </button>
              </Link>
            </div>
            <LiveVoting />
          </div>
        </section>

        {/* Concepto + Sede Actual */}
        <section className="px-6 mb-section-gap">

          {/* Logo / identidad */}
          <div className="glass-card rounded-2xl p-8 mb-5 relative overflow-hidden text-center">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/8 blur-[70px]" aria-hidden="true"></div>
            <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.5em] mb-4">La Rioja · 2026</p>
            <div className="mb-1">
              <span className="font-label-caps text-[14px] uppercase tracking-[0.5em] text-on-surface-variant">Barra</span>
            </div>
            <h2 className="font-display-lg text-[54px] leading-none italic text-primary">Infiltrada</h2>
            <div className="mt-4 h-px bg-primary/20 mx-auto w-12"></div>
            <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.35em] mt-4">by Be Coffee</p>
            <p className="font-body-md text-on-surface-variant text-[14px] leading-relaxed mt-6 max-w-[280px] mx-auto">
              Una barra que aparece sin aviso en espacios que no esperás. Sin local fijo. Solo grano excepcional y el lugar que elige recibirnos.
            </p>
          </div>

          {/* Sede actual */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-caps text-[11px] text-primary uppercase tracking-[0.3em]">Edición actual · En curso</span>
              </div>

              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Sede</p>
                  <h3 className="font-display-lg text-[44px] leading-[1.05] italic">Café<br/>Literario</h3>
                </div>
                <div className="w-14 h-14 rounded-2xl border border-primary/25 bg-primary/8 flex items-center justify-center shrink-0 mb-1">
                  <span className="material-symbols-outlined text-primary text-2xl">menu_book</span>
                </div>
              </div>

              <div className="pt-5 border-t border-primary/10 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-label-caps text-[9px] text-on-surface-variant uppercase tracking-wide mb-1.5">Edición</p>
                  <p className="font-headline-sm text-[24px] leading-none">05</p>
                </div>
                <div>
                  <p className="font-label-caps text-[9px] text-on-surface-variant uppercase tracking-wide mb-1.5">Asistentes</p>
                  <p className="font-headline-sm text-[24px] leading-none">77+</p>
                </div>
                <div>
                  <p className="font-label-caps text-[9px] text-on-surface-variant uppercase tracking-wide mb-1.5">Granos</p>
                  <p className="font-headline-sm text-[24px] leading-none">03</p>
                </div>
              </div>
            </div>
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
                image: '/pdf/AG_Lista%201KG%20Enero_page-0008.jpg',
              },
              {
                origin: 'Brasil', name: 'Berry Bliss', roaster: 'Ángel',
                notes: ['Arándanos', 'Jarabe de Arce', 'Azúcar Mascabo', 'Crema'],
                proceso: 'Natural', altitud: '700–1.100 msnm',
                image: '/pdf/AG_Lista%201KG%20Enero_page-0006.jpg',
              },
              {
                origin: 'Colombia', name: 'San Agustín', roaster: 'Ángel',
                notes: ['Frutos Rojos', 'Caramelo', 'Chocolate Negro'],
                proceso: 'Lavado', altitud: '1.700 msnm',
                image: '/pdf/AG_Lista%201KG%20Enero_page-0003.jpg',
              },
            ].map((coffee) => (
              <div key={coffee.name} className="relative h-[360px] rounded-xl overflow-hidden group">
                <Image
                  src={coffee.image}
                  alt={coffee.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/10"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-4">
                  <div>
                    <span className="font-label-caps text-[10px] text-white/55 uppercase tracking-widest">{coffee.origin}</span>
                    <h3 className="font-headline-sm text-[28px] mt-1 text-white">{coffee.name}</h3>
                    <p className="font-label-caps text-[12px] text-primary mt-1">Tostado por: {coffee.roaster}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {coffee.notes.map(n => (
                      <span key={n} className="bg-black/40 border border-white/15 text-white/85 px-3 py-1 rounded-full text-[11px] font-label-caps uppercase backdrop-blur-sm">{n}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-4">
                    <div>
                      <p className="font-label-caps text-[10px] text-white/50 uppercase mb-1">Proceso</p>
                      <p className="font-body-md text-white">{coffee.proceso}</p>
                    </div>
                    <div>
                      <p className="font-label-caps text-[10px] text-white/50 uppercase mb-1">Altitud</p>
                      <p className="font-body-md text-white">{coffee.altitud}</p>
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
                <h3 className="font-headline-sm text-white text-[24px]">Benteveo Café</h3>
                <p className="font-body-md text-on-surface-variant text-[14px] mt-2 italic">Con Fuego Tostadores de Café · Joaquín V. González 460</p>
                <div className="flex gap-4 mt-4 opacity-70">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    <span className="text-[12px] font-label-caps">Sáb 02/05</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span className="text-[12px] font-label-caps">18:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edition Card 2 */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden group">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuByAKWRu8GW3jmc8da_KrH7iLLfCgpNm45wjyLlf5DdkSyW1Nnc7Xjo5NqTYRlV6kQYUPwbhIH6fB42qU23weIBUh4ctFWL5_9RDTl9M5fEqvgAakcDu8zgeI_7h31KWg6YzRQcnBixLomJTRBjDdXCj1yE5tdyYthN6nHoB2A8unPwT2o_b6KksWn_W021g9cPo3ZED4fMYni8Wwr3v0iTBVIXPr6ACoB13XE1mfxYAEVtb161xxsbG-Vg0fZ1MJDHquHHW8HtZ0cV"
                alt="Antonieta"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="inline-block bg-primary text-on-primary font-label-caps text-[9px] px-2 py-0.5 rounded uppercase mb-3">Edición 03</div>
                <h3 className="font-headline-sm text-white text-[24px]">Antonieta</h3>
                <p className="font-body-md text-on-surface-variant text-[14px] mt-2 italic">Con La Motofeca · Pelagio B. Luna 321</p>
                <div className="flex gap-4 mt-4 opacity-70">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    <span className="text-[12px] font-label-caps">Jue 23/04</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span className="text-[12px] font-label-caps">18:30</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edition Card 3 */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-surface-container"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="inline-block bg-primary text-on-primary font-label-caps text-[9px] px-2 py-0.5 rounded uppercase mb-3">Edición 02</div>
                <h3 className="font-headline-sm text-white text-[24px]">Donato. Café Club</h3>
                <p className="font-body-md text-on-surface-variant text-[14px] mt-2 italic">Con Stellar Specialty Coffee · Peatonal Buenos Aires 37</p>
                <div className="flex gap-4 mt-4 opacity-70">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    <span className="text-[12px] font-label-caps">Jue 16/04</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span className="text-[12px] font-label-caps">18:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edition Card 4 */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-surface-container"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="inline-block bg-primary text-on-primary font-label-caps text-[9px] px-2 py-0.5 rounded uppercase mb-3">Edición 01</div>
                <h3 className="font-headline-sm text-white text-[24px]">Gardelito Club</h3>
                <p className="font-body-md text-on-surface-variant text-[14px] mt-2 italic">Con John & Joe Café de Especialidad · Urquiza 925</p>
                <div className="flex gap-4 mt-4 opacity-70">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    <span className="text-[12px] font-label-caps">Jue 09/04</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span className="text-[12px] font-label-caps">18:00</span>
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
