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
        {/* Premium Hero Banner with Cultural Elements */}
        <motion.section 
          ref={heroRef}
          className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Cultural Background with Parallax */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ scale: heroScale, y: backgroundY }}
          >
            {/* Deep black base with cultural overlays */}
            <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-amber-900">
              
              {/* African/Surinamese Pattern Overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: `
                    radial-gradient(circle at 25% 25%, #DAA520 2px, transparent 2px),
                    radial-gradient(circle at 75% 75%, #B8860B 1.5px, transparent 1.5px),
                    linear-gradient(45deg, transparent 24%, rgba(218, 165, 32, 0.1) 25%, rgba(218, 165, 32, 0.1) 26%, transparent 27%, transparent 74%, rgba(218, 165, 32, 0.1) 75%, rgba(218, 165, 32, 0.1) 76%, transparent 77%)
                  `,
                  backgroundSize: '50px 50px, 30px 30px, 40px 40px'
                }} />
              </div>
              
              {/* Crochet Texture Patterns */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${15 + (i % 3) * 30}%`,
                      top: `${20 + Math.floor(i / 3) * 25}%`,
                      width: '120px',
                      height: '120px',
                      background: `conic-gradient(from ${i * 45}deg, transparent, rgba(218, 165, 32, 0.3), transparent)`,
                      borderRadius: '50%'
                    }}
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 20 + i * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>
              
              {/* Crochet Dress Images with Parallax */}
              <motion.div
                className="absolute top-20 left-20 w-80 h-96 overflow-hidden rounded-2xl shadow-2xl"
                style={{
                  x: mousePosition.x * 30,
                  y: mousePosition.y * 20,
                  rotate: scrollY * 0.1
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-amber-800 to-amber-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl font-bold mb-2">HERITAGE</div>
                    <div className="text-sm opacity-80">Crochet Artistry</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute bottom-32 right-32 w-64 h-80 overflow-hidden rounded-2xl shadow-2xl"
                style={{
                  x: mousePosition.x * -40,
                  y: mousePosition.y * -30,
                  rotate: scrollY * -0.05
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-yellow-700 to-orange-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl font-bold mb-2">CULTURE</div>
                    <div className="text-sm opacity-80">Traditional Craft</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96"
                style={{
                  x: mousePosition.x * 15,
                  y: mousePosition.y * 15
                }}
              >
                {/* Central Surinamese Cultural Mandala */}
                <motion.div
                  className="w-full h-full relative"
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {/* Traditional Pattern Elements */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-8 h-8 border-2 border-amber-500"
                      style={{
                        top: '50%',
                        left: '50%',
                        transformOrigin: '0 0',
                        rotate: i * 30,
                        x: 120 + (i % 2) * 20,
                        borderRadius: i % 3 === 0 ? '50%' : '0%'
                      }}
                      animate={{
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.4, 0.9, 0.4]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
              
              {/* Cultural Floating Elements */}
              <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 border border-amber-400"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      borderRadius: i % 2 === 0 ? '50%' : '0%'
                    }}
                    animate={{
                      y: [0, -120, 0],
                      x: [0, Math.sin(i) * 30, 0],
                      opacity: [0, 0.8, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 4 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sophisticated Hero Content */}
          <motion.div 
            className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto"
            style={{ y: textY }}
          >
            {/* Premium backdrop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md rounded-3xl border border-amber-500/20" />
            
            <div className="relative z-10 py-16">
              {/* Cultural Symbol */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="mb-8"
              >
                <div className="w-16 h-16 mx-auto border-2 border-amber-400 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full" />
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-wide"
              >
                <motion.span
                  className="block"
                  style={{
                    background: 'linear-gradient(135deg, #FFF 0%, #DAA520 50%, #B8860B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 4px 20px rgba(218, 165, 32, 0.3)'
                  }}
                  animate={{
                    filter: [
                      'drop-shadow(0 0 20px rgba(218, 165, 32, 0.5))',
                      'drop-shadow(0 0 40px rgba(218, 165, 32, 0.8))',
                      'drop-shadow(0 0 20px rgba(218, 165, 32, 0.5))'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  SURINAME
                </motion.span>
                <motion.span
                  className="block relative"
                  style={{
                    background: 'linear-gradient(135deg, #DAA520 0%, #FFD700 50%, #FFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  animate={{
                    filter: [
                      'drop-shadow(0 0 30px rgba(255, 215, 0, 0.6))',
                      'drop-shadow(0 0 50px rgba(255, 215, 0, 0.9))',
                      'drop-shadow(0 0 30px rgba(255, 215, 0, 0.6))'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                >
                  PANGI
                  {/* Cultural underline pattern */}
                  <motion.div
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-1"
                    style={{
                      background: 'repeating-linear-gradient(90deg, #DAA520 0, #DAA520 10px, #FFD700 10px, #FFD700 20px)',
                      width: '100%'
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2, delay: 1.8 }}
                  />
                </motion.span>
              </motion.h1>
              
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-2xl md:text-3xl mb-12 font-light max-w-4xl mx-auto leading-relaxed text-amber-100"
              >
                <motion.span
                  className="block mb-2"
                  style={{ fontFamily: 'serif' }}
                >
                  Where Traditional Craft Meets Contemporary Design
                </motion.span>
                <motion.span
                  className="text-lg text-amber-200/80"
                  style={{ letterSpacing: '0.1em' }}
                >
                  Authentic Surinamese Crochet Heritage Reimagined for the Modern World
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
                
                {/* Premium feature badges */}
                <motion.div 
                  className="flex flex-wrap items-center justify-center gap-6 text-sm font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  {[
                    { text: 'Worldwide Shipping' },
                    { text: 'Handcrafted Quality' },
                    { text: 'Limited Edition' },
                    { text: 'Sustainable Materials' }
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center space-x-3 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-500/30"
                      animate={{
                        y: [0, -3, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span className="text-amber-100">{feature.text}</span>
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

        {/* Premium Product Section with Cultural Elements */}
        <section className="min-h-screen relative overflow-hidden bg-gray-900">
          {/* Cultural background with moving elements */}
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-amber-900">
              {/* Cultural floating shapes */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-gradient-to-br from-amber-800/20 to-yellow-700/20 rounded-full"
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
                  {/* Premium product showcase */}
                  <div className="aspect-square bg-gray-900 rounded-3xl overflow-hidden relative group shadow-2xl border border-amber-500/20">
                    {/* Golden shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                    
                    {/* Cultural product showcase */}
                    <motion.div
                      className="w-full h-full relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #1F2937 0%, #374151 50%, #92400e 100%)'
                      }}
                    >
                      {/* Traditional crochet pattern overlay */}
                      <div className="absolute inset-0 opacity-30">
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-16 h-16 border-2 border-amber-400 rounded-full"
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
                            className="text-amber-200 text-6xl font-black"
                            style={{
                              textShadow: '0 4px 20px rgba(218, 165, 32, 0.5)',
                              filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))'
                            }}
                          >
                            SP
                          </motion.span>
                          <motion.div
                            className="text-amber-300 text-sm font-light tracking-wider mt-2"
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
                    className="text-5xl md:text-6xl font-bold text-amber-100 mb-6"
                  >
                    HERITAGE
                    <br />
                    COLLECTION
                  </motion.h2>
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-amber-200/80 leading-relaxed mb-8"
                  >
                    Experience authentic Surinamese craftsmanship through our curated collection. 
                    Each piece embodies centuries-old crochet traditions, reimagined for contemporary elegance 
                    and celebrating the rich cultural heritage of Suriname.
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
                    <div className="w-3 h-3 bg-amber-400 rounded-full border border-amber-600"></div>
                    <span className="text-lg text-amber-100">Authentic Craftsmanship</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-amber-400 rounded-full border border-amber-600"></div>
                    <span className="text-lg text-amber-100">Cultural Heritage</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-amber-400 rounded-full border border-amber-600"></div>
                    <span className="text-lg text-amber-100">Limited Artisan Pieces</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <Link href="/products" className="inline-block bg-gradient-to-r from-amber-600 to-yellow-600 text-black px-8 py-4 rounded-full font-semibold hover:from-amber-500 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-lg">
                    DISCOVER HERITAGE
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
