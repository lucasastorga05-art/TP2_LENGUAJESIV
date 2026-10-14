import services from '../data/services'

function ServicesGallery() {
  return (
    <section className="services-grid" aria-label="Servicios y habilidades de tecnología">
      {services.map((service) => (
        <article className="service-card" key={service.id}>
          <img className="service-image" src={service.image} alt={service.imageAlt} loading="lazy" />
          <div className="service-content">
            <span className="service-category">{service.category}</span>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <ul className="skill-list" aria-label={`Habilidades de ${service.title}`}>
              {service.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </div>
        </article>
      ))}
    </section>
  )
}

export default ServicesGallery