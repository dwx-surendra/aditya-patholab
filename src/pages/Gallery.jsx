import { useState } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

// Replace src values with actual lab photos placed in /public/gallery/
const ALL_IMAGES = [
  { id: 1,  src: 'https://picsum.photos/seed/apl-g1/800/600',  thumb: 'https://picsum.photos/seed/apl-g1/400/300',  category: 'Lab',       title: 'Reception & Waiting Area'      },
  { id: 2,  src: 'https://picsum.photos/seed/apl-g2/800/600',  thumb: 'https://picsum.photos/seed/apl-g2/400/300',  category: 'Lab',       title: 'Sample Collection Room'         },
  { id: 3,  src: 'https://picsum.photos/seed/apl-g3/800/600',  thumb: 'https://picsum.photos/seed/apl-g3/400/300',  category: 'Lab',       title: 'Processing Area'                },
  { id: 4,  src: 'https://picsum.photos/seed/apl-g4/800/600',  thumb: 'https://picsum.photos/seed/apl-g4/400/300',  category: 'Equipment', title: 'Hematology Analyzer'            },
  { id: 5,  src: 'https://picsum.photos/seed/apl-g5/800/600',  thumb: 'https://picsum.photos/seed/apl-g5/400/300',  category: 'Equipment', title: 'Biochemistry Auto-Analyzer'     },
  { id: 6,  src: 'https://picsum.photos/seed/apl-g6/800/600',  thumb: 'https://picsum.photos/seed/apl-g6/400/300',  category: 'Equipment', title: 'Immunoassay Analyzer'           },
  { id: 7,  src: 'https://picsum.photos/seed/apl-g7/800/600',  thumb: 'https://picsum.photos/seed/apl-g7/400/300',  category: 'Equipment', title: 'Microscopy Station'             },
  { id: 8,  src: 'https://picsum.photos/seed/apl-g8/800/600',  thumb: 'https://picsum.photos/seed/apl-g8/400/300',  category: 'Team',      title: 'Our Expert Pathologist'         },
  { id: 9,  src: 'https://picsum.photos/seed/apl-g9/800/600',  thumb: 'https://picsum.photos/seed/apl-g9/400/300',  category: 'Team',      title: 'Lab Technicians at Work'        },
  { id: 10, src: 'https://picsum.photos/seed/apl-g10/800/600', thumb: 'https://picsum.photos/seed/apl-g10/400/300', category: 'Team',      title: 'Home Collection Staff'          },
  { id: 11, src: 'https://picsum.photos/seed/apl-g11/800/600', thumb: 'https://picsum.photos/seed/apl-g11/400/300', category: 'Reports',   title: 'Digital Report Generation'      },
  { id: 12, src: 'https://picsum.photos/seed/apl-g12/800/600', thumb: 'https://picsum.photos/seed/apl-g12/400/300', category: 'Reports',   title: 'Quality Control Documentation'  },
]

const FILTER_TABS = ['All', 'Lab', 'Equipment', 'Team', 'Reports']

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)   // index into filtered list

  const filtered = activeFilter === 'All' ? ALL_IMAGES : ALL_IMAGES.filter(i => i.category === activeFilter)

  const openLightbox = idx => { setLightbox(idx); document.body.style.overflow = 'hidden' }
  const closeLightbox = () => { setLightbox(null); document.body.style.overflow = '' }
  const prevImage = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length)
  const nextImage = () => setLightbox(i => (i + 1) % filtered.length)

  const handleKeyDown = e => {
    if (e.key === 'Escape')     closeLightbox()
    if (e.key === 'ArrowLeft')  prevImage()
    if (e.key === 'ArrowRight') nextImage()
  }

  return (
    <>
      {/* Page header */}
      <div className="page-header">
        <div className="bg-dots absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-secondary bg-secondary/20 px-3 py-1 rounded-full mb-4">Our Facility</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Photo Gallery</h1>
          <p className="text-white/70 text-lg">A look inside our modern lab — equipment, team and facility.</p>
        </div>
      </div>

      {/* Gallery section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {FILTER_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeFilter === tab
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {tab}
                <span className="ml-2 text-xs opacity-70">
                  ({tab === 'All' ? ALL_IMAGES.length : ALL_IMAGES.filter(i => i.category === tab).length})
                </span>
              </button>
            ))}
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => openLightbox(idx)}
                className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 aspect-square bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={`View ${img.title}`}
              >
                <img
                  src={img.thumb}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                  </svg>
                  <span className="text-white text-xs text-center font-medium leading-tight">{img.title}</span>
                </div>
                {/* Category badge */}
                <span className="absolute top-2 left-2 bg-white/90 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                  {img.category}
                </span>
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-8">
            📸 Placeholder images shown. Replace with actual lab photos in <code className="bg-gray-100 px-1 rounded">/public/gallery/</code>
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          ref={el => el?.focus()}
          role="dialog"
          aria-modal="true"
          aria-label={`Image: ${filtered[lightbox]?.title}`}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
            aria-label="Close gallery"
          >
            <FaTimes size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); prevImage() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
            aria-label="Previous image"
          >
            <FaChevronLeft size={20} />
          </button>

          {/* Image */}
          <div className="max-w-4xl mx-auto px-16 py-8 w-full" onClick={e => e.stopPropagation()}>
            <img
              src={filtered[lightbox]?.src}
              alt={filtered[lightbox]?.title}
              className="w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />
            <p className="text-center text-white/80 mt-4 text-base font-medium">{filtered[lightbox]?.title}</p>
            <p className="text-center text-white/40 text-xs mt-1">{lightbox + 1} / {filtered.length}</p>
          </div>

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); nextImage() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
            aria-label="Next image"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      )}

      {/* CTA */}
      <section className="bg-primary py-14 px-4 text-center">
        <h2 className="text-2xl font-extrabold text-white mb-3">Ready to visit our lab?</h2>
        <p className="text-white/70 mb-6">Experience our modern facility and expert care first-hand.</p>
        <Link to="/booking" className="bg-secondary text-white font-bold px-8 py-4 rounded-lg hover:bg-secondary-light transition-colors shadow-lg inline-flex items-center gap-2">
          Book Appointment <FaArrowRight />
        </Link>
      </section>
    </>
  )
}
