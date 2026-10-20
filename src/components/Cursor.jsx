import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    // Only run on non-touch devices with fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) return

    const ring = document.getElementById('cursor-ring')
    if (!ring) return

    let mx = -100, my = -100
    let rx = -100, ry = -100
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      ring.style.opacity = '1'
    }

    const onLeave = () => {
      ring.style.opacity = '0'
    }

    const onEnter = () => {
      ring.style.opacity = '1'
    }

    const lerp = (a, b, t) => a + (b - a) * t
    const tick = () => {
      rx = lerp(rx, mx, 0.18)
      ry = lerp(ry, my, 0.18)
      ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`
      raf = requestAnimationFrame(tick)
    }
    tick()

    // Grow on hoverable interactive elements
    const grow = () => {
      ring.style.width = '52px'
      ring.style.height = '52px'
      ring.style.borderColor = 'rgba(255, 51, 102, 0.75)'
      ring.style.background = 'rgba(255, 51, 102, 0.08)'
      ring.style.boxShadow = '0 0 24px rgba(255, 51, 102, 0.25)'
    }

    const shrink = () => {
      ring.style.width = '40px'
      ring.style.height = '40px'
      ring.style.borderColor = 'rgba(255, 51, 102, 0.35)'
      ring.style.background = 'rgba(255, 51, 102, 0.03)'
      ring.style.boxShadow = '0 0 20px rgba(255, 51, 102, 0.15)'
    }

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-cursor], .stat-card, .skill-card, .proj-card, .bento, .contact__card').forEach((el) => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }

    attachHover()

    const obs = new MutationObserver(() => {
      attachHover()
    })
    obs.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
      obs.disconnect()
    }
  }, [])

  return null
}
