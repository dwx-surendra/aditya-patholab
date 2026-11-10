import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle, FaArrowRight, FaWhatsapp } from 'react-icons/fa'
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

// Contact form also uses EmailJS — same service, different template for contact queries
// ============================================================
// EMAILJS CONTACT TEMPLATE — REPLACE THESE VALUES
// See Booking.jsx comments for setup instructions.
// ============================================================
import emailjs from '@emailjs/browser'
const EMAILJS_SERVICE_ID       = import.meta.env.VITE_EMAILJS_SERVICE_ID            || 'YOUR_SERVICE_ID'
const CONTACT_TEMPLATE_ID      = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID   || 'YOUR_CONTACT_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY       = import.meta.env.VITE_EMAILJS_PUBLIC_KEY             || 'YOUR_PUBLIC_KEY'
// Template variables: {{sender_name}}, {{sender_email}}, {{sender_phone}}, {{subject}}, {{message}}
// ============================================================

const INITIAL = { sender_name: '', sender_email: '', sender_phone: '', subject: '', message: '' }

function validate(f) {
  const e = {}
  if (!f.sender_name.trim())  e.sender_name  = 'Name is required.'
  if (!f.sender_email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.sender_email))
                               e.sender_email = 'Valid email is required.'
  if (f.sender_phone && !/^[6-9]\d{9}$/.test(f.sender_phone))
                               e.sender_phone = 'Enter a valid 10-digit Indian mobile number.'
  if (!f.subject.trim())       e.subject      = 'Subject is required.'
  if (!f.message.trim())       e.message      = 'Message is required.'
  return e
}

