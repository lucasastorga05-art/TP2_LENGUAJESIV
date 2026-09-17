function PageCard({ title, description }) {
  return (
    <article className="info-card">
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  )
}

export default PageCard
