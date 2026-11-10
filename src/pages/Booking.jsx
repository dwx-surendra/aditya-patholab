import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { FaUserMd, FaCheckCircle, FaExclamationTriangle, FaSpinner, FaHome, FaBuilding, FaPhone, FaClock, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

// ============================================================
//  EMAIL NOTIFICATION SETUP — REPLACE THESE VALUES
//
//  1. Create a free account at https://www.emailjs.com/
//  2. Add an Email Service (Gmail) → note your Service ID
//  3. Create an Email Template (see template notes below)
//  4. Copy your Public Key from Account → API Keys
//  5. Paste all three values below
// ============================================================
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY'
// OWNER_EMAIL — set this in your EmailJS template as the "To Email"
// Template variables to map: {{from_name}}, {{patient_name}}, {{age}},
// {{gender}}, {{phone}}, {{email}}, {{date}}, {{time_slot}},
// {{test_required}}, {{collection_type}}, {{message}}
// ============================================================

const TIME_SLOTS = ['7:00 AM – 8:00 AM', '8:00 AM – 9:00 AM', '9:00 AM – 10:00 AM',
                    '10:00 AM – 11:00 AM', '11:00 AM – 12:00 PM', '12:00 PM – 1:00 PM',
                    '2:00 PM – 3:00 PM', '3:00 PM – 4:00 PM', '4:00 PM – 5:00 PM',
                    '5:00 PM – 6:00 PM', '6:00 PM – 7:00 PM', '7:00 PM – 8:00 PM']

const TESTS = [
  'Complete Blood Count (CBC)',
  'Blood Sugar (Fasting / PP / RBS)',
  'Liver Function Test (LFT)',
  'Kidney Function Test (KFT)',
  'Thyroid Function Test (TSH / T3 / T4)',
  'Lipid Profile',
  'HbA1c',
  'Urine Routine & Microscopy',
  'Thyroid Panel (Free T3 / T4 / TSH)',
  'Hormone Tests (FSH / LH / Testosterone)',
  'Biopsy / FNAC',
  'Stool Examination',
  'Culture & Sensitivity',
  'Basic Health Package (₹499)',
  'Comprehensive Package (₹1,499)',
  'Full Body Package (₹2,499)',
  'Other (specify in message)',
]

const INITIAL = {
  patient_name: '', age: '', gender: '', phone: '', email: '',
  date: '', time_slot: '', test_required: '', collection_type: 'lab_visit', message: '',
}

function validate(form) {
  const errs = {}
  if (!form.patient_name.trim())            errs.patient_name = 'Full name is required.'
  if (!form.age || form.age < 1 || form.age > 120) errs.age = 'Enter a valid age (1–120).'
  if (!form.gender)                         errs.gender = 'Please select gender.'
  if (!/^[6-9]\d{9}$/.test(form.phone))    errs.phone = 'Enter a valid 10-digit Indian mobile number.'
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                            errs.email = 'Enter a valid email address.'
  if (!form.date)                           errs.date = 'Please choose a preferred date.'
  else {
    const chosen = new Date(form.date)
    const today  = new Date(); today.setHours(0, 0, 0, 0)
    if (chosen < today)                     errs.date = 'Date cannot be in the past.'
  }
  if (!form.time_slot)                      errs.time_slot = 'Please choose a time slot.'
  if (!form.test_required)                  errs.test_required = 'Please select a test or service.'
  return errs
}

export default function Booking() {
  const formRef  = useRef(null)
  const [form, setForm]     = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const today = new Date().toISOString().split('T')[0]

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
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:       'Aditya Patho Lab Website',
          patient_name:    form.patient_name,
          age:             form.age,
          gender:          form.gender,
          phone:           form.phone,
          email:           form.email || 'Not provided',
          date:            form.date,
          time_slot:       form.time_slot,
          test_required:   form.test_required,
          collection_type: form.collection_type === 'home_collection' ? 'Home Collection' : 'Lab Visit',
          message:         form.message || 'None',
        },
        EMAILJS_PUBLIC_KEY,
      )
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
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-secondary bg-secondary/20 px-3 py-1 rounded-full mb-4">Online Booking</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Book an Appointment</h1>
          <p className="text-white/70 text-lg">Fill the form below. We'll confirm your appointment within 30 minutes.</p>
        </div>
      </div>

      <section className="py-16 px-4 bg-slate-50 bg-grid">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">

          {/* Info sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Doctor card */}
            <div className="card text-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-primary/10 mb-4 flex items-center justify-center">
                <img src="/doctor-photo.jpg" alt="Doctor" className="w-full h-full object-cover"
                     onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                <FaUserMd size={40} className="text-primary/40" style={{ display:'none' }} />
              </div>
              <h3 className="font-bold text-primary">[DOCTOR_NAME]</h3>
              <p className="text-xs text-secondary font-semibold mt-0.5">MBBS, MD (Pathology)</p>
              <p className="text-xs text-gray-500 mt-1">Lab Director · Aditya Patho Lab</p>
            </div>

            {/* Contact info */}
            <div className="card space-y-4">
              <h4 className="font-bold text-primary text-base">Contact Details</h4>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-secondary mt-1 flex-shrink-0" />
                <span>Ramlila Mathiya Road, Sadhapur, Chapra – 841301</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FaPhone className="text-secondary flex-shrink-0" />
                <a href="tel:+91XXXXXXXXXX" className="text-primary font-semibold hover:underline">+91 [PHONE_NUMBER]</a>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <FaClock className="text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p>Mon–Sat: 7:00 AM – 8:00 PM</p>
                  <p>Sunday: 7:00 AM – 12:00 PM</p>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="card">
              <h4 className="font-bold text-primary text-base mb-4">How It Works</h4>
              {[
                { n: '1', t: 'Fill This Form',       d: 'Takes less than 2 minutes.' },
                { n: '2', t: 'Get Confirmation',     d: 'We call within 30 minutes.' },
                { n: '3', t: 'Sample Collection',    d: 'At lab or at your home.' },
                { n: '4', t: 'Receive Report',       d: 'On WhatsApp within 24 hrs.' },
              ].map(({ n, t, d }) => (
                <div key={n} className="flex items-start gap-3 mb-4 last:mb-0">
                  <span className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{n}</span>
                  <div>
                    <p className="text-sm font-semibold text-primary">{t}</p>
                    <p className="text-xs text-gray-500">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking form */}
          <div className="lg:col-span-2">
            {status === 'success' ? (
              <div className="card text-center py-16">
                <FaCheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                <h2 className="text-2xl font-extrabold text-primary mb-3">Appointment Request Sent!</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Thank you! We have received your booking request and will call you within 30 minutes to confirm your appointment.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={() => setStatus('idle')} className="btn-primary">Book Another Appointment</button>
                  <Link to="/" className="btn-outline">Back to Home</Link>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="card space-y-6">
                <h2 className="text-xl font-extrabold text-primary border-b pb-4">Patient & Appointment Details</h2>

                {/* Row 1: Name + Age */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="patient_name" className="form-label">Full Name <span className="text-red-500">*</span></label>
                    <input id="patient_name" name="patient_name" type="text" value={form.patient_name}
                           onChange={handleChange} placeholder="e.g. Ramesh Kumar"
                           className={`form-input ${errors.patient_name ? 'border-red-400' : ''}`} />
                    {errors.patient_name && <p className="form-error">{errors.patient_name}</p>}
                  </div>
                  <div>
                    <label htmlFor="age" className="form-label">Age <span className="text-red-500">*</span></label>
                    <input id="age" name="age" type="number" min="1" max="120" value={form.age}
                           onChange={handleChange} placeholder="e.g. 35"
                           className={`form-input ${errors.age ? 'border-red-400' : ''}`} />
                    {errors.age && <p className="form-error">{errors.age}</p>}
                  </div>
                </div>

                {/* Row 2: Gender + Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="gender" className="form-label">Gender <span className="text-red-500">*</span></label>
                    <select id="gender" name="gender" value={form.gender}
                            onChange={handleChange}
                            className={`form-select ${errors.gender ? 'border-red-400' : ''}`}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="form-error">{errors.gender}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="form-label">Phone Number <span className="text-red-500">*</span></label>
                    <input id="phone" name="phone" type="tel" value={form.phone}
                           onChange={handleChange} placeholder="10-digit mobile number"
                           maxLength={10}
                           className={`form-input ${errors.phone ? 'border-red-400' : ''}`} />
                    {errors.phone && <p className="form-error">{errors.phone}</p>}
                  </div>
                </div>

                {/* Row 3: Email */}
                <div>
                  <label htmlFor="email" className="form-label">Email Address <span className="text-gray-400 font-normal">(optional)</span></label>
                  <input id="email" name="email" type="email" value={form.email}
                         onChange={handleChange} placeholder="For digital report delivery"
                         className={`form-input ${errors.email ? 'border-red-400' : ''}`} />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>

                {/* Row 4: Date + Time */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="date" className="form-label">Preferred Date <span className="text-red-500">*</span></label>
                    <input id="date" name="date" type="date" value={form.date} min={today}
                           onChange={handleChange}
                           className={`form-input ${errors.date ? 'border-red-400' : ''}`} />
                    {errors.date && <p className="form-error">{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="time_slot" className="form-label">Preferred Time Slot <span className="text-red-500">*</span></label>
                    <select id="time_slot" name="time_slot" value={form.time_slot}
                            onChange={handleChange}
                            className={`form-select ${errors.time_slot ? 'border-red-400' : ''}`}>
                      <option value="">Select time slot</option>
                      {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.time_slot && <p className="form-error">{errors.time_slot}</p>}
                  </div>
                </div>

                {/* Row 5: Test */}
                <div>
                  <label htmlFor="test_required" className="form-label">Test / Service Required <span className="text-red-500">*</span></label>
                  <select id="test_required" name="test_required" value={form.test_required}
                          onChange={handleChange}
                          className={`form-select ${errors.test_required ? 'border-red-400' : ''}`}>
                    <option value="">Select test or service</option>
                    {TESTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.test_required && <p className="form-error">{errors.test_required}</p>}
                </div>

                {/* Row 6: Collection type */}
                <div>
                  <p className="form-label">Sample Collection Preference <span className="text-red-500">*</span></p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-2">
                    {[
                      { value: 'lab_visit',       label: 'Lab Visit',        sub: 'Visit our centre at Sadhapur',    Icon: FaBuilding },
                      { value: 'home_collection',  label: 'Home Collection',  sub: 'Phlebotomist comes to your home', Icon: FaHome },
                    ].map(({ value, label, sub, Icon }) => (
                      <label key={value}
                             className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                               form.collection_type === value
                                 ? 'border-primary bg-primary/5'
                                 : 'border-gray-200 hover:border-primary/40 bg-white'
                             }`}>
                        <input type="radio" name="collection_type" value={value}
                               checked={form.collection_type === value}
                               onChange={handleChange} className="accent-primary" />
                        <Icon size={22} className="text-primary flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm text-primary">{label}</p>
                          <p className="text-xs text-gray-500">{sub}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Row 7: Message */}
                <div>
                  <label htmlFor="message" className="form-label">Additional Information <span className="text-gray-400 font-normal">(optional)</span></label>
                  <textarea id="message" name="message" rows={3} value={form.message}
                            onChange={handleChange}
                            placeholder="Symptoms, doctor referral, special instructions, or any other details..."
                            className="form-input resize-none" />
                </div>

                {/* Error banner */}
                {status === 'error' && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                    <FaExclamationTriangle className="mt-0.5 flex-shrink-0" />
                    <span>Oops! Something went wrong while sending your booking. Please call us directly at <a href="tel:+91XXXXXXXXXX" className="font-semibold underline">+91 [PHONE_NUMBER]</a> or try again.</span>
                  </div>
                )}

                {/* Submit */}
                <button type="submit" disabled={status === 'loading'}
                        className="btn-secondary w-full py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed">
                  {status === 'loading'
                    ? <><FaSpinner className="animate-spin" /> Sending Request…</>
                    : <>Book My Appointment <FaArrowRight size={14} /></>}
                </button>
                <p className="text-xs text-center text-gray-400">
                  By submitting, you consent to being contacted by Aditya Patho Lab regarding your appointment.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
