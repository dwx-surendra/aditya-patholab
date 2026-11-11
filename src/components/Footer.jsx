import { Link } from 'react-router-dom'
import {
  FaFacebook, FaInstagram, FaYoutube,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaGoogle,
} from 'react-icons/fa'

const QUICK_LINKS = [
  { to: '/',         label: 'Home'              },
  { to: '/about',    label: 'About Us'           },
  { to: '/services', label: 'Our Services'       },
  { to: '/gallery',  label: 'Gallery'            },
  { to: '/booking',  label: 'Book Appointment'   },
  { to: '/contact',  label: 'Contact Us'         },
]

const SERVICE_LINKS = [
  'Complete Blood Count (CBC)',
  'Thyroid Function Test',
  'Liver Function Test',
  'Kidney Function Test',
  'Lipid Profile',
  'Urine Routine',
  'Biopsy & Histopathology',
  'Home Sample Collection',
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* CTA strip */}
      <div className="bg-secondary py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="text-lg font-bold">Need a lab test? We're here to help!</h3>
            <p className="text-white/80 text-sm mt-1">Home collection available · Same-day service · Accurate reports</p>
          </div>
          <Link to="/booking" className="bg-white text-secondary font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap text-sm shadow-md">
            Book Appointment →
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <img src="/logo.webp" alt="Aditya Patho Lab" className="h-14 w-auto mb-4 bg-white/10 rounded-xl p-2" />
            <p className="text-white/70 text-sm leading-relaxed">
              Aditya Patho Lab is a trusted diagnostic centre in Chapra, Bihar, delivering accurate and affordable pathology services since its founding.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {[
                { href: 'https://facebook.com', Icon: FaFacebook,  label: 'Facebook'  },
                { href: 'https://instagram.com', Icon: FaInstagram, label: 'Instagram' },
                { href: 'https://youtube.com',   Icon: FaYoutube,   label: 'YouTube'   },
                { href: 'https://google.com',    Icon: FaGoogle,    label: 'Google'    },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                   className="bg-white/10 hover:bg-white/25 p-2.5 rounded-full transition-colors"
                   aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-base font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-white/70 hover:text-white text-sm transition-colors">
                    › {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-semibold mb-5">Our Services</h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map(s => (
                <li key={s} className="text-white/70 text-sm">› {s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold mb-5">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-white/70">
                <FaMapMarkerAlt className="text-secondary mt-1 flex-shrink-0" />
                <span>Ramlila Mathiya Road, Sadhapur,<br />Chapra, Saran, Bihar – 841301</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FaPhone className="text-secondary flex-shrink-0" />
                <a href="tel:+919771643265" className="text-white/70 hover:text-white transition-colors">
                  +91 97716 43265
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FaEnvelope className="text-secondary flex-shrink-0" />
                <a href="mailto:[EMAIL_ADDRESS]" className="text-white/70 hover:text-white transition-colors break-all">
                  [EMAIL_ADDRESS]
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <FaClock className="text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p>Mon–Sat: 7:00 AM – 8:00 PM</p>
                  <p>Sunday: 7:00 AM – 12:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-white/50 text-xs">
          <p>© {new Date().getFullYear()} Aditya Patho Lab. All rights reserved.</p>
          <p>Chapra, Saran, Bihar · Trusted Diagnostic Centre</p>
        </div>
      </div>
    </footer>
  )
}
