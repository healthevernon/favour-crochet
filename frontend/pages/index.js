import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { PlayIcon, SparklesIcon } from '@heroicons/react/24/outline'
import Layout from '../components/Layout'
import useStore from '../store/useStore'

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(price)
}

function HomePage() {
  const { 
    addToCart,
    showNotification 
  } = useStore()

  // State for mouse position and scroll
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  // Refs for scroll animations
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const productRef = useRef(null)
  
  // Scroll animation hooks with spring physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const smoothScrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  const heroY = useTransform(smoothScrollY, [0, 1], ["0%", "80%"])
  const heroOpacity = useTransform(smoothScrollY, [0, 0.3], [1, 0])
  const heroScale = useTransform(smoothScrollY, [0, 1], [1, 1.2])
  const textY = useTransform(smoothScrollY, [0, 1], ["0%", "-100%"])
  const backgroundY = useTransform(smoothScrollY, [0, 1], ["0%", "50%"])
  
  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      })
    }
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div ref={containerRef}>
      <Layout title="Suriname Pangi - Premium Fashion & Style">
        {/* Hero Section with Advanced Parallax */}
        <motion.section 
          ref={heroRef}
          className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Layered Background with Multiple Parallax Elements */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ scale: heroScale, y: backgroundY }}
          >
            {/* Base gradient */}
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
              
              {/* Floating geometric shapes */}
              <motion.div
                className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-3xl"
                style={{
                  x: mousePosition.x * 30,
                  y: mousePosition.y * 20,
                  rotate: scrollY * 0.1
                }}
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <motion.div
                className="absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full"
                style={{
                  x: mousePosition.x * -40,
                  y: mousePosition.y * -30,
                  rotate: scrollY * -0.05
                }}
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96"
                style={{
                  x: mousePosition.x * 15,
                  y: mousePosition.y * 15
                }}
              >
                {/* Central crochet pattern */}
                <motion.div
                  className="w-full h-full relative"
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {/* Crochet pattern simulation */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                        transformOrigin: '0 0',
                        rotate: i * 45,
                        x: 100
                      }}
                      animate={{
                        scale: [0.5, 1, 0.5],
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
              
              {/* Particle system */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                    animate={{
                      y: [0, -100, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Hero Content with Enhanced Styling */}
          <motion.div 
            className="relative z-10 text-center text-white px-4"
            style={{ y: textY }}
          >
            {/* Glowing backdrop */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="mb-6"
              >
                <SparklesIcon className="w-12 h-12 mx-auto text-yellow-400 animate-pulse" />
              </motion.div>
              
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 50%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                <motion.span
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(96, 165, 250, 0.5)',
                      '0 0 40px rgba(168, 85, 247, 0.8)',
                      '0 0 20px rgba(96, 165, 250, 0.5)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  SURINAME
                </motion.span>
                <br />
                <motion.span
                  className="relative"
                  animate={{
                    textShadow: [
                      '0 0 30px rgba(168, 85, 247, 0.8)',
                      '0 0 50px rgba(96, 165, 250, 0.6)',
                      '0 0 30px rgba(168, 85, 247, 0.8)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  PANGI
                  {/* Decorative underline */}
                  <motion.div
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                  />
                </motion.span>
              </motion.h1>
              
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-xl md:text-2xl mb-12 font-light max-w-2xl mx-auto leading-relaxed"
                style={{
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                }}
              >
                <motion.span
                  animate={{
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Handcrafted elegance meets modern innovation.
                </motion.span>
                <br />
                <motion.span
                  animate={{
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                >
                  Discover the art of Surinamese crochet reimagined.
                </motion.span>
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="space-y-6"
              >
                {/* Enhanced CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden rounded-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                    <Link href="/products" className="relative block bg-white text-black px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-all">
                      EXPLORE COLLECTION
                    </Link>
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 text-white border-2 border-white/30 px-6 py-3 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
                  >
                    <PlayIcon className="w-5 h-5" />
                    <span>Watch Story</span>
                  </motion.button>
                </div>
                
                {/* Enhanced feature badges */}
                <motion.div 
                  className="flex flex-wrap items-center justify-center gap-6 text-sm font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  {[
                    { icon: '🌍', text: 'Worldwide Shipping' },
                    { icon: '✨', text: 'Handcrafted Quality' },
                    { icon: '🎨', text: 'Limited Edition' },
                    { icon: '♻️', text: 'Sustainable Materials' }
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                      animate={{
                        y: [0, -5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="text-lg">{feature.icon}</span>
                      <span>{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          >
            <motion.div 
              className="flex flex-col items-center space-y-3 cursor-pointer group"
              whileHover={{ scale: 1.1 }}
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <motion.span 
                className="text-xs font-light tracking-widest group-hover:text-blue-400 transition-colors"
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                DISCOVER MORE
              </motion.span>
              
              <div className="relative">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
                >
                  <motion.div
                    animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-1 h-3 bg-white rounded-full mt-2"
                  />
                </motion.div>
              </div>
              
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Enhanced Product Section with 3D Parallax */}
        <section className="min-h-screen relative overflow-hidden">
          {/* Gradient background with moving elements */}
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
              {/* Floating background shapes */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-gradient-to-br from-blue-200/30 to-purple-300/30 rounded-full"
                  style={{
                    width: Math.random() * 200 + 50,
                    height: Math.random() * 200 + 50,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, Math.random() * 100 - 50, 0],
                    x: [0, Math.random() * 100 - 50, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 10 + Math.random() * 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 5
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Enhanced Product Image with 3D Effects */}
              <motion.div
                ref={productRef}
                className="relative"
                initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
                whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ perspective: "1000px" }}
              >
                {/* 3D Card Container */}
                <motion.div
                  className="relative transform-gpu"
                  whileHover={{ 
                    rotateY: 10,
                    rotateX: 5,
                    scale: 1.02
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Main product card */}
                  <div className="aspect-square bg-white rounded-3xl overflow-hidden relative group shadow-2xl">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    {/* Product showcase */}
                    <motion.div
                      className="w-full h-full relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      }}
                    >
                      {/* Crochet pattern overlay */}
                      <div className="absolute inset-0 opacity-20">
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-16 h-16 border-2 border-white rounded-full"
                            style={{
                              left: `${(i % 4) * 25}%`,
                              top: `${Math.floor(i / 4) * 33}%`
                            }}
                            animate={{
                              scale: [0.8, 1.2, 0.8],
                              opacity: [0.3, 0.7, 0.3]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Central logo/text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="text-center"
                          animate={{
                            y: [0, -10, 0]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <motion.span 
                            className="text-white text-6xl font-black"
                            style={{
                              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                              filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
                            }}
                          >
                            SP
                          </motion.span>
                          <motion.div
                            className="text-white text-sm font-light tracking-wider mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            SURINAME PANGI
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    {/* Interactive overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.button
                        className="bg-white text-black px-8 py-3 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        VIEW PRODUCT
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-5xl md:text-6xl font-bold text-black mb-6"
                  >
                    SIGNATURE
                    <br />
                    COLLECTION
                  </motion.h2>
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-gray-600 leading-relaxed mb-8"
                  >
                    Discover our exclusive range of premium fashion pieces. 
                    Each item is crafted with precision and attention to detail, 
                    representing the pinnacle of modern style and comfort.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span className="text-lg">Premium Materials</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span className="text-lg">Sustainable Production</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span className="text-lg">Limited Edition</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <Link href="/collection" className="inline-block bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all transform hover:scale-105">
                    EXPLORE NOW
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Horizontal Scroll Product Gallery */}
        <section className="py-20 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-16"
            >
              FEATURED DROPS
            </motion.h2>
            
            <div className="flex space-x-8 overflow-x-auto pb-8">
              {[...Array(4)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="min-w-80 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">SP</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Premium Collection #{index + 1}</h3>
                    <p className="text-gray-600 mb-4">Exclusive fashion piece with modern design</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">${299 + (index * 50)}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
                      >
                        ADD TO CART
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Video/Story Section */}
        <section className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center px-4 z-10 relative"
          >
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-8"
            >
              OUR STORY
            </motion.h2>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto font-light"
            >
              Born from the vibrant culture of Suriname, Pangi represents 
              the perfect fusion of traditional craftsmanship and contemporary design.
            </motion.p>
            <motion.button
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-full hover:bg-white/20 transition-all"
            >
              <PlayIcon className="w-6 h-6" />
              <span className="text-lg font-semibold">WATCH OUR STORY</span>
            </motion.button>
          </motion.div>

          {/* Background Animation */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20"
            />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                STAY IN THE LOOP
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get exclusive access to new drops, behind-the-scenes content, and special offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:border-black transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap"
                >
                  SUBSCRIBE
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </div>
  )
}

export default HomePage
