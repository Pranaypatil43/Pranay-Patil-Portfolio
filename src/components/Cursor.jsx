import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    // Only run on non-touch devices with fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    let mx = -100, my = -100
    let rx = -100, ry = -100
    let raf
    let active = false

    const onMove = (e) => {
      if (!active) {
        active = true
        document.body.classList.add('custom-cursor-active')
      }
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
      document.body.classList.remove('custom-cursor-active')
      active = false
    }

    const onEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
      document.body.classList.add('custom-cursor-active')
      active = true
    }

    const lerp = (a, b, t) => a + (b - a) * t
    const tick = () => {
      rx = lerp(rx, mx, 0.16)
      ry = lerp(ry, my, 0.16)
      ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`
      raf = requestAnimationFrame(tick)
    }
    tick()

    // Grow on hoverable interactive elements
    const grow = () => {
      dot.style.width = '4px'
      dot.style.height = '4px'
      ring.style.width = '52px'
      ring.style.height = '52px'
      ring.style.borderColor = 'rgba(240, 122, 60, 0.85)'
      ring.style.background = 'rgba(240, 122, 60, 0.08)'
    }

    const shrink = () => {
      dot.style.width = '8px'
      dot.style.height = '8px'
      ring.style.width = '36px'
      ring.style.height = '36px'
      ring.style.borderColor = 'rgba(240, 122, 60, 0.45)'
      ring.style.background = 'rgba(240, 122, 60, 0.02)'
    }

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-cursor], .stat-card, .skill-card, .proj-card, .bento').forEach((el) => {
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
      document.body.classList.remove('custom-cursor-active')
      cancelAnimationFrame(raf)
      obs.disconnect()
    }
  }, [])

  return null
}
