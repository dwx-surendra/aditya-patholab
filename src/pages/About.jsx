import { Link } from 'react-router-dom'
import { FaCheckCircle, FaArrowRight, FaUserMd, FaMicroscope, FaFlask, FaShieldAlt, FaAward, FaHeart } from 'react-icons/fa'
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

const VALUES = [
  { icon: <FaHeart />,       title: 'Patient First',   desc: 'Every decision is made with patient comfort, dignity and safety at the centre.' },
  { icon: <FaCheckCircle />, title: 'Accuracy',        desc: 'Rigorous quality controls and repeat checks ensure every result is reliable.' },
  { icon: <FaShieldAlt />,   title: 'Integrity',       desc: 'Transparent pricing, honest communication and no unnecessary tests.' },
  { icon: <FaAward />,       title: 'Excellence',      desc: 'Continuous learning, modern equipment and skilled staff for the best outcomes.' },
]

export default function About() {
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

      {/* Doctor profile */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden bg-slate-100 shadow-xl aspect-[3/4] flex items-center justify-center">
            <img
              src="/doctor-photo.jpg"
              alt="Lab Director – Aditya Patho Lab"
              className="w-full h-full object-cover"
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
            />
            <div style={{ display:'none' }} className="flex flex-col items-center justify-center w-full h-full text-center p-10 bg-gradient-to-b from-primary to-primary-dark text-white">
              <FaUserMd size={80} className="text-white/40 mb-4" />
              <p className="text-2xl font-bold">[DOCTOR_NAME]</p>
              <p className="text-white/60 mt-1">📸 Add /public/doctor-photo.jpg</p>
            </div>
          </div>
          <div>
            <span className="section-tag">Meet the Expert</span>
            <h2 className="text-3xl font-extrabold text-primary mb-2">[DOCTOR_NAME]</h2>
            <p className="text-secondary font-semibold mb-4">MBBS, MD (Pathology) · Lab Director & Chief Pathologist</p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Dr. [DOCTOR_NAME] is a qualified MD pathologist with over [X] years of experience in clinical and anatomical pathology. Having trained at premier medical institutions, they bring a meticulous approach to every test and report.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Committed to community health in Chapra, Dr. [DOCTOR_NAME] founded Aditya Patho Lab with the goal of bringing city-quality diagnostics to Saran district at accessible prices.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Years Experience', value: '[X]+' },
                { label: 'Tests Per Year',   value: '50,000+' },
                { label: 'Qualification',    value: 'MBBS, MD' },
                { label: 'Specialisation',   value: 'Pathology' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-secondary">{value}</p>
                  <p className="text-xs text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
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