export default function Contact() {
  const [form, setForm]     = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => { const c = { ...er }; delete c[name]; return c })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, CONTACT_TEMPLATE_ID, form, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Page header */}
      <div className="page-header">
        <div className="bg-dots absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-secondary bg-secondary/20 px-3 py-1 rounded-full mb-4">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-white/70 text-lg">We're here to answer your questions and help you with any diagnostic needs.</p>
        </div>
      </div>

      {/* Contact info cards */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { Icon: FaPhone,          color: 'bg-blue-100 text-blue-600',   title: 'Phone',          lines: ['+91 [PHONE_NUMBER]', 'Call during lab hours'], href: 'tel:+91XXXXXXXXXX' },
            { Icon: FaWhatsapp,       color: 'bg-green-100 text-green-600', title: 'WhatsApp',       lines: ['Chat with us', 'Quick booking & queries'], href: 'https://wa.me/91XXXXXXXXXX' },
            { Icon: FaEnvelope,       color: 'bg-red-100 text-red-600',     title: 'Email',          lines: ['[EMAIL_ADDRESS]', 'Response within 24 hrs'], href: 'mailto:[EMAIL_ADDRESS]' },
            { Icon: FaMapMarkerAlt,   color: 'bg-purple-100 text-purple-600',title: 'Location',      lines: ['Ramlila Mathiya Road,', 'Sadhapur, Chapra – 841301'], href: 'https://maps.google.com/?q=Aditya+Patho+Lab+Chapra+Bihar' },
          ].map(({ Icon, color, title, lines, href }) => (
            <a key={title} href={href} target={href.startsWith('http') ? '_blank' : undefined}
               rel="noopener noreferrer"
               className="card text-center hover:-translate-y-1 transition-transform duration-300 group">
              <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={22} />
              </div>
              <h3 className="font-bold text-primary text-base mb-2">{title}</h3>
              {lines.map(l => <p key={l} className="text-sm text-gray-500">{l}</p>)}
            </a>
          ))}
        </div>

        {/* Two-col: form + map */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-extrabold text-primary mb-6">Send Us a Message</h2>

            {status === 'success' ? (
              <div className="card text-center py-12">
                <FaCheckCircle size={56} className="text-green-500 mx-auto mb-5" />
                <h3 className="text-xl font-bold text-primary mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">Thank you for reaching out. We'll reply within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="btn-primary">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="c_name" className="form-label">Full Name <span className="text-red-500">*</span></label>
                    <input id="c_name" name="sender_name" type="text" value={form.sender_name}
                           onChange={handleChange} placeholder="Your name"
                           className={`form-input ${errors.sender_name ? 'border-red-400' : ''}`} />
                    {errors.sender_name && <p className="form-error">{errors.sender_name}</p>}
                  </div>
                  <div>
                    <label htmlFor="c_phone" className="form-label">Phone <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input id="c_phone" name="sender_phone" type="tel" value={form.sender_phone}
                           onChange={handleChange} placeholder="10-digit mobile"
                           maxLength={10}
                           className={`form-input ${errors.sender_phone ? 'border-red-400' : ''}`} />
                    {errors.sender_phone && <p className="form-error">{errors.sender_phone}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="c_email" className="form-label">Email <span className="text-red-500">*</span></label>
                  <input id="c_email" name="sender_email" type="email" value={form.sender_email}
                         onChange={handleChange} placeholder="your@email.com"
                         className={`form-input ${errors.sender_email ? 'border-red-400' : ''}`} />
                  {errors.sender_email && <p className="form-error">{errors.sender_email}</p>}
                </div>

                <div>
                  <label htmlFor="c_subject" className="form-label">Subject <span className="text-red-500">*</span></label>
                  <input id="c_subject" name="subject" type="text" value={form.subject}
                         onChange={handleChange} placeholder="e.g. Query about home collection"
                         className={`form-input ${errors.subject ? 'border-red-400' : ''}`} />
                  {errors.subject && <p className="form-error">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="c_message" className="form-label">Message <span className="text-red-500">*</span></label>
                  <textarea id="c_message" name="message" rows={5} value={form.message}
                            onChange={handleChange} placeholder="Write your message here..."
                            className={`form-input resize-none ${errors.message ? 'border-red-400' : ''}`} />
                  {errors.message && <p className="form-error">{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                    <FaExclamationTriangle className="mt-0.5 flex-shrink-0" />
                    <span>Failed to send message. Please try calling us directly.</span>
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'}
                        className="btn-primary w-full py-4 disabled:opacity-70">
                  {status === 'loading'
                    ? <><FaSpinner className="animate-spin" /> Sending…</>
                    : <>Send Message <FaArrowRight size={13} /></>}
                </button>
              </form>
            )}
          </div>

          {/* Map + hours */}
          <div className="space-y-6">
            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden shadow-xl bg-slate-100 relative">
              {/* Actual Google Maps embed — replace [GOOGLE_MAPS_EMBED_URL] with your embed URL */}
              {/* Get embed URL: Google Maps → Share → Embed a map → Copy HTML */}
              <div className="w-full h-72 flex flex-col items-center justify-center bg-primary/5 border-2 border-dashed border-primary/20 text-center p-6">
                <FaMapMarkerAlt size={40} className="text-primary/30 mb-3" />
                <p className="text-primary font-semibold text-sm">Google Maps Embed</p>
                <p className="text-gray-500 text-xs mt-1 max-w-xs">
                  Replace this placeholder with an{' '}
                  <code className="bg-gray-100 px-1 rounded">&lt;iframe&gt;</code>{' '}
                  from Google Maps embed. Search "Aditya Patho Lab Chapra" → Share → Embed a map.
                </p>
                <a
                  href="https://maps.google.com/?q=Aditya+Patho+Lab+Chapra+Bihar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-xs text-primary underline font-medium"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>

            {/* Opening hours */}
            <div className="card">
              <h3 className="font-bold text-primary text-base mb-4 flex items-center gap-2">
                <FaClock className="text-secondary" /> Opening Hours
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { day: 'Monday',    hours: '7:00 AM – 8:00 PM' },
                    { day: 'Tuesday',   hours: '7:00 AM – 8:00 PM' },
                    { day: 'Wednesday', hours: '7:00 AM – 8:00 PM' },
                    { day: 'Thursday',  hours: '7:00 AM – 8:00 PM' },
                    { day: 'Friday',    hours: '7:00 AM – 8:00 PM' },
                    { day: 'Saturday',  hours: '7:00 AM – 8:00 PM' },
                    { day: 'Sunday',    hours: '7:00 AM – 12:00 PM', note: true },
                  ].map(({ day, hours, note }) => (
                    <tr key={day} className="border-b border-gray-100 last:border-0">
                      <td className={`py-2.5 font-medium ${note ? 'text-secondary' : 'text-gray-700'}`}>{day}</td>
                      <td className={`py-2.5 text-right ${note ? 'text-secondary font-semibold' : 'text-gray-500'}`}>{hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-400 mt-3">* Hours may vary on public holidays. Please call ahead.</p>
            </div>

            {/* Quick book */}
            <div className="bg-primary rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Ready to book?</h3>
              <p className="text-white/70 text-sm mb-4">Skip the queue — book online and we'll confirm shortly.</p>
              <Link to="/booking" className="bg-secondary text-white font-bold px-6 py-3 rounded-lg hover:bg-secondary-light transition-colors inline-flex items-center gap-2 text-sm shadow-md">
                Book Appointment <FaArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
