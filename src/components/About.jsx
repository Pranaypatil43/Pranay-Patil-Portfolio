import React, { useEffect, useRef } from 'react'
import useInView from '../hooks/useInView'
import { techLogos, getTechKey } from './TechLogos'
import './About.css'

/* Animated canvas — interactive connected constellation with REAL official tech logos */
function NodeCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let W, H

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
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

    const skillList = [
      'React', 'Node.js', 'MongoDB', 'Express',
      'Java', 'JavaScript', 'TypeScript', 'AWS',
      'Git', 'Gemini AI', 'MySQL', 'Vite'
    ]

    // Preload SVG Image objects for each skill
    const nodeImages = skillList.map((name) => {
      const key = getTechKey(name)
      const item = techLogos[key] || techLogos.code
      const img = new Image()
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(item.svg)
      return { name, img, color: item.color }
    })

    const NODES = nodeImages.map(({ name, img, color }) => ({
      label: name,
      img,
      color,
      x: Math.random() * (W ? W - 70 : 330) + 35,
      y: Math.random() * (H ? H - 70 : 230) + 35,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: 15, // badge radius
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Connections between nodes
      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const dx = NODES[i].x - NODES[j].x
          const dy = NODES[i].y - NODES[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 145) {
            ctx.beginPath()
            ctx.moveTo(NODES[i].x, NODES[i].y)
            ctx.lineTo(NODES[j].x, NODES[j].y)
            ctx.strokeStyle = `rgba(255, 51, 102, ${0.16 * (1 - dist / 145)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Dynamic connections to mouse cursor
      for (let i = 0; i < NODES.length; i++) {
        const mdx = NODES[i].x - mouse.x
        const mdy = NODES[i].y - mouse.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < 130) {
          ctx.beginPath()
          ctx.moveTo(NODES[i].x, NODES[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(255, 51, 102, ${0.4 * (1 - mdist / 130)})`
          ctx.lineWidth = 1.3
          ctx.stroke()

          // Gentle attraction toward mouse
          NODES[i].x -= (mdx / mdist) * 0.4
          NODES[i].y -= (mdy / mdist) * 0.4
        }
      }

      // Draw nodes with official logos and labels
      NODES.forEach((n) => {
        // Outer radiant glow
        const grd = ctx.createRadialGradient(n.x, n.y, n.r * 0.4, n.x, n.y, n.r * 2.2)
        grd.addColorStop(0, 'rgba(255, 51, 102, 0.28)')
        grd.addColorStop(1, 'rgba(255, 51, 102, 0)')
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Circular dark ruby glass badge container
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(20, 6, 12, 0.94)'
        ctx.fill()
        ctx.lineWidth = 1.4
        ctx.strokeStyle = 'rgba(255, 51, 102, 0.4)'
        ctx.stroke()

        // Real official SVG brand logo
        if (n.img && n.img.complete && n.img.naturalWidth !== 0) {
          const iconSize = 17
          ctx.drawImage(n.img, n.x - iconSize / 2, n.y - iconSize / 2, iconSize, iconSize)
        }

        // Crisp white text label
        ctx.font = '600 11px "Plus Jakarta Sans", sans-serif'
        ctx.textAlign = 'center'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(n.label, n.x, n.y + n.r + 14)

        // Physics motion
        n.x += n.vx
        n.y += n.vy
        if (n.x < 24 || n.x > W - 24) n.vx *= -1
        if (n.y < 24 || n.y > H - 24) n.vy *= -1
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
            Computer Science undergraduate with expertise in Java, JavaScript, Data Structures and Algorithms, and
            MERN Stack. Experienced in developing full-stack web applications, RESTful APIs, authentication systems,
            and database-driven applications using modern web technologies.
          </p>
          <p className="about__para">
            I’m currently exploring large language models, AI agents, and long-term systems that can handle real-world complexity.
          </p>

          <div className="about__details">
            {[
              ['Degree', 'B.Tech CSE · 2023–2027'],
              ['CGPA', '8.61 / 10'],
              ['Based in', 'Nashik, Maharashtra'],
              ['Status', '🟢 Open to internships'],
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
