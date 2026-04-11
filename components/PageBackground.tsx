'use client'
import { useEffect, useRef } from 'react'

export default function PageBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    let rafId: number
    let t = 0

   const COUNT = window.innerWidth < 768 ? 700 : 3000
    type Particle = {
      // 3D coordinates — same as HeroCanvas
      x3: number; y3: number; z3: number
      // rotation offsets
      rotY: number; rotX: number
      r: number; alpha: number
    }

    // Camera perspective
    const CAM_Z = 6
    const FOV = 600 // perspective factor

    // Project 3D point to 2D screen
    const project = (x3: number, y3: number, z3: number, rotX: number, rotY: number) => {
      // Apply Y rotation (mouse parallax)
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
      const x1 = x3 * cosY + z3 * sinY
      const z1 = -x3 * sinY + z3 * cosY
      // Apply X rotation
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
      const y1 = y3 * cosX - z1 * sinX
      const z2 = y3 * sinX + z1 * cosX
      // Perspective divide
      const scale = FOV / (FOV + z2 + CAM_Z * 80)
      return {
        sx: W / 2 + x1 * scale * 80,
        sy: H / 2 + y1 * scale * 80,
        scale
      }
    }

    // Create particles spread in 3D space — same spread as HeroCanvas
    // HeroCanvas: x*16, y*10, z*8 — scale up for full screen
    const scaleX = W / 400
    const scaleY = H / 250

    let particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x3: (Math.random() - 0.5) * 16 * scaleX,
      y3: (Math.random() - 0.5) * 10 * scaleY,
      z3: (Math.random() - 0.5) * 8,
      rotY: 0, rotX: 0,
      r: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.35 + 0.08
    }))

    // Global rotation — mirrors HeroCanvas particle rotation
    let globalRotY = 0
    let globalRotX = 0

    // Mouse parallax — same as HeroCanvas group rotation
    let mx = 0, my = 0, tx = 0, ty = 0
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / W) * 2 - 1
      my = -((e.clientY / H) * 2 - 1)
    }
    window.addEventListener('mousemove', onMouse)

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
      const sX = W / 400
      const sY = H / 250
      particles = Array.from({ length: COUNT }, () => ({
        x3: (Math.random() - 0.5) * 16 * sX,
        y3: (Math.random() - 0.5) * 10 * sY,
        z3: (Math.random() - 0.5) * 8,
        rotY: 0, rotX: 0,
        r: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.35 + 0.08
      }))
    }
    window.addEventListener('resize', onResize)

    canvas.width = W
    canvas.height = H

    const loop = () => {
      rafId = requestAnimationFrame(loop)
      t += 0.008

      // Exactly same as HeroCanvas:
      // particles.rotation.y += 0.0005
      // particles.rotation.x += 0.0002
      globalRotY += 0.0005
      globalRotX += 0.0002

      // Mouse parallax — same as HeroCanvas group rotation lerp
      tx += (mx - tx) * 0.04
      ty += (my - ty) * 0.04
      const mouseRotY = tx * 0.5
      const mouseRotX = -ty * 0.3

      ctx.clearRect(0, 0, W, H)

      particles.forEach(p => {
        const { sx, sy, scale } = project(
          p.x3, p.y3, p.z3,
          globalRotX + mouseRotX,
          globalRotY + mouseRotY
        )

        // Skip if off screen
        if (sx < -50 || sx > W + 50 || sy < -50 || sy > H + 50) return

        const size = Math.max(0.3, p.r * scale * 2)
        const alpha = p.alpha * Math.min(1, scale * 3)

        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(129,140,248,${alpha})`
        ctx.fill()
      })
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  )
}
