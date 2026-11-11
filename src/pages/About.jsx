import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaArrowRight, FaUserMd, FaMicroscope, FaFlask, FaShieldAlt, FaAward, FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { MdHealthAndSafety } from 'react-icons/md'

const MILESTONES = [
  { year: '[YEAR]', text: 'Aditya Patho Lab founded in Chapra with a vision to provide affordable, accurate diagnostics.' },
  { year: '[YEAR]', text: 'Expanded services to include home sample collection across Chapra and Saran district.' },
  { year: '[YEAR]', text: 'Introduced digital report delivery via WhatsApp and email for greater patient convenience.' },
  { year: 'Today',  text: 'Serving 10,000+ patients annually with 50,000+ tests performed and growing.' },
]

const EQUIPMENT = [
  { icon: <FaMicroscope size={28} className="text-secondary" />, name: 'Automated Hematology Analyzer',    desc: 'High-precision CBC analysis with 5-part differential.' },
  { icon: <FaFlask size={28} className="text-secondary" />,       name: 'Biochemistry Auto-Analyzer',      desc: 'Fully automated for LFT, KFT, lipid profile & more.' },
  { icon: <FaShieldAlt size={28} className="text-secondary" />,  name: 'Immunoassay Analyzer',            desc: 'Hormone & thyroid testing with high sensitivity.' },
  { icon: <FaUserMd size={28} className="text-secondary" />,     name: 'Urine Analyzer',                  desc: 'Automated urine strip reader with microscopy.' },
  { icon: <FaAward size={28} className="text-secondary" />,      name: 'Incubator & Culture System',      desc: 'For blood, urine and stool culture & sensitivity.' },
  { icon: <MdHealthAndSafety size={28} className="text-secondary" />, name: 'Bio-safety Cabinet', desc: 'Class II biological safety cabinet for specimen handling.' },
]

const EQUIPMENT_SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=80',
    name: 'Hematology Analyzer',
    tag: 'CBC / Blood Count',
    desc: '5-part differential CBC — full blood analysis with high precision in minutes.',
  },
  {
    img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900&q=80',
    name: 'Biochemistry Auto-Analyzer',
    tag: 'LFT · KFT · Lipid Profile',
    desc: 'Fully automated for 100+ parameters including liver, kidney and metabolic panels.',
  },
  {
    img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80',
    name: 'Advanced Microscopy',
    tag: 'Blood Film · Urine Microscopy',
    desc: 'High-resolution optics for detailed blood and urine microscopic examination.',
  },
  {
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80',
    name: 'High-Speed Centrifuge',
    tag: 'Sample Processing',
    desc: 'Precision centrifugation for serum, plasma and specialized sample preparation.',
  },
  {
    img: 'https://images.unsplash.com/photo-1614308457932-e06c0a4f6a86?w=900&q=80',
    name: 'PCR / NAAT Machine',
    tag: 'Molecular Diagnostics',
    desc: 'Molecular testing for infections, viral loads, TB and genetic disorders.',
  },
  {
    img: 'https://images.unsplash.com/photo-1587351021355-a479a299d2f9?w=900&q=80',
    name: 'ELISA Reader',
    tag: 'Immunoassay Testing',
    desc: 'Hormone, thyroid, Hepatitis, HIV, and comprehensive allergy testing platform.',
  },
  {
    img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=900&q=80',
    name: 'Urine Analyzer',
    tag: 'Urine Routine & Culture',
    desc: 'Automated urine strip reader with integrated microscopy sediment analysis.',
  },
  {
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80',
    name: 'Coagulation Analyzer',
    tag: 'PT · APTT · D-Dimer',
    desc: 'Clotting factor analysis for bleeding disorders and anticoagulation monitoring.',
  },
]

const VALUES = [
  { icon: <FaHeart />,       title: 'Patient First',   desc: 'Every decision is made with patient comfort, dignity and safety at the centre.' },
  { icon: <FaCheckCircle />, title: 'Accuracy',        desc: 'Rigorous quality controls and repeat checks ensure every result is reliable.' },
  { icon: <FaShieldAlt />,   title: 'Integrity',       desc: 'Transparent pricing, honest communication and no unnecessary tests.' },
  { icon: <FaAward />,       title: 'Excellence',      desc: 'Continuous learning, modern equipment and skilled staff for the best outcomes.' },
]

