import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import SectionTitle from './components/SectionTitle'
import PageCard from './components/PageCard'
import ContactForm from './components/ContactForm'
import BreakingBadCast from './components/BreakingBadCast'
import ServicesGallery from './components/ServicesGallery'

const pages = [
  {
    id: 'inicio',
    path: '/inicio',
    label: 'Inicio',
    title: 'Inicio',
    subtitle: 'Bienvenido a nuestra página principal, donde presentamos la propuesta del sitio.',
  },
  {
    id: 'servicios',
    path: '/servicios',
    label: 'Servicios',
    title: 'Servicios',
    subtitle: 'Una vista con los servicios principales que ofrece la empresa o proyecto.',
  },
  {
    id: 'contacto',
    path: '/contacto',
    label: 'Contacto',
    title: 'Contacto',
    subtitle: 'Espacio para brindar información de contacto y comunicación con el equipo.',
    cards: [
      { title: 'Email', description: 'lucasastorga05@gmail.com' },
      { title: 'Teléfono', description: '3876631210' },
    ],
  },
]

function PageLayout({ page }) {
  return (
    <main className="page-content">
      <SectionTitle title={page.title} subtitle={page.subtitle} />

      {page.id === 'inicio' && <BreakingBadCast />}
      {page.id === 'servicios' && <ServicesGallery />}
      {page.id === 'contacto' && (
        <>
          <section className="card-grid">
            {page.cards.map((card) => (
              <PageCard key={card.title} title={card.title} description={card.description} />
            ))}
          </section>
          <ContactForm />
        </>
      )}
    </main>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">UCASAL</span>
          <p>Lenguajes IV</p>
        </div>

        <NavBar items={pages} />
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        {pages.map((page) => (
          <Route
            key={page.id}
            path={page.path}
            element={<PageLayout page={page} />}
          />
        ))}
      </Routes>
    </div>
  )
}

export default App
