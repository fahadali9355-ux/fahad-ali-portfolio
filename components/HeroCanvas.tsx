'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    const W = el.offsetWidth
    const H = el.offsetHeight
    if (W === 0 || H === 0) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.z = 6

    const pCount = 10
    const pGeo = new THREE.BufferGeometry()
    const pos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const particles = new THREE.Points(pGeo,
      new THREE.PointsMaterial({
        color: 0x818cf8, size: 0.04,
        transparent: true, opacity: 0.55,
        sizeAttenuation: true
      })
    )
    scene.add(particles)

    const group = new THREE.Group()
    scene.add(group)

    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 1),
      new THREE.MeshBasicMaterial({ color: 0x818cf8, wireframe: true, transparent: true, opacity: 0.45 })
    )
    group.add(ico)

    const tor1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.012, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.45 })
    )
    tor1.rotation.x = Math.PI / 3
    group.add(tor1)

    const tor2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.008, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.35 })
    )
    tor2.rotation.x = Math.PI / 5
    tor2.rotation.y = Math.PI / 4
    group.add(tor2)

    const fColors = [0x818cf8, 0x22d3ee, 0xc084fc, 0xf472b6]
    const floaters: THREE.Mesh[] = []
    for (let i = 0; i < 6; i++) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.06 + Math.random() * 0.08, 8, 8),
        new THREE.MeshBasicMaterial({ color: fColors[i % 4], transparent: true, opacity: 0.8 })
      )
      mesh.position.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2
      )
      mesh.userData = {
        ox: mesh.position.x,
        oy: mesh.position.y,
        speed: 0.8 + Math.random() * 1.0, // Increased base moving speed
        phase: Math.random() * Math.PI * 2
      }
      group.add(mesh)
      floaters.push(mesh)
    }

    let mx = 0, my = 0, tx = 0, ty = 0
    const onMouse = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      mx = ((e.clientX - r.left) / r.width) * 2 - 1
      my = -(((e.clientY - r.top) / r.height) * 2 - 1)
    }
    el.addEventListener('mousemove', onMouse)

    let t = 0, rafId: number
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      t += 0.015 // Increased base time for floaters
      tx += (mx - tx) * 0.08 // Increased mouse tracking responsiveness
      ty += (my - ty) * 0.08
      group.rotation.y = tx * 0.6
      group.rotation.x = -ty * 0.4
      ico.rotation.y += 0.008 // Faster base rotation
      ico.rotation.x += 0.004
      tor1.rotation.z += 0.006 // Faster torus rotation
      tor2.rotation.z -= 0.008
      tor2.rotation.x += 0.002
      floaters.forEach(f => {
        f.position.x = f.userData.ox + Math.sin(t * f.userData.speed + f.userData.phase) * 0.4
        f.position.y = f.userData.oy + Math.cos(t * f.userData.speed * 0.7 + f.userData.phase) * 0.4
      })
      particles.rotation.y += 0.001
      particles.rotation.x += 0.0004
      renderer.render(scene, camera)
    }
    animate()

    const ro = new ResizeObserver(() => {
      const w = el.offsetWidth, h = el.offsetHeight
      if (w === 0 || h === 0) return
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    ro.observe(el)

    return () => {
      cancelAnimationFrame(rafId)
      el.removeEventListener('mousemove', onMouse)
      ro.disconnect()
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}
