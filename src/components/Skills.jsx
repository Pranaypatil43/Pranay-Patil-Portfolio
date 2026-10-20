import React from 'react'
import useInView from '../hooks/useInView'
import useTilt3D from '../hooks/useTilt3D'
import './Skills.css'

const categories = [
  { icon: '⚡', name: 'Languages', color: '#ff3366', items: ['Java', 'JavaScript (ES6+)', 'SQL', 'TypeScript Basics'] },
  { icon: '🎨', name: 'Frontend Engineering', color: '#fb7185', items: ['React.js', 'Vite', 'HTML5 & CSS3', 'Component Systems', 'Bootstrap'] },
  { icon: '⚙️', name: 'Backend & Services', color: '#f59e0b', items: ['Node.js', 'Express.js', 'RESTful APIs', 'MVC Architecture'] },
  { icon: '🔐', name: 'Security & Auth', color: '#e11d48', items: ['JWT Tokens', 'RBAC (Role-Based Access)', 'Password Hashing', 'Session Security'] },
  { icon: '🤖', name: 'Applied AI & LLMs', color: '#f43f5e', items: ['Gemini 1.5 API', 'Oracle Agentic AI', 'Groq API', 'LLaMA', 'Prompt Pipelines'] },
  { icon: '🗄️', name: 'Data Architecture', color: '#fda4af', items: ['MongoDB', 'MongoDB Atlas', 'MySQL', 'Relational Schemas', 'NoSQL Queries'] },
  { icon: '☁️', name: 'Cloud & Tooling', color: '#ea580c', items: ['AWS Basics', 'Git & GitHub', 'Postman API Testing', 'VS Code', 'Vercel Deployment'] },
  { icon: '🧠', name: 'Computer Science Core', color: '#f87171', items: ['Data Structures & Algorithms', 'OOP Principles', 'DBMS', 'Operating Systems', 'Networking'] },
]

function SkillCard({ cat, i, inView }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D({ maxTilt: 10, scale: 1.02 })

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`skill-card reveal${inView ? ' visible' : ''}`}
      style={{
        transitionDelay: inView ? `${i * 0.06}s` : '0s',
        '--card-accent': cat.color,
      }}
    >
      <div className="skill-card__glare" />
      <div className="skill-card__head">
        <span className="skill-card__icon">{cat.icon}</span>
        <span className="skill-card__name">{cat.name}</span>
      </div>
      <div className="skill-card__chips">
        {cat.items.map((item) => (
          <span key={item} className="skill-chip">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView()
  return (
    <section id="skills" className="skills section">
      <div className="pill-label"><span className="dot" /> 02 — TOOLKIT</div>
      <div className="skills__header">
        <div>
          <h2 className="skills__headline">
            Technical foundation. <em>Modern toolkit.</em>
          </h2>
          <p className="skills__sub">
            The core technologies, libraries, and engineering concepts I rely on to turn specifications into working code.
          </p>
        </div>
      </div>

      <div ref={ref} className="skills__grid">
        {categories.map((cat, i) => (
          <SkillCard key={cat.name} cat={cat} i={i} inView={inView} />
        ))}
      </div>
    </section>
  )
}
