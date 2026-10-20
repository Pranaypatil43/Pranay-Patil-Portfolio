import React, { useState, useRef } from 'react'
import useInView from '../hooks/useInView'
import useTilt3D from '../hooks/useTilt3D'
import TechLogo from './TechLogos'
import './Projects.css'

const projects = [
  {
    num: '01',
    name: 'StayNest',
    tagline: 'Full-Stack Hotel & Property Booking Engine',
    desc: 'An end-to-end hotel and rental marketplace featuring dynamic geolocation mapping, verified guest reviews, secure Stripe-ready booking flows, and high-performance filtering.',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Leaflet', 'REST APIs'],
    features: ['JWT Authentication', 'CRUD Listings & Booking', 'Cloudinary Image CDN', 'Interactive Leaflet Maps', 'Verified Review Score', 'Mobile Responsive Engine'],
    github: 'https://github.com/Pranaypatil43',
    live: 'https://syay-nest.vercel.app',
    image: '/projects/projectimage/staynest.png',
    color: '#ff3366',
    category: 'MERN ARCHITECTURE'
  },
  {
    num: '02',
    name: 'SnapGallery',
    tagline: 'Photo Studio & Client Proofing Workspace',
    desc: 'A collaborative production platform engineered for professional photography studios to manage events, team permissions, watermarked proofs, and PIN-secured private client deliverables.',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Cloudinary'],
    features: ['Multi-tier RBAC Dashboards', 'PIN-Protected Client Portals', 'Studio Team Management', 'Batch Asset Optimization', 'RESTful Endpoints', 'Proofing Workflow'],
    github: 'https://github.com/Pranaypatil43',
    live: 'https://snapgallery-seven.vercel.app',
    image: '/projects/projectimage/snapgallary.png',
    color: '#fb7185',
    category: 'STUDIO WORKSPACE'
  },
  {
    num: '03',
    name: 'QuickCampus',
    tagline: 'College ERP & Academic Operations System',
    desc: 'A centralized university operations ERP streamlining institutional workflows, faculty administrative records, attendance monitoring, and comprehensive student academic lifecycle tracking.',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'RBAC', 'Admin ERP'],
    features: ['Triple Role Architecture (Admin/Faculty/Student)', 'Assignment & Grading Engine', 'Automated Attendance Tracking', 'Admission Verification Portal', 'Analytics Reporting', 'Audit Logging'],
    github: 'https://github.com/Pranaypatil43/Quick-Campus',
    live: 'https://quickcampus-xi.vercel.app',
    image: '/projects/projectimage/QuickCampus.png',
    color: '#f59e0b',
    category: 'ENTERPRISE ERP'
  },
  {
    num: '04',
    name: 'AI Chatbot',
    tagline: 'Context-Aware LLM Conversational Interface',
    desc: 'A low-latency conversational platform connecting a responsive React frontend with the Gemini API to execute context-aware responses, prompt engineering experiments, and chat history persistence.',
    tags: ['React.js', 'Vite', 'Gemini API', 'Prompt Engineering', 'Streaming UI'],
    features: ['Gemini 1.5 Integration', 'Prompt Optimization Pipeline', 'Contextual Thread Memory', 'Markdown Code Syntax Highlighting', 'Fluid Responsive UI', 'Exportable Sessions'],
    github: 'https://github.com/Pranaypatil43',
    live: 'https://chatbot-project-ashen-tau.vercel.app',
    image: '/projects/projectimage/chatbot.png',
    color: '#f43f5e',
    category: 'APPLIED GENAI'
  },
]

