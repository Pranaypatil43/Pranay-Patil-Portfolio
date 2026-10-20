import React, { useState } from 'react'
import useInView from '../hooks/useInView'
import useTilt3D from '../hooks/useTilt3D'
import './Contact.css'

const socials = [
  {
    label: 'GitHub',
    handle: '@Pranaypatil43',
    href: 'https://github.com/Pranaypatil43',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    handle: 'pranay-patil',
    href: 'https://www.linkedin.com/in/pranay-patil-2a676a354',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'LeetCode',
    handle: 'pranay_patil_57',
    href: 'https://leetcode.com/u/pranay_patil_57/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
]

function ContactCard({ href, label, val, isPrimary = false }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D({ maxTilt: 8, scale: 1.02 })
  const [copied, setCopied] = useState(false)

  const handleCopy = (e) => {
    if (e.target.closest('.contact__copy-btn')) {
      e.preventDefault()
      navigator.clipboard.writeText(val)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <a
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      href={href}
      onClick={handleCopy}
      className={`contact__card ${isPrimary ? 'contact__card--primary' : ''}`}
    >
      <div className="contact__card-glare" />
      <div className="contact__card-top">
        <span className="contact__card-label">{label}</span>
        <button className="contact__copy-btn" title="Copy to clipboard">
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <span className="contact__card-val">{val}</span>
      <div className="contact__card-footer">
        <span>Connect directly</span>
        <span className="contact__card-arrow">↗</span>
      </div>
    </a>
  )
}

export default function Contact() {
  const [ref, inView] = useInView()

  return (
    <>
      <section id="contact" className="contact section">
        <div className="pill-label"><span className="dot" /> 05 — GET IN TOUCH</div>

        <div ref={ref} className={`contact__inner reveal${inView ? ' visible' : ''}`}>
          <div className="contact__left">
            <h2 className="contact__headline">
              Let's engineer<br />something<br /><em>exceptional.</em>
            </h2>
            <p className="contact__sub">
              Open to Software Engineering and Full-Stack Internships, technical collaborations, and building impactful digital products. I respond promptly within 24 hours.
            </p>

            <div className="contact__location-badge">
              <span className="contact__status-live" />
              <span>Based in Nashik, Maharashtra · Available for Remote &amp; On-Site Roles</span>
            </div>
          </div>

          <div className="contact__right">
            <div className="contact__cards">
              <ContactCard
                href="mailto:pranaypatilpp43@gmail.com"
                label="PRIMARY INBOX"
                val="pranaypatilpp43@gmail.com"
                isPrimary={true}
              />
              <ContactCard
                href="tel:+919370968129"
                label="DIRECT PHONE"
                val="+91 93709 68129"
                isPrimary={false}
              />
            </div>

            <div className="contact__socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact__social-pill"
                >
                  <span className="contact__social-icon">{s.icon}</span>
                  <div className="contact__social-info">
                    <span className="contact__social-name">{s.label}</span>
                    <span className="contact__social-handle">{s.handle}</span>
                  </div>
                  <span className="contact__social-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__left">
          <span className="footer__logo">
            PP<span className="footer__logo-dot">.</span>
          </span>
          <span className="footer__copy">
            © 2026 Pranay Patil · Architected with React, Three.js &amp; Modern WebGL
          </span>
        </div>
        <p className="footer__status">
          <span className="footer__status-dot" />
          Production Environment · All Systems Operational
        </p>
        <div className="footer__links">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </footer>
    </>
  )
}
