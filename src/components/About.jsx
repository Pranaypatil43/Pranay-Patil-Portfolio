import React, { useEffect, useRef } from 'react'
import useInView from '../hooks/useInView'
import './About.css'

/* Animated canvas — interactive connected constellation */
function NodeCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let W, H

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let mouse = { x: -1000, y: -1000 }
    const onCanvasMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onCanvasLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }
    canvas.addEventListener('mousemove', onCanvasMove)
    canvas.addEventListener('mouseleave', onCanvasLeave)

    const skills = ['React', 'Node.js', 'MongoDB', 'Express', 'Java', 'REST API', 'JWT', 'AWS', 'Git', 'Gemini AI', 'MySQL', 'JavaScript']
    const NODES = skills.map((label) => ({
      label,
      x: Math.random() * (W || 400),
      y: Math.random() * (H || 300),
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 2.5 + 3,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // connections between nodes
      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const dx = NODES[i].x - NODES[j].x
          const dy = NODES[i].y - NODES[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(NODES[i].x, NODES[i].y)
            ctx.lineTo(NODES[j].x, NODES[j].y)
            ctx.strokeStyle = `rgba(255, 51, 102, ${0.18 * (1 - dist / 150)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // connections to mouse cursor
      for (let i = 0; i < NODES.length; i++) {
        const mdx = NODES[i].x - mouse.x
        const mdy = NODES[i].y - mouse.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < 120) {
          ctx.beginPath()
          ctx.moveTo(NODES[i].x, NODES[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(255, 51, 102, ${0.35 * (1 - mdist / 120)})`
          ctx.lineWidth = 1.2
          ctx.stroke()
        }
      }

      // nodes + labels
      NODES.forEach(n => {
        // glow aura
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3.5)
        grd.addColorStop(0, 'rgba(255, 51, 102, 0.35)')
        grd.addColorStop(1, 'rgba(255, 51, 102, 0)')
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // core dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = '#ff3366'
        ctx.fill()

        // high-contrast label
        ctx.font = '600 11px "JetBrains Mono", monospace'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(n.label, n.x + n.r + 7, n.y + 4)

        // motion
        n.x += n.vx
        n.y += n.vy
        if (n.x < 20 || n.x > W - 20) n.vx *= -1
        if (n.y < 20 || n.y > H - 20) n.vy *= -1
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onCanvasMove)
      canvas.removeEventListener('mouseleave', onCanvasLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="about__canvas" />
}

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="about section">
      <div className="pill-label"><span className="dot" /> 01 — ABOUT</div>

      <div ref={ref} className="about__grid">

        {/* Left — animated node canvas */}
        <div className={`about__anim-col reveal-left${inView ? ' visible' : ''}`}>
          <div className="about__canvas-wrap">
            <NodeCanvas />
            <div className="about__canvas-label">Tech Stack</div>
          </div>

          <div className="about__stat-cards">
            <div className="stat-card">
              <span className="stat-card__num">8.61</span>
              <span className="stat-card__label">CGPA / 10</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num">4+</span>
              <span className="stat-card__label">Projects</span>
            </div>
            <div className="stat-card stat-card--accent">
              <span className="stat-card__num">∞</span>
              <span className="stat-card__label">Curiosity</span>
            </div>
          </div>
        </div>

        {/* Right — bio */}
        <div className={`about__bio-col reveal-right${inView ? ' visible' : ''}`}>
          <div className="about__eyebrow">ABOUT ME</div>
          <h2 className="about__headline">
            I build for the space between an idea and a <em>working product.</em>
          </h2>
          <p className="about__para">
            I'm a final-year Computer Science undergraduate at Sandip University, Nashik. I like turning practical problems into database-driven web applications that are clear, secure, and genuinely useful.
          </p>
          <p className="about__para">
            My current toolkit centers on Java, JavaScript, the MERN stack, REST APIs, authentication systems, and experiments with LLM-powered products.
          </p>

          <div className="about__details">
            {[
              ['Degree',   'B.Tech CSE · 2023–2027'],
              ['CGPA',     '8.61 / 10'],
              ['Based in', 'Nashik, Maharashtra'],
              ['Status',   '🟢 Open to internships'],
            ].map(([label, val]) => (
              <div key={label} className="about__detail-row">
                <span className="about__detail-label">{label}</span>
                <span className="about__detail-val">{val}</span>
              </div>
            ))}
          </div>

          <div className="about__actions">
            <button
              className="btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects <span>→</span>
            </button>
            <a
              href="https://drive.google.com/file/d/1AQQCivka3jSKQF9MU5jdl-bcG-niCUfp/view?usp=sharing"
              target="_blank" rel="noreferrer"
              className="btn-ghost"
            >
              Resume ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
