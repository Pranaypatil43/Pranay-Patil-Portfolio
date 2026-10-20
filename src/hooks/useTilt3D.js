import { useRef, useCallback } from 'react'

/**
 * Custom 3D Tilt Hook
 * Applies 3D perspective rotation, specular glare reflection, and smooth spring physics to any element.
 */
export default function useTilt3D(options = {}) {
  const {
    maxTilt = 12,
    perspective = 1000,
    scale = 1.02,
    glare = true,
  } = options

  const ref = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const card = ref.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const percentX = (x - centerX) / centerX
    const percentY = (y - centerY) / centerY

    const tiltX = -percentY * maxTilt
    const tiltY = percentX * maxTilt

    card.style.transform = `perspective(${perspective}px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    card.style.transition = 'transform 0.08s ease-out'

    if (glare) {
      const glarePercentX = (x / rect.width) * 100
      const glarePercentY = (y / rect.height) * 100
      card.style.setProperty('--glare-x', `${glarePercentX.toFixed(1)}%`)
      card.style.setProperty('--glare-y', `${glarePercentY.toFixed(1)}%`)
      card.style.setProperty('--glare-opacity', '0.15')
    }
  }, [maxTilt, perspective, scale, glare])

  const handleMouseLeave = useCallback(() => {
    const card = ref.current
    if (!card) return

    card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'

    if (glare) {
      card.style.setProperty('--glare-opacity', '0')
    }
  }, [perspective, glare])

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  }
}
