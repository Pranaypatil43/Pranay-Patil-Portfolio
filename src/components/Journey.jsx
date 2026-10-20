import React from 'react'
import useInView from '../hooks/useInView'
import './Journey.css'

const education = [
  {
    year: '2023–2027',
    place: 'Sandip University, Nashik',
    degree: 'B.Tech in Computer Science & Engineering',
    result: '8.61 / 10',
    resultLabel: 'CGPA',
    current: true,
  },
  {
    year: '2023',
    place: 'Indira Gandhi Madhya Vidya & Jr College',
    degree: 'Higher Secondary Certificate (HSC)',
    result: '80.83%',
    resultLabel: 'Percentage',
  },
  {
    year: '2021',
    place: 'R.T. Kabara Vidyalaya',
    degree: 'Secondary School Certificate (SSC)',
    result: '81.60%',
    resultLabel: 'Percentage',
  },
]

export default function Journey() {
  const [ref, inView] = useInView()

  return (
    <section id="journey" className="journey section">
      <div className="pill-label"><span className="dot" /> 04 — JOURNEY</div>

      <div className="journey__header">
        <h2 className="journey__headline">Education <em>so far.</em></h2>
        <p className="journey__sub">A foundation in computer science backed by steady academic progress.</p>
      </div>

      <div ref={ref} className="journey__table">
        {/* Table header */}
        <div className="journey__table-head">
          <span>Year</span>
          <span>Institution</span>
          <span>Qualification</span>
          <span>Score</span>
        </div>

        {education.map((e, i) => (
          <div
            key={i}
            className={`journey__row reveal${inView ? ' visible' : ''}`}
            style={{ transitionDelay: inView ? `${i * 0.12}s` : '0s' }}
          >
            <span className="journey__row-year">{e.year}</span>

            <div className="journey__row-place">
              {e.current && <span className="journey__current-dot" />}
              <span className="journey__row-name">{e.place}</span>
            </div>

            <span className="journey__row-degree">{e.degree}</span>

            <div className="journey__row-score">
              <span className="journey__row-result">{e.result}</span>
              <span className="journey__row-result-label">{e.resultLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
