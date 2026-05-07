import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Barra Infiltrada — Café de Especialidad'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#18100a',
          padding: '72px 80px',
          fontFamily: 'serif',
        }}
      >
        {/* Top: badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#f2c36b',
            }}
          />
          <span
            style={{
              color: '#f2c36b',
              fontSize: '14px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
              fontWeight: 700,
            }}
          >
            Experiencia de Degustación
          </span>
        </div>

        {/* Center: main title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div
            style={{
              fontSize: '112px',
              fontWeight: 300,
              color: '#f5ede0',
              lineHeight: 0.9,
              letterSpacing: '-2px',
            }}
          >
            Barra
          </div>
          <div
            style={{
              fontSize: '112px',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#f2c36b',
              lineHeight: 0.9,
              letterSpacing: '-2px',
            }}
          >
            Infiltrada
          </div>
        </div>

        {/* Bottom: description + branding */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <p
            style={{
              color: '#a08060',
              fontSize: '22px',
              fontFamily: 'sans-serif',
              fontWeight: 300,
              margin: 0,
              maxWidth: '520px',
              lineHeight: 1.4,
            }}
          >
            Café de especialidad en espacios que no esperás.{'\n'}Cada edición, un lugar diferente.
          </p>

          {/* Coffee cup icon */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg width="80" height="80" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="7" fill="#2c1a08" />
              <path d="M6.5 14h19l-2.5 10.5h-14z" fill="#f2c36b" />
              <path d="M24 16h1.5a2.5 2.5 0 0 1 0 5H24" stroke="#f2c36b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M11.5 12.5c-.6-1 .5-1.5.5-3" stroke="#f2c36b" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
              <path d="M15.5 12.5c-.6-1 .5-1.5.5-3" stroke="#f2c36b" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
              <path d="M19.5 12.5c-.6-1 .5-1.5.5-3" stroke="#f2c36b" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
            </svg>
            <span
              style={{
                color: '#f2c36b',
                fontSize: '13px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'sans-serif',
                fontWeight: 700,
              }}
            >
              Be Coffee
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
