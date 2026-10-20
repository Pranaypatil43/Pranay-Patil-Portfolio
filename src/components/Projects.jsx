import React, { useState } from 'react'
import useInView from '../hooks/useInView'
import useTilt3D from '../hooks/useTilt3D'
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
    live: 'https://staynest.vercel.app',
    image: '/projects/projectimage/staynest.png',
    color: '#f07a3c',
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
    color: '#2dd4bf',
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
    color: '#fbbf24',
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
    color: '#f97316',
    category: 'APPLIED GENAI'
  },
]

function ProjectCard({ p, i }) {
  const [inViewRef, inView] = useInView()
  const { ref: tiltRef, onMouseMove, onMouseLeave } = useTilt3D({ maxTilt: 5, scale: 1.01 })
  const [imgErr, setImgErr] = useState(false)
  const even = i % 2 === 0

  // Combine both refs
  const setCombinedRef = (node) => {
    inViewRef.current = node
    tiltRef.current = node
  }

  return (
    <div
      ref={setCombinedRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`proj-card ${even ? 'reveal-left' : 'reveal-right'}${inView ? ' visible' : ''}`}
      style={{ '--proj-color': p.color }}
    >
      <div className="proj-card__glare" />

      {/* Image side with 3D hover zoom */}
      <a href={p.live} target="_blank" rel="noreferrer" className="proj-card__img-link">
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
          <span className="proj-card__img-cta">Launch Project ↗</span>
        </div>
        <div className="proj-card__badge-top">
          <span className="proj-card__num">{p.num}</span>
          <span className="proj-card__cat">{p.category}</span>
        </div>
      </a>

      {/* Info side */}
      <div className="proj-card__info">
        <div>
          <p className="proj-card__tagline">{p.tagline}</p>
          <h3 className="proj-card__name">{p.name}</h3>
          <p className="proj-card__desc">{p.desc}</p>
        </div>

        <div className="proj-card__tags">
          {p.tags.map((t) => (
            <span key={t} className="proj-tag">{t}</span>
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
  return (
    <section id="projects" className="projects section">
      <div className="pill-label"><span className="dot" /> 03 — SELECTED WORK</div>
      <div ref={ref} className={`projects__header reveal${inView ? ' visible' : ''}`}>
        <h2 className="projects__headline">
          Engineered for production. <em>Shaped with intent.</em>
        </h2>
        <p className="projects__sub">
          Full-stack applications combining reliable architecture, thoughtful UX, and measurable utility.
        </p>
      </div>
      <div className="projects__list">
        {projects.map((p, i) => (
          <ProjectCard key={p.num} p={p} i={i} />
        ))}
      </div>
    </section>
  )
}
