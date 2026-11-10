import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaArrowRight, FaHome } from 'react-icons/fa'

const CATEGORIES = [
  {
    id: 'blood', label: 'Blood Tests',
    tests: [
      { name: 'Complete Blood Count (CBC)',       desc: 'RBC, WBC, Platelets, Hemoglobin, Hematocrit, Differential.' },
      { name: 'Blood Sugar (Fasting / PP / RBS)', desc: 'Fasting, post-prandial and random blood glucose monitoring.' },
      { name: 'Hemoglobin',                       desc: 'Hemoglobin level to detect anaemia or polycythemia.' },
      { name: 'Blood Group & Rh Factor',          desc: 'ABO and Rh typing for clinical and donor screening purposes.' },
      { name: 'ESR',                              desc: 'Erythrocyte sedimentation rate — inflammatory marker.' },
      { name: 'Peripheral Blood Smear',           desc: 'Morphology of RBCs, WBCs and platelets under microscopy.' },
      { name: 'Malaria Rapid Test',               desc: 'PfHRP2 / pan-Plasmodium rapid card test.' },
      { name: 'Dengue NS1 / IgM / IgG',          desc: 'Rapid dengue antigen and antibody detection.' },
      { name: 'Typhoid (Widal)',                  desc: 'Agglutination test for Salmonella typhi antibodies.' },
    ],
  },
  {
    id: 'biochem', label: 'Biochemistry',
    tests: [
      { name: 'Liver Function Test (LFT)',        desc: 'Bilirubin, SGOT, SGPT, ALP, Total Protein, Albumin.' },
      { name: 'Kidney Function Test (KFT)',       desc: 'Urea, Creatinine, Uric Acid, Electrolytes (Na/K/Cl).' },
      { name: 'Lipid Profile',                    desc: 'Total Cholesterol, HDL, LDL, VLDL, Triglycerides.' },
      { name: 'Blood Urea & Creatinine',          desc: 'Standalone renal markers for kidney health monitoring.' },
      { name: 'Uric Acid',                        desc: 'Serum uric acid for gout diagnosis and monitoring.' },
      { name: 'Serum Electrolytes',               desc: 'Na, K, Cl — critical ions for clinical assessment.' },
      { name: 'HbA1c (Glycosylated Hb)',          desc: '3-month average blood sugar for diabetes management.' },
      { name: 'C-Reactive Protein (CRP)',         desc: 'Sensitive marker for infection and systemic inflammation.' },
    ],
  },
  {
    id: 'thyroid', label: 'Thyroid & Hormones',
    tests: [
      { name: 'TSH (Thyroid Stimulating Hormone)',desc: 'Primary thyroid screening — detects hypo & hyperthyroidism.' },
      { name: 'T3, T4 (Total)',                   desc: 'Total triiodothyronine and thyroxine for thyroid function.' },
      { name: 'Free T3 & Free T4',                desc: 'Unbound hormones — more sensitive thyroid indicators.' },
      { name: 'Thyroid Antibodies (Anti-TPO)',    desc: 'Autoimmune thyroid disease screening.' },
      { name: 'Insulin Level (Fasting)',          desc: 'Assess insulin resistance and pancreatic function.' },
      { name: 'FSH & LH',                         desc: 'Pituitary gonadotropins for fertility assessment.' },
      { name: 'Testosterone (Total)',             desc: 'Male/female testosterone level evaluation.' },
      { name: 'Estradiol (E2)',                   desc: 'Key female sex hormone for gynaecological assessment.' },
      { name: 'Prolactin',                        desc: 'Anterior pituitary hormone; elevated in several conditions.' },
      { name: 'Cortisol (8 AM)',                  desc: 'Adrenal function and stress response evaluation.' },
    ],
  },
  {
    id: 'urine', label: 'Urine & Stool',
    tests: [
      { name: 'Urine Routine & Microscopy',       desc: 'Physical, chemical, and microscopic urine examination.' },
      { name: 'Urine Culture & Sensitivity',      desc: 'Bacterial identification and antibiotic susceptibility.' },
      { name: '24-Hour Urine Protein',            desc: 'Quantitative urinary protein for kidney disease.' },
      { name: 'Microalbuminuria',                 desc: 'Early marker of diabetic and hypertensive nephropathy.' },
      { name: 'Stool Routine Examination',        desc: 'Colour, consistency, parasites, cysts, pus cells.' },
      { name: 'Stool Culture',                    desc: 'Identify enteric pathogens in GI infections.' },
      { name: 'Stool Occult Blood',               desc: 'Hidden blood in stool — colorectal cancer screening.' },
    ],
  },
  {
    id: 'histo', label: 'Histopathology',
    tests: [
      { name: 'Tissue Biopsy (Histopathology)',   desc: 'Microscopic examination of surgically removed tissue.' },
      { name: 'FNAC (Fine Needle Aspiration)',    desc: 'Cell sampling of lumps, nodes, thyroid and breast masses.' },
      { name: 'Pap Smear (Cervical Cytology)',    desc: 'Cervical cancer screening — recommended for all women 21+.' },
      { name: 'Pleural Fluid Analysis',           desc: 'Cell count, biochemistry, cytology of pleural effusion.' },
      { name: 'Ascitic Fluid Analysis',           desc: 'Diagnosis of liver disease and peritoneal infections.' },
      { name: 'CSF Analysis',                     desc: 'Cerebrospinal fluid for meningitis and neurological disease.' },
    ],
  },
  {
    id: 'micro', label: 'Microbiology',
    tests: [
      { name: 'Blood Culture & Sensitivity',      desc: 'Detect bloodstream infections, identify organism and antibiotics.' },
      { name: 'Throat Swab Culture',              desc: 'Identify streptococcal and other pharyngeal pathogens.' },
      { name: 'Sputum Culture',                   desc: 'Lower respiratory tract infection pathogen identification.' },
      { name: 'Wound Swab Culture',               desc: 'Post-surgical wound and skin infection cultures.' },
      { name: 'Gram Stain',                       desc: 'Rapid bacterial identification from clinical specimens.' },
      { name: 'AFB Smear & Culture',              desc: 'Acid-fast bacilli smear for tuberculosis diagnosis.' },
    ],
  },
]

