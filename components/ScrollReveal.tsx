'use client'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'blur'
  className?: string
  duration?: number
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  duration = 1.4
}: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
      x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
      scale: direction === 'scale' ? 0.8 : direction === 'up' || direction === 'down' ? 0.97 : 1,
      filter: direction === 'blur' ? 'blur(20px)' : 'blur(0px)',
      rotateX: direction === 'up' ? 8 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      rotateX: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  )
}
