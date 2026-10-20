import React from 'react'
import useInView from '../hooks/useInView'
import './Achievements.css'

const milestones = [
  {
    year: '2026',
    title: 'Oracle Certified Foundations Associate',
    sub: 'Agentic AI · Oracle',
    icon: '🏆',
  },
  {
    year: '2025',
    title: 'NASA International Space Apps Challenge',
    sub: 'Galactic Problem Solver',
    icon: '🚀',
  },
  {
    year: '2025',
    title: 'Smart India Hackathon (SIH)',
    sub: 'Internal selection',
    icon: '🇮🇳',
  },
  {
    year: '2024',
    title: 'LeetCode — Active Problem Solver',
    sub: '100+ problems solved',
    icon: '💻',
    link: 'https://leetcode.com/u/pranay_patil_57/',
  },
]

export default function Achievements() {
  const [ref, inView] = useInView()

  return (
    <section id="achievements" className="achievements section">
      <div className="pill-label"><span className="dot" /> 05 — ACHIEVEMENTS</div>

      <div className="achievements__header">
        <h2 className="achievements__headline">
          Learning beyond <em>the syllabus.</em>
        </h2>
        <p className="achievements__sub">
          Certifications, hackathons, and competitive milestones outside the classroom.
        </p>
      </div>

      <div ref={ref} className="achievements__list">
        {milestones.map((m, i) => (
          <div
            key={i}
            className={`achievement-row reveal${inView ? ' visible' : ''}`}
            style={{ transitionDelay: inView ? `${i * 0.1}s` : '0s' }}
          >
            <span className="achievement-row__num">0{i + 1}</span>

            <span className="achievement-row__icon">{m.icon}</span>

            <div className="achievement-row__body">
              <h3 className="achievement-row__title">
                {m.link
                  ? <a href={m.link} target="_blank" rel="noreferrer">{m.title}</a>
                  : m.title}
              </h3>
              <p className="achievement-row__sub">{m.sub}</p>
            </div>

            <span className="achievement-row__year">{m.year}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
