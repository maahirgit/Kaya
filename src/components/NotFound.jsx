import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div style={{
      background: '#0a0a0a',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontFamily: "'Inter', sans-serif",
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '480px' }}>
        <div style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '1.8rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#c9a96e',
          marginBottom: '3rem'
        }}>
          Kaya
        </div>

        <div style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(5rem, 15vw, 8rem)',
          fontWeight: '400',
          color: '#c9a96e',
          lineHeight: '1',
          opacity: '0.35',
          marginBottom: '0.5rem'
        }}>
          404
        </div>

        <div style={{
          width: '40px',
          height: '1px',
          background: '#c9a96e',
          margin: '0 auto 1.5rem',
          opacity: '0.4'
        }} />

        <h1 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '1.4rem',
          fontWeight: '400',
          letterSpacing: '0.1em',
          color: '#f5f0eb',
          marginBottom: '1rem'
        }}>
          Page Not Found
        </h1>

        <p style={{
          fontSize: '0.9rem',
          color: '#a09080',
          lineHeight: '1.7',
          marginBottom: '2.5rem',
          fontWeight: '300'
        }}>
          The page you're looking for has moved or no longer exists.<br />
          Let us guide you back to our collection.
        </p>

        <button
          onClick={() => navigate('/')}
          style={{
            padding: '0.85rem 2.5rem',
            border: '1px solid #c9a96e',
            background: 'transparent',
            color: '#c9a96e',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => {
            e.target.style.background = '#c9a96e'
            e.target.style.color = '#0a0a0a'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'transparent'
            e.target.style.color = '#c9a96e'
          }}
        >
          Return Home
        </button>
      </div>
    </div>
  )
}