export default function About() {
  const [slide, setSlide] = useState(0)
  const [animating, setAnimating] = useState(false)

  function goTo(next) {
    setAnimating(true)
    setTimeout(() => {
      setSlide(next) // accepts both number and functional updater
      setAnimating(false)
    }, 300)
  }

  useEffect(() => {
    const timer = setInterval(() => goTo(s => (s + 1) % EQUIPMENT_SLIDES.length), 3000)
    return () => clearInterval(timer)
  }, [])

  const prevSlide = () => goTo(s => (s - 1 + EQUIPMENT_SLIDES.length) % EQUIPMENT_SLIDES.length)
  const nextSlide = () => goTo(s => (s + 1) % EQUIPMENT_SLIDES.length)

  return (
    <>
      {/* Page header */}
      <div className="page-header">
        <div className="bg-dots absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-secondary bg-secondary/20 px-3 py-1 rounded-full mb-4">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Aditya Patho Lab</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Trusted diagnostics in Chapra since our founding. We combine modern technology with heartfelt care.
          </p>
        </div>
      </div>

      {/* About intro */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-tag">Who We Are</span>
            <h2 className="text-3xl font-extrabold text-primary mb-5">Your Trusted Diagnostic Partner in Chapra</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Aditya Patho Lab is a premier pathology and diagnostic centre located at Ramlila Mathiya Road, Sadhapur, Chapra, Bihar. Founded with a mission to make accurate diagnostics accessible and affordable, we have been serving the people of Chapra and surrounding Saran district for over a decade.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Under the leadership of an experienced MD-qualified pathologist, our lab combines state-of-the-art automated equipment with rigorous quality control protocols. Whether it is a routine blood count or a specialised hormonal panel, every test is conducted with the same level of care and precision.
            </p>
            {['100% Accurate, QC-verified results', 'Home sample collection within 60 min', 'Reports on WhatsApp & email', 'Transparent, affordable pricing'].map(pt => (
              <div key={pt} className="flex items-center gap-2 mb-2">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm font-medium">{pt}</span>
              </div>
            ))}
            <div className="mt-8 flex gap-4">
              <Link to="/booking" className="btn-primary">Book Appointment <FaArrowRight size={13} /></Link>
              <Link to="/contact" className="btn-outline">Contact Us</Link>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-slate-100 aspect-square flex items-center justify-center relative">
            <img
              src="https://picsum.photos/seed/apl-about/700/700"
              alt="Inside Aditya Patho Lab"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl px-5 py-4">
              <p className="text-2xl font-extrabold text-primary">15+</p>
              <p className="text-xs text-gray-500">Years of excellence<br />in diagnostics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-slate-50 bg-grid">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">Our Purpose</span>
            <h2 className="text-3xl font-extrabold text-primary">Mission & Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-primary mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide every patient in Chapra and Saran district access to affordable, accurate, and timely pathology services — delivered with compassion, transparency and uncompromising quality. We believe good diagnostics should not be a luxury; it should be a right.
              </p>
            </div>
            <div className="card border-l-4 border-primary">
              <h3 className="text-xl font-bold text-primary mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become Bihar's most trusted community diagnostic laboratory — known not just for clinical excellence but for genuine care for every individual we serve. We envision a healthier Chapra through early detection and preventive diagnostics.
              </p>
            </div>
          </div>
          {/* Values */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="card text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/8 flex items-center justify-center text-primary text-xl mb-4">
                  {icon}
                </div>
                <h4 className="font-bold text-primary mb-2">{title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Showcase Carousel */}
      <section className="py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-tag">Advanced Technology</span>
            <h2 className="text-3xl font-extrabold text-primary">Our Diagnostic Equipment</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              World-class instruments ensuring precision, speed and reliability — every sample, every time.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900" style={{ aspectRatio: '16/7' }}>
            {/* Slides */}
            {EQUIPMENT_SLIDES.map((eq, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: i === slide && !animating ? 1 : 0, zIndex: i === slide ? 1 : 0 }}
              >
                <img
                  src={eq.img}
                  alt={eq.name}
                  className="w-full h-full object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <span className="inline-block text-xs font-bold tracking-widest uppercase text-secondary bg-secondary/20 px-3 py-1 rounded-full mb-3">
                    {eq.tag}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{eq.name}</h3>
                  <p className="text-white/70 text-sm md:text-base max-w-lg">{eq.desc}</p>
                </div>
              </div>
            ))}

            {/* Flash pulse on slide change */}
            <div
              className="absolute inset-0 bg-white pointer-events-none transition-opacity duration-150 z-10"
              style={{ opacity: animating ? 0.12 : 0 }}
            />

            {/* Prev / Next arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <FaChevronRight size={16} />
            </button>

            {/* Dot indicators */}
            <div className="absolute top-4 right-4 z-20 flex gap-1.5">
              {EQUIPMENT_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === slide ? 20 : 8,
                    height: 8,
                    background: i === slide ? '#CC0000' : 'rgba(255,255,255,0.5)',
                  }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="absolute top-4 left-4 z-20 bg-black/40 text-white text-xs font-bold px-3 py-1 rounded-full">
              {slide + 1} / {EQUIPMENT_SLIDES.length}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {EQUIPMENT_SLIDES.map((eq, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 relative"
                style={{
                  width: 80,
                  height: 56,
                  outline: i === slide ? '3px solid #CC0000' : '3px solid transparent',
                  outlineOffset: 2,
                  opacity: i === slide ? 1 : 0.6,
                }}
                title={eq.name}
              >
                <img src={eq.img} alt={eq.name} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lab journey timeline */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #1B2B6B 0%, #2D4BA0 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-secondary bg-secondary/20 px-3 py-1 rounded-full mb-3">Our Journey</span>
            <h2 className="text-3xl font-extrabold text-white">Milestones That Define Us</h2>
          </div>
          <div className="relative border-l-2 border-white/20 pl-8 ml-4 space-y-10">
            {MILESTONES.map(({ year, text }, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] w-5 h-5 rounded-full bg-secondary border-4 border-primary-light" />
                <p className="text-secondary font-bold text-sm mb-1">{year}</p>
                <p className="text-white/70 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-20 px-4 bg-slate-50 bg-grid">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">Our Infrastructure</span>
            <h2 className="text-3xl font-extrabold text-primary">Modern Equipment for Accurate Results</h2>
            <p className="text-gray-500 mt-3 text-base max-w-xl mx-auto">We invest in internationally certified analytical instruments to ensure the highest diagnostic accuracy.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EQUIPMENT.map(({ icon, name, desc }) => (
              <div key={name} className="card flex gap-4">
                <div className="flex-shrink-0 p-3 bg-secondary/8 rounded-xl self-start">{icon}</div>
                <div>
                  <h4 className="font-bold text-primary mb-1">{name}</h4>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & Accreditation */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">Quality Assurance</span>
            <h2 className="text-3xl font-extrabold text-primary">Our Commitment to Quality</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'NABL Quality Protocols', desc: 'All processes follow NABL accreditation guidelines for consistent, verifiable quality standards.' },
              { title: 'Internal QC Daily',      desc: 'Internal quality control checks run daily on every machine before patient samples are processed.' },
              { title: 'External Proficiency',   desc: 'Regular participation in external quality assessment schemes (EQAS) for independent validation.' },
            ].map(({ title, desc }) => (
              <div key={title} className="card border-t-4 border-secondary text-center">
                <FaAward size={36} className="text-secondary mx-auto mb-4" />
                <h4 className="font-bold text-primary mb-2">{title}</h4>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">* Accreditation details to be updated by lab owner.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-14 px-4 text-center">
        <h2 className="text-2xl font-extrabold text-white mb-4">Ready to Experience the Difference?</h2>
        <p className="text-white/80 mb-6">Book an appointment today and get accurate results with care.</p>
        <Link to="/booking" className="bg-white text-secondary font-bold px-10 py-4 rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center gap-2">
          Book Appointment <FaArrowRight />
        </Link>
      </section>
    </>
  )
}
