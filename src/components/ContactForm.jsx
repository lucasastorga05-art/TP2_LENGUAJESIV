import { useState } from 'react'

const initialValues = {
  nombre: '',
  apellido: '',
  email: '',
  mensaje: '',
}

const validators = {
  nombre: (value) => {
    if (!value.trim()) return 'Ingresá tu nombre.'
    if (!/^[\p{L}]+(?:[ '-][\p{L}]+)*$/u.test(value.trim())) {
      return 'Usá solo letras, espacios, apóstrofes o guiones.'
    }
    return ''
  },
  apellido: (value) => {
    if (!value.trim()) return 'Ingresá tu apellido.'
    if (!/^[\p{L}]+(?:[ '-][\p{L}]+)*$/u.test(value.trim())) {
      return 'Usá solo letras, espacios, apóstrofes o guiones.'
    }
    return ''
  },
  email: (value) => {
    if (!value.trim()) return 'Ingresá tu correo electrónico.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      return 'Ingresá un correo válido, por ejemplo nombre@dominio.com.'
    }
    return ''
  },
  mensaje: (value) => {
    if (!value.trim()) return 'Escribí un mensaje antes de enviarlo.'
    if (value.length > 300) return 'El mensaje no puede superar los 300 caracteres.'
    return ''
  },
}

function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))

    if (touched[name] || submitted) {
      setErrors((current) => ({ ...current, [name]: validators[name](value) }))
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target
    setTouched((current) => ({ ...current, [name]: true }))
    setErrors((current) => ({ ...current, [name]: validators[name](value) }))
  }

  function handleSubmit(event) {
    const nextErrors = Object.fromEntries(
      Object.entries(validators).map(([field, validate]) => [field, validate(values[field])]),
    )

    setSubmitted(true)
    setTouched({ nombre: true, apellido: true, email: true, mensaje: true })
    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) {
      event.preventDefault()
      event.currentTarget.querySelector('[aria-invalid="true"]')?.focus()
    }
  }

  function fieldError(name) {
    return (touched[name] || submitted) && errors[name]
  }

  return (
    <section className="contact-form-section" aria-labelledby="contact-form-title">
      <div className="contact-form-intro">
        <span className="contact-form-kicker">Hablemos</span>
        <h2 id="contact-form-title">Dejanos tu mensaje</h2>
        <p>Completá tus datos y nos pondremos en contacto con vos.</p>
      </div>

      <form
        className="contact-form"
        action="https://formsubmit.co/lucasastorga05@gmail.com"
        method="POST"
        noValidate
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="_subject" value="Nuevo mensaje desde el sitio TP2" />
        <input type="hidden" name="_template" value="table" />
        <input type="text" name="_honey" className="form-honeypot" tabIndex="-1" autoComplete="off" />

        <div className="contact-form-fields">
          <div className="form-field">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="given-name"
              value={values.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldError('nombre'))}
              aria-describedby={fieldError('nombre') ? 'nombre-error' : undefined}
            />
            {fieldError('nombre') && <span className="field-error" id="nombre-error">{errors.nombre}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="apellido">Apellido</label>
            <input
              id="apellido"
              name="apellido"
              type="text"
              autoComplete="family-name"
              value={values.apellido}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldError('apellido'))}
              aria-describedby={fieldError('apellido') ? 'apellido-error' : undefined}
            />
            {fieldError('apellido') && <span className="field-error" id="apellido-error">{errors.apellido}</span>}
          </div>

          <div className="form-field form-field-wide">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldError('email'))}
              aria-describedby={fieldError('email') ? 'email-error' : undefined}
            />
            {fieldError('email') && <span className="field-error" id="email-error">{errors.email}</span>}
          </div>

          <div className="form-field form-field-wide">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              maxLength={300}
              value={values.mensaje}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldError('mensaje'))}
              aria-describedby={fieldError('mensaje') ? 'mensaje-error mensaje-count' : 'mensaje-count'}
            />
            <div className="message-meta">
              {fieldError('mensaje') && <span className="field-error" id="mensaje-error">{errors.mensaje}</span>}
              <span id="mensaje-count" className="character-count" aria-live="polite">
                {values.mensaje.length}/300
              </span>
            </div>
          </div>
        </div>

        <button className="contact-submit" type="submit">
          Enviar mensaje <span aria-hidden="true">↗</span>
        </button>
      </form>
    </section>
  )
}

export default ContactForm