function ProjectCard({ p }) {
  const { ref: tiltRef, onMouseMove, onMouseLeave } = useTilt3D({ maxTilt: 4, scale: 1.01 })
  const [imgErr, setImgErr] = useState(false)

  return (
    <div
      ref={tiltRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="proj-card"
      style={{ '--proj-color': p.color }}
    >
      <div className="proj-card__glare" />

      {/* Image Showcase Column */}
      <div className="proj-card__showcase">
        <a
          href={p.live}
          target="_blank"
          rel="noreferrer"
          className="proj-card__preview-wrap"
          aria-label={`View live application for ${p.name}`}
        >
          <div className="proj-card__badge-top">
            <span className="proj-card__num">{p.num}</span>
            <span className="proj-card__cat">{p.category}</span>
          </div>

          <div className="proj-card__browser">
            <div className="proj-card__browser-bar">
              <div className="proj-card__browser-dots">
                <span /><span /><span />
              </div>
              <div className="proj-card__browser-url">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span>{p.live.replace('https://', '')}</span>
              </div>
            </div>
            <div className="proj-card__browser-screen">
              {!imgErr ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="proj-card__img"
                  onError={() => setImgErr(true)}
                />
              ) : (
                <div className="proj-card__img-placeholder" style={{ background: p.color + '18' }}>
                  <span>{p.name}</span>
                </div>
              )}
              <div className="proj-card__img-overlay">
                <span className="proj-card__img-cta">Launch Live Project ↗</span>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* Info side */}
      <div className="proj-card__info">
        <div>
          <p className="proj-card__tagline">{p.tagline}</p>
          <h3 className="proj-card__name">{p.name}</h3>
          <p className="proj-card__desc">{p.desc}</p>
        </div>

        <div className="proj-card__tags">
          {p.tags.map((t) => (
            <span key={t} className="proj-tag">
              <TechLogo name={t} size={14} />
              <span>{t}</span>
            </span>
          ))}
        </div>

        <div className="proj-card__features">
          {p.features.map((f) => (
            <span key={f} className="proj-feature">
              <span className="proj-feature__dot" />
              {f}
            </span>
          ))}
        </div>

        <div className="proj-card__links">
          <a href={p.github} target="_blank" rel="noreferrer" className="proj-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
            Repository
          </a>
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            className="proj-link proj-link--primary"
          >
            Live Production ↗
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView()
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef(null)

  const scrollToIndex = (idx) => {
    const track = trackRef.current
    if (!track) return
    const cards = track.querySelectorAll('.proj-card')
    if (cards[idx]) {
      const offsetLeft = cards[idx].offsetLeft - track.offsetLeft
      track.scrollTo({ left: offsetLeft, behavior: 'smooth' })
      setActiveIndex(idx)
    }
  }

  const handleNav = (dir) => {
    const nextIdx = Math.max(0, Math.min(projects.length - 1, activeIndex + dir))
    scrollToIndex(nextIdx)
  }

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const cards = track.querySelectorAll('.proj-card')
    const scrollPos = track.scrollLeft + track.clientWidth / 2
    cards.forEach((card, idx) => {
      const cardStart = card.offsetLeft - track.offsetLeft
      const cardEnd = cardStart + card.clientWidth
      if (scrollPos >= cardStart && scrollPos <= cardEnd) {
        setActiveIndex(idx)
      }
    })
  }

  return (
    <section id="projects" className="projects section">
      <div className="pill-label"><span className="dot" /> 03 — SELECTED WORK</div>

      <div ref={ref} className={`projects__header reveal${inView ? ' visible' : ''}`}>
        <div className="projects__header-left">
          <h2 className="projects__headline">
            Engineered for production. <em>Shaped with intent.</em>
          </h2>
          <p className="projects__sub">
            Full-stack applications combining reliable architecture, thoughtful UX, and measurable utility.
          </p>
        </div>

        {/* Horizontal Navigation Controls */}
        <div className="projects__nav-controls">
          <div className="projects__counter">
            <span className="projects__counter-active">0{activeIndex + 1}</span>
            <span className="projects__counter-divider">/</span>
            <span className="projects__counter-total">0{projects.length}</span>
          </div>
          <div className="projects__nav-arrows">
            <button
              onClick={() => handleNav(-1)}
              disabled={activeIndex === 0}
              className="projects__nav-btn"
              aria-label="Previous project"
              title="Previous project"
            >
              ←
            </button>
            <button
              onClick={() => handleNav(1)}
              disabled={activeIndex === projects.length - 1}
              className="projects__nav-btn"
              aria-label="Next project"
              title="Next project"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Project Selector Tabs */}
      <div className="projects__tabs">
        {projects.map((p, idx) => (
          <button
            key={p.num}
            onClick={() => scrollToIndex(idx)}
            className={`projects__tab ${activeIndex === idx ? 'projects__tab--active' : ''}`}
            style={{ '--tab-color': p.color }}
          >
            <span className="projects__tab-dot" />
            <span className="projects__tab-num">{p.num}</span>
            <span className="projects__tab-name">{p.name}</span>
          </button>
        ))}
      </div>

      {/* Horizontal Project Track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="projects__track"
      >
        {projects.map((p) => (
          <ProjectCard key={p.num} p={p} />
        ))}
      </div>
    </section>
  )
}
