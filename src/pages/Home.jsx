import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaFlask, FaTint, FaHeartbeat, FaMicroscope, FaHome,
  FaBoxOpen, FaShieldAlt, FaUserMd, FaClock, FaCheckCircle,
  FaPhoneAlt, FaArrowRight, FaStar, FaStarHalf,
  FaAward, FaThumbsUp, FaMoneyBillWave,
  FaWifi, FaMapMarkerAlt,
} from 'react-icons/fa'
import { MdBloodtype, MdScience, MdHealthAndSafety } from 'react-icons/md'

// ─── Data ─────────────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  { img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80', label: 'Hematology Analyzer',     sub: 'CBC with 5-part differential'         },
  { img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80', label: 'Biochemistry Analyzer',    sub: 'LFT · KFT · Lipid Profile'            },
  { img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80', label: 'Advanced Microscopy',      sub: 'Blood film & urine microscopy'         },
  { img: 'https://images.unsplash.com/photo-1614308457932-e06c0a4f6a86?w=800&q=80', label: 'PCR / NAAT Machine',       sub: 'Molecular & infection testing'         },
  { img: 'https://images.unsplash.com/photo-1587351021355-a479a299d2f9?w=800&q=80', label: 'ELISA Reader',             sub: 'Hormones · Thyroid · Hepatitis'        },
]

const SERVICES = [
  { icon: <MdBloodtype size={36} className="text-secondary" />, name: 'Blood Tests', desc: 'CBC, LFT, KFT, Blood Sugar, Hemoglobin, Lipid Profile & more.' },
  { icon: <FaTint size={36} className="text-secondary" />,       name: 'Urine Analysis', desc: 'Complete urine routine, microscopy & 24-hour protein tests.' },
  { icon: <FaHeartbeat size={36} className="text-secondary" />, name: 'Thyroid & Hormones', desc: 'T3, T4, TSH, FSH, LH, Testosterone, Prolactin & Cortisol.' },
  { icon: <FaMicroscope size={36} className="text-secondary" />,name: 'Biopsy & Histopathology', desc: 'FNAC, tissue biopsy, Pap smear & fluid cytology.' },
  { icon: <FaBoxOpen size={36} className="text-secondary" />,   name: 'Health Packages', desc: "Full body checkup, diabetes panel, cardiac & women’s wellness." },
  { icon: <FaHome size={36} className="text-secondary" />,      name: 'Home Collection', desc: 'Skilled phlebotomists at your doorstep—safe, hygienic & on-time.' },
  { icon: <MdScience size={36} className="text-secondary" />,   name: 'Culture & Sensitivity', desc: 'Blood, urine & throat culture with antibiotic sensitivity.' },
  { icon: <FaFlask size={36} className="text-secondary" />,     name: 'Stool & Other Tests', desc: 'Stool routine, occult blood, widal, dengue NS1/IgG/IgM.' },
]

const WHYS = [
  { icon: <FaAward />,          title: 'Quality Assured',       desc: 'NABL-accredited processes, ISO protocols and rigorous QC checks every day.' },
  { icon: <FaUserMd />,         title: 'Expert Pathologists',   desc: 'MD-qualified pathologist reviews every report before it is released.' },
  { icon: <FaHome />,           title: 'Home Sample Collection',desc: 'Book online; our phlebotomist arrives at your doorstep within 60 minutes.' },
  { icon: <FaClock />,          title: '24-Hour Turnaround',    desc: 'Most routine reports delivered within 24 hours; urgent tests same day.' },
  { icon: <FaMoneyBillWave />,  title: 'Affordable Pricing',    desc: 'Transparent pricing with no hidden charges. Packages starting at ₹299.' },
  { icon: <FaWifi />,           title: 'Digital Reports',       desc: 'Receive PDF reports on WhatsApp and email. Access anytime, anywhere.' },
]

const STEPS = [
  { num: '01', title: 'Book Appointment',   desc: 'Fill the online form or call us. Choose lab visit or home collection.' },
  { num: '02', title: 'Sample Collection',  desc: 'Visit our lab or our phlebotomist collects the sample at your home.' },
  { num: '03', title: 'Receive Report',     desc: 'Get your verified report on WhatsApp and email within 24 hours.' },
]

const REVIEWS = [
  { name: 'Rahul Sharma',       initials: 'RS', color: '#4285F4', stars: 5, date: '2 months ago',
    text: 'Best diagnostic centre in Chapra! Reports are always accurate and delivered on time. The staff is extremely professional and caring. Home collection service is a great convenience. Highly recommended!' },
  { name: 'Priya Singh',        initials: 'PS', color: '#EA4335', stars: 5, date: '1 month ago',
    text: 'Used their home collection and was very impressed. The technician arrived on time, was polite and skilled. Got reports on WhatsApp in less than 24 hours. Very affordable and convenient. 5 stars!' },
  { name: 'Dr. Suresh Pandey',  initials: 'SP', color: '#34A853', stars: 5, date: '3 months ago',
    text: 'As a physician I regularly refer patients here. The testing accuracy is excellent and I fully trust their reports for clinical decisions. Excellent quality control and very prompt service.' },
  { name: 'Meena Devi',         initials: 'MD', color: '#FBBC05', stars: 5, date: '1 week ago',
    text: 'Very satisfied! Got thyroid and sugar tests done. Price is very reasonable. Lab is clean and hygienic. Staff explained the reports clearly. Coming back for my next checkup.' },
  { name: 'Amit Kumar',         initials: 'AK', color: '#8E24AA', stars: 4, date: '3 weeks ago',
    text: 'Good pathology lab in Chapra. Full body health package was smooth. Collection was painless and reports ready next day. Slight wait during peak hours but overall great experience.' },
  { name: 'Sunita Gupta',       initials: 'SG', color: '#00897B', stars: 5, date: '2 months ago',
    text: 'Excellent lab! The pathologist personally called to explain my results. Very thorough and caring service. Lab uses latest equipment. Best diagnostic centre in Chapra, highly recommended!' },
]

const PACKAGES = [
  {
    name:  'Basic Health Checkup',
    price: '₹499',
    tests: ['CBC (Complete Blood Count)', 'Blood Sugar (Fasting)', 'Urine Routine', 'ESR', 'Hemoglobin'],
    highlight: false,
  },
  {
    name:  'Comprehensive Checkup',
    price: '₹1,499',
    tests: ['All Basic tests', 'Liver Function (LFT)', 'Kidney Function (KFT)', 'Lipid Profile', 'Thyroid (TSH)', 'HbA1c'],
    highlight: true,
  },
  {
    name:  'Full Body Preventive',
    price: '₹2,499',
    tests: ['All Comprehensive tests', 'Thyroid Panel (T3/T4/TSH)', 'Vitamin B12 & D3', 'Iron Studies', 'Cardiac Risk Profile', 'Uric Acid'],
    highlight: false,
  },
]

// ─── Stars helper ─────────────────────────────────────────────────────────────
function Stars({ count }) {
  return (
    <div className="flex gap-0.5 text-yellow-400 text-sm" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(i => (
        i <= count ? <FaStar key={i} /> : <FaStarHalf key={i} />
      ))}
    </div>
  )
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection() {
  const [heroSlide, setHeroSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setHeroSlide(s => (s + 1) % HERO_SLIDES.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      className="relative min-h-[88vh] flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A112D 0%, #1B2B6B 55%, #2D4BA0 100%)' }}
    >
      <div className="bg-dots absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-16 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* Text */}
        <div className="text-white">
          <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 text-secondary rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Trusted Diagnostics in Chapra, Bihar
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
            Accurate Results,
            <span className="block text-secondary">Compassionate</span>
            Care.
          </h1>
          <p className="text-white/75 text-lg mb-8 leading-relaxed max-w-lg">
            NABL-quality pathology services at Ramlila Mathiya Road, Sadhapur, Chapra.
            Advanced equipment · Expert pathologist · Home sample collection available.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/booking" className="btn-secondary text-base px-8 py-3.5">
              Book Appointment <FaArrowRight size={14} />
            </Link>
            <a href="tel:+919771643265" className="btn-outline-white text-base px-8 py-3.5">
              <FaPhoneAlt size={14} /> Call Now
            </a>
          </div>
          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap gap-4">
            {['NABL Quality Standards', 'Home Collection', 'Digital Reports'].map(b => (
              <span key={b} className="flex items-center gap-1.5 text-sm text-white/80">
                <FaCheckCircle className="text-green-400" /> {b}
              </span>
            ))}
          </div>
        </div>

        {/* Equipment slideshow card */}
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            {/* Decorative ring */}
            <div className="absolute -inset-4 rounded-3xl border-2 border-white/10 pointer-events-none" />

            {/* Slideshow container */}
            <div className="rounded-3xl overflow-hidden w-72 md:w-80 lg:w-96 bg-white/5 border border-white/20 backdrop-blur-sm relative" style={{ minHeight: 400 }}>
              {HERO_SLIDES.map((slide, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: i === heroSlide ? 1 : 0 }}
                >
                  <img
                    src={slide.img}
                    alt={slide.label}
                    className="w-full h-full object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {/* Label */}
                  <div className="absolute bottom-14 left-4 right-4">
                    <p className="text-white font-bold text-base leading-tight">{slide.label}</p>
                    <p className="text-white/60 text-xs mt-0.5">{slide.sub}</p>
                  </div>
                </div>
              ))}

              {/* Slide dots */}
              <div className="absolute bottom-4 left-0 right-0 flex gap-1.5 justify-center z-10">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroSlide(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === heroSlide ? 18 : 6,
                      height: 6,
                      background: i === heroSlide ? '#CC0000' : 'rgba(255,255,255,0.45)',
                    }}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full"><FaCheckCircle className="text-green-500" size={20} /></div>
              <div>
                <p className="text-xs text-gray-500">Rating on Justdial</p>
                <p className="text-sm font-bold text-primary">4.9★ · 134+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsBar() {
  const stats = [
    { value: '15+',    label: 'Years of Experience' },
    { value: '50,000+',label: 'Tests Performed'     },
    { value: '10,000+',label: 'Patients Served'     },
    { value: '24 hrs', label: 'Report Delivery'     },
  ]
  return (
    <section className="bg-white shadow-md relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y-0 md:divide-x divide-gray-200">
        {stats.map(({ value, label }) => (
          <div key={label} className="text-center py-2">
            <p className="text-3xl font-extrabold text-secondary">{value}</p>
            <p className="text-sm text-gray-500 mt-1 font-medium">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="bg-slate-50 bg-grid py-20 px-4" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-tag">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Comprehensive Lab Services</h2>
          <p className="text-gray-500 mt-3 text-base max-w-2xl mx-auto">
            From routine blood panels to advanced diagnostics — all under one roof with NABL-quality accuracy.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ icon, name, desc }) => (
            <div key={name} className="card text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-secondary/8 rounded-2xl group-hover:bg-secondary/15 transition-colors">
                  {icon}
                </div>
              </div>
              <h3 className="font-bold text-primary text-base mb-2">{name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="btn-outline px-8">View All Services <FaArrowRight size={13} /></Link>
        </div>
      </div>
    </section>
  )
}

function WhyChooseUs() {
  return (
    <section className="py-20 px-4 bg-white" id="why-us">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-tag">Why Patients Trust Us</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">The Aditya Patho Lab Difference</h2>
          <p className="text-gray-500 mt-3 text-base max-w-xl mx-auto">
            Thousands of patients in Chapra choose us every year for our accuracy, care, and convenience.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHYS.map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-4 p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-card transition-all duration-300 bg-white">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center text-primary text-xl">
                {icon}
              </div>
              <div>
                <h3 className="font-bold text-primary text-base mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1B2B6B 0%, #2D4BA0 100%)' }}>
      <div className="bg-dots absolute inset-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-secondary bg-secondary/20 px-3 py-1 rounded-full mb-3">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Book in 3 Easy Steps</h2>
          <p className="text-white/60 mt-3 text-base">From booking to receiving your report — seamlessly.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map(({ num, title, desc }, i) => (
            <div key={num} className="relative text-center">
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] right-0 h-0.5 bg-white/20" />
              )}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-white font-extrabold text-2xl shadow-xl mb-5">
                  {num}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-white/60 text-sm max-w-xs mx-auto">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/booking" className="btn-secondary px-10 py-4 text-base">
            Book Now — It's Free <FaArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function ReviewsSection() {
  return (
    <section className="bg-slate-50 bg-grid py-20 px-4" id="reviews">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-tag">Patient Reviews</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">What Our Patients Say</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Stars count={5} />
            <span className="text-gray-600 text-sm font-semibold">4.9 / 5 · 134+ reviews on Justdial</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map(({ name, initials, color, stars, date, text }) => (
            <div key={name} className="card flex flex-col gap-3 relative overflow-hidden">
              {/* Google logo watermark */}
              <svg className="absolute top-4 right-4 w-5 h-5 opacity-60" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                     style={{ backgroundColor: color }}>
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{name}</p>
                  <p className="text-xs text-gray-400">{date}</p>
                </div>
              </div>
              <Stars count={stars} />
              <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 text-sm text-gray-500">
          <p>⭐ Based on real patient feedback — visit Justdial or Google Maps to read more reviews.</p>
        </div>
      </div>
    </section>
  )
}

function GalleryPreview() {
  const images = [
    { src: 'https://picsum.photos/seed/apl-lab1/600/400',  alt: 'Lab reception area'            },
    { src: 'https://picsum.photos/seed/apl-equip/600/400', alt: 'Modern lab equipment'          },
    { src: 'https://picsum.photos/seed/apl-team/600/400',  alt: 'Expert team at work'           },
    { src: 'https://picsum.photos/seed/apl-coll/600/400',  alt: 'Sample collection area'        },
    { src: 'https://picsum.photos/seed/apl-cert/600/400',  alt: 'Quality certifications'        },
    { src: 'https://picsum.photos/seed/apl-rpt/600/400',   alt: 'Digital report delivery'       },
  ]
  return (
    <section className="bg-white py-20 px-4" id="gallery-preview">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-tag">Our Facility</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">A Look Inside Our Lab</h2>
          <p className="text-gray-500 mt-3 text-base max-w-xl mx-auto">
            Modern equipment, hygienic environment and a dedicated team — built for accuracy and your comfort.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map(({ src, alt }) => (
            <div key={alt} className="overflow-hidden rounded-2xl shadow-md group cursor-pointer aspect-[4/3]">
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/gallery" className="btn-outline px-8">View Full Gallery <FaArrowRight size={13} /></Link>
        </div>
      </div>
    </section>
  )
}

function HealthPackages() {
  return (
    <section className="bg-slate-50 bg-grid py-20 px-4" id="packages">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-tag">Health Packages</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Preventive Health Packages</h2>
          <p className="text-gray-500 mt-3 text-base max-w-xl mx-auto">
            Get complete health insights at transparent, affordable prices. Home collection included.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.map(({ name, price, tests, highlight }) => (
            <div key={name} className={`rounded-2xl p-8 flex flex-col ${
              highlight
                ? 'bg-primary text-white shadow-2xl scale-105'
                : 'bg-white text-gray-800 shadow-card border border-gray-100'
            }`}>
              {highlight && (
                <span className="bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4 uppercase tracking-wide">
                  Most Popular
                </span>
              )}
              <h3 className={`text-xl font-bold mb-1 ${highlight ? 'text-white' : 'text-primary'}`}>{name}</h3>
              <p className={`text-4xl font-extrabold my-4 ${highlight ? 'text-secondary' : 'text-secondary'}`}>{price}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {tests.map(t => (
                  <li key={t} className={`flex items-start gap-2 text-sm ${highlight ? 'text-white/80' : 'text-gray-600'}`}>
                    <FaCheckCircle className={highlight ? 'text-green-300 mt-0.5 flex-shrink-0' : 'text-green-500 mt-0.5 flex-shrink-0'} />
                    {t}
                  </li>
                ))}
              </ul>
              <Link to="/booking"
                className={highlight
                  ? 'btn-secondary text-center w-full'
                  : 'btn-outline text-center w-full'}>
                Book This Package
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">* Prices are indicative. Contact us for exact pricing and additional tests.</p>
      </div>
    </section>
  )
}

function CTABanner() {
  return (
    <section className="bg-secondary py-16 px-4 relative overflow-hidden">
      <div className="bg-dots absolute inset-0 pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <MdHealthAndSafety size={48} className="text-white/40 mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Your Health is Our Priority
        </h2>
        <p className="text-white/80 text-base mb-8 max-w-2xl mx-auto">
          Don't wait until you're sick. Book a preventive health checkup today and take charge of your health with accurate, affordable diagnostics.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/booking" className="bg-white text-secondary font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors shadow-xl text-base">
            Book Appointment Now →
          </Link>
          <a href="tel:+919771643265" className="btn-outline-white px-8 py-4 text-base">
            <FaPhoneAlt /> Call +91 97716 43265
          </a>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/70 text-sm">
          <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-white/50" /> Sadhapur, Chapra</span>
          <span className="flex items-center gap-1.5"><FaThumbsUp className="text-white/50" /> 4.9 ★ Rated Lab</span>
          <span className="flex items-center gap-1.5"><FaClock className="text-white/50" /> Open 7 AM – 8 PM</span>
        </div>
      </div>
    </section>
  )
}

// ─── Page export ──────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <WhyChooseUs />
      <HowItWorks />
      <ReviewsSection />
      <GalleryPreview />
      <HealthPackages />
      <CTABanner />
    </>
  )
}