const PACKAGES = [
  { name: 'Basic Health Checkup',      price: '₹499',   tests: 10, includes: 'CBC, Sugar, Urine, ESR, Hemoglobin' },
  { name: 'Diabetes Panel',            price: '₹699',   tests: 8,  includes: 'HbA1c, Fasting Sugar, PP Sugar, Urine, KFT, Lipid' },
  { name: 'Cardiac Risk Profile',      price: '₹899',   tests: 12, includes: 'Lipid Profile, hsCRP, CBC, Sugar, ECG (if available)' },
  { name: "Women's Wellness Package",  price: '₹1,199', tests: 15, includes: 'CBC, Thyroid, Iron, Vitamin D, B12, Pap Smear' },
  { name: 'Comprehensive Checkup',     price: '₹1,499', tests: 30, includes: 'Blood, Urine, LFT, KFT, Thyroid, Lipid, HbA1c, Vitamins' },
  { name: 'Senior Citizen Package',    price: '₹1,699', tests: 35, includes: 'Complete checkup + Bone health + Cardiac + Kidney panels' },
]

export default function Services() {
  const [activeTab, setActiveTab] = useState('blood')
  const active = CATEGORIES.find(c => c.id === activeTab)

  return (
    <>
      {/* Page header */}
      <div className="page-header">
        <div className="bg-dots absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-secondary bg-secondary/20 px-3 py-1 rounded-full mb-4">What We Test</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Services</h1>
          <p className="text-white/70 text-lg">Complete diagnostic services under one roof — from routine panels to specialised investigations.</p>
        </div>
      </div>

      {/* Services with tabs */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-tag">Test Directory</span>
            <h2 className="text-3xl font-extrabold text-primary">Browse by Category</h2>
          </div>

          {/* Tab bar */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeTab === c.id
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Tests grid */}
          {active && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {active.tests.map(({ name, desc }) => (
                <div key={name} className="card flex gap-3 hover:-translate-y-0.5 transition-transform duration-200">
                  <FaCheckCircle className="text-green-500 flex-shrink-0 mt-1" size={16} />
                  <div>
                    <h4 className="font-semibold text-primary text-sm">{name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-center text-xs text-gray-400 mt-8">
            * This list is not exhaustive. Contact us for tests not listed above. All tests available at the lab and via home collection.
          </p>
        </div>
      </section>

      {/* Home collection callout */}
      <section className="bg-primary/5 border-y border-primary/10 py-14 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-primary flex items-center justify-center">
            <FaHome size={36} className="text-white" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-extrabold text-primary mb-2">Home Sample Collection</h3>
            <p className="text-gray-600 mb-4">
              Can't come to the lab? Our trained phlebotomists will collect samples from your home — safely, hygienically, and on time. Available across Chapra and nearby areas.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link to="/booking" className="btn-primary text-sm py-2.5 px-6">Book Home Collection</Link>
              <a href="tel:+91XXXXXXXXXX" className="btn-outline text-sm py-2.5 px-6">Call for Info</a>
            </div>
          </div>
        </div>
      </section>

      {/* Health Packages */}
      <section className="py-20 px-4 bg-slate-50 bg-grid">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">Health Packages</span>
            <h2 className="text-3xl font-extrabold text-primary">Preventive Health Packages</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-base">Bundled tests at discounted prices. Home collection included in all packages.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGES.map(({ name, price, tests, includes }) => (
              <div key={name} className="card border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                <h4 className="font-bold text-primary text-base mb-1">{name}</h4>
                <p className="text-3xl font-extrabold text-secondary mb-1">{price}</p>
                <p className="text-xs text-gray-400 mb-3">{tests} tests included</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-5">{includes}</p>
                <Link to="/booking" className="btn-primary text-sm py-2 px-4 w-full text-center">
                  Book Now <FaArrowRight size={11} />
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">* Prices indicative. Contact us for the latest pricing and customised packages.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-14 px-4 text-center">
        <h2 className="text-2xl font-extrabold text-white mb-3">Not sure which test you need?</h2>
        <p className="text-white/80 mb-6 text-base">Our team can guide you. Call us or book a consultation with our pathologist.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/booking" className="bg-white text-secondary font-bold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center gap-2">
            Book Now <FaArrowRight />
          </Link>
          <a href="tel:+91XXXXXXXXXX" className="btn-outline-white px-8 py-3.5">Call +91 [PHONE_NUMBER]</a>
        </div>
      </section>
    </>
  )
}
