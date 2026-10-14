import { useEffect, useState } from 'react'

const castEndpoint = 'https://api.tvmaze.com/shows/169/cast'

function formatBirthday(birthday) {
  if (!birthday) return 'No informada'
  return birthday.split('-').reverse().join('/')
}

function BreakingBadCast() {
  const [cast, setCast] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCast() {
      try {
        const response = await fetch(castEndpoint, { signal: controller.signal })
        if (!response.ok) throw new Error('No se pudo cargar el elenco.')

        const data = await response.json()
        const castWithImages = data.filter((entry) => (
          entry.person?.image?.medium || entry.character?.image?.medium
        ))
        setCast(castWithImages.slice(0, 8))
        setStatus('success')
      } catch (error) {
        if (error.name !== 'AbortError') setStatus('error')
      }
    }

    loadCast()
    return () => controller.abort()
  }, [])

  return (
    <section className="cast-section" aria-labelledby="cast-title">
      <div className="collection-heading">
        <div>
          <span className="section-kicker">Datos desde una API pública</span>
          <h2 id="cast-title">Personajes de Breaking Bad</h2>
        </div>
        <a href="https://www.tvmaze.com/shows/169/breaking-bad" target="_blank" rel="noreferrer">
          Fuente: TVmaze
        </a>
      </div>

      {status === 'loading' && <p className="data-state" role="status">Cargando elenco…</p>}
      {status === 'error' && (
        <p className="data-state" role="alert">No se pudo cargar el elenco. Revisá tu conexión e intentá nuevamente.</p>
      )}
      {status === 'success' && (
        <div className="cast-grid">
          {cast.map(({ person, character }) => (
            <article className="cast-card" key={`${person.id}-${character.id}`}>
              <img
                src={person.image?.medium || character.image.medium}
                alt={`Retrato de ${person.name} como ${character.name}`}
                loading="lazy"
              />
              <div className="cast-card-content">
                <span className="service-category">{character.name}</span>
                <h3>{person.name}</h3>
                <dl className="cast-facts">
                  <div><dt>Personaje</dt><dd>{character.name}</dd></div>
                  <div><dt>Actor o actriz</dt><dd>{person.name}</dd></div>
                  <div><dt>Nacimiento</dt><dd>{formatBirthday(person.birthday)}</dd></div>
                  <div><dt>País</dt><dd>{person.country?.name || 'No informado'}</dd></div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default BreakingBadCast