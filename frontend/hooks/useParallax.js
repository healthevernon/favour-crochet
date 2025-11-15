import { useRef, useEffect } from 'react'
import { useScroll, useTransform, useSpring } from 'framer-motion'

export function useParallax(speed = 0.5) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 60,
    restDelta: 0.001,
    mass: 0.3
  })
  
  const y = useTransform(smoothProgress, [0, 1], ["0%", `${speed * 100}%`])
  
  return { ref, y }
}

export function useZoomParallax() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  
  return { ref, scale, opacity }
}

export function useMouseParallax(strength = 20) {
  const ref = useRef(null)
  const x = useRef(0)
  const y = useRef(0)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      x.current = (e.clientX - centerX) / rect.width * strength
      y.current = (e.clientY - centerY) / rect.height * strength
      
      element.style.transform = `translate3d(${x.current}px, ${y.current}px, 0)`
    }
    
    const handleMouseLeave = () => {
      element.style.transform = 'translate3d(0, 0, 0)'
    }
    
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])
  
  return ref
}

export function use3DParallax() {
  const ref = useRef(null)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = (y - centerY) / centerY * -10
      const rotateY = (x - centerX) / centerX * 10
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }
    
    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }
    
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  return ref
}