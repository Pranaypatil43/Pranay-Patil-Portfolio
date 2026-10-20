import React, { useEffect, useState } from 'react'
import useInView from '../hooks/useInView'
import useTilt3D from '../hooks/useTilt3D'
import Scene3D from './Scene3D'
import './Hero.css'

function BentoCard({ children, className = '', maxTilt = 10, scale = 1.02, style = {} }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D({ maxTilt, scale })
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`bento ${className}`}
      style={style}
    >
      <div className="bento__glare" />
      <div className="bento__content">
        {children}
      </div>
    </div>
  )
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [time, setTime] = useState('')
  const [ref, inView] = useInView()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => {
      clearTimeout(t)
      clearInterval(interval)
    }
  }, [])

  return (
    <section id="home" className="hero section">
      {/* Interactive Three.js 3D Background & Stage */}
      <Scene3D />

      {/* Bento Grid Layer */}
      <div ref={ref} className={`hero__grid${loaded ? ' loaded' : ''}`}>

        {/* Card 1 — Executive Portrait & Identity (Sole Profile on Page) */}
        <BentoCard className="bento--name" maxTilt={6}>
          <div className="bento__portrait-hero">
            <div className="bento__portrait-wrap">
              <img
                src="/pranay.jpeg"
                alt="Pranay Patil"
                className="bento__portrait-img"
                onError={(e) => {
                  if (!e.target.dataset.tried) {
                    e.target.dataset.tried = '1'
                    e.target.src = '/pranay.jpg'
                  }
                }}
              />
              <div className="bento__portrait-gradient" />
              <div className="bento__portrait-badges">
                <div className="bento__status-pill">
                  <span className="bento__pulse-dot" />
                  <span>Available for Hire</span>
                </div>
                <div className="bento__verified-pill">
                  <span className="bento__verified-check">✓</span>
                  <span>MERN Engineer</span>
                </div>
              </div>
            </div>

            <div className="bento__name-text">
              <p className="bento__tag">FULL-STACK &amp; MERN ENGINEER</p>
              <h1 className="bento__name">
                Pranay<br /><em>Patil</em>
              </h1>
            </div>

            <div className="bento__footer-info">
              <div className="bento__location">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Nashik, Maharashtra, India</span>
              </div>
              <span className="bento__edu-tag">Sandip Univ · 8.61 CGPA</span>
            </div>
          </div>
        </BentoCard>

        {/* Card 2 — Status & Focus */}
        <BentoCard className="bento--status" maxTilt={12}>
          <div className="bento__status-dot" />
          <p className="bento__status-label">CURRENT OBJECTIVE</p>
          <p className="bento__status-text">
            Open to<br />
            <span>Internships</span>
          </p>
          <div className="bento__status-meta">
            <span>Summer &amp; Fall 2026</span>
          </div>
        </BentoCard>

        {/* Card 3 — Core Philosophy & CTA */}
        <BentoCard className="bento--desc" maxTilt={10}>
          <div className="bento__desc-top">
            <div className="bento__label-row">
              <span className="bento__section-indicator" />
              <span className="bento__sec-label">PRODUCT MINDSET</span>
            </div>
            <p className="bento__desc">
              Computer Science undergraduate crafting robust full-stack architectures, high-performance REST APIs, and applied AI systems with tangible user impact.
            </p>
          </div>
          <div className="bento__cta">
            <button
              className="btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Featured Work <span>→</span>
            </button>
            <a
              href="https://drive.google.com/file/d/1hd_sRtUERYqeG1J8dpRoSRMNRPwHzatf/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              Resume ↗
            </a>
          </div>
        </BentoCard>

        {/* Card 4 — Live Architecture Config */}
        <BentoCard className="bento--code" maxTilt={10}>
          <div className="bento__code-header">
            <div className="bento__code-dots">
              <span /><span /><span />
            </div>
            <p className="bento__code-file">pranay.config.ts</p>
          </div>
          <pre className="bento__code-body">
            <code>{`export const engineer = {
  name: "Pranay Patil",
  specialization: "MERN & Full-Stack",
  core: ["React", "Node", "Express", "MongoDB"],
  languages: ["Java", "JavaScript", "SQL"],
  status: "🟢 Ready for Production",
  mindset: "Craftsmanship & Velocity"
}`}</code>
          </pre>
        </BentoCard>

        {/* Card 5 — Real-time World Time */}
        <BentoCard className="bento--time" maxTilt={14}>
          <p className="bento__time-label">LOCAL CLOCK · IST</p>
          <p className="bento__time-val">{time || '08:15:30 AM'}</p>
          <p className="bento__time-city">Nashik (UTC+5:30)</p>
          <div className="bento__time-zone-pill">Asia/Kolkata</div>
        </BentoCard>

        {/* Card 6 — Social Presence */}
        <BentoCard className="bento--social" maxTilt={10}>
          <div className="bento__social-header">
            <span className="bento__sec-label">VERIFIED PROFILES</span>
          </div>
          <div className="bento__social-links">
            <a
              href="https://github.com/Pranaypatil43"
              target="_blank"
              rel="noreferrer"
              className="bento__social-link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
              </svg>
              <span>GitHub</span>
              <span className="bento__social-arrow">↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/pranay-patil-2a676a354"
              target="_blank"
              rel="noreferrer"
              className="bento__social-link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn</span>
              <span className="bento__social-arrow">↗</span>
            </a>
            <a
              href="https://leetcode.com/u/pranay_patil_57/"
              target="_blank"
              rel="noreferrer"
              className="bento__social-link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
              </svg>
              <span>LeetCode</span>
              <span className="bento__social-arrow">↗</span>
            </a>
          </div>
        </BentoCard>

        {/* Card 7 — Stack Marquee Banner */}
        <div className="bento bento--marquee">
          <div className="marquee__track">
            {[
              'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Java', 'JavaScript',
              'REST APIs', 'AWS', 'Git', 'Gemini API', 'LLaMA', 'MySQL', 'Tailwind',
              'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Java', 'JavaScript',
              'REST APIs', 'AWS', 'Git', 'Gemini API', 'LLaMA', 'MySQL', 'Tailwind'
            ].map((t, i) => (
              <span key={i} className="marquee__item">
                <span className="marquee__dot" />
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
