function SectionTitle({ title, subtitle }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">Página</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}

export default SectionTitle
