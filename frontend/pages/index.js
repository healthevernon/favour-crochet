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
    stiffness: 400,
    damping: 60,
    restDelta: 0.001,
    mass: 0.3
  })
  
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
        {/* Clean Hero with Zoom Parallax */}
        <motion.section 
          ref={heroRef}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Smooth Zoom Background */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ 
              scale: useTransform(smoothScrollY, [0, 1], [1, 1.5]),
              opacity: useTransform(smoothScrollY, [0, 0.8], [1, 0])
            }}
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: 'url("/images/hero-crochet-dress.jpg")',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center center',
                backgroundSize: 'cover'
              }}
            >
              {/* Suriname flag color overlay */}
              <div className="w-full h-full bg-gradient-to-b from-red-600/20 via-yellow-400/20 to-green-600/20" />
              
              {/* Dark overlay for text readability */}
              <div className="w-full h-full bg-black/30" />
            </div>
          </motion.div>

          {/* Simple Clean Content */}
          <motion.div 
            className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
            style={{ 
              y: useTransform(smoothScrollY, [0, 1], ["0%", "-50%"]),
              scale: useTransform(smoothScrollY, [0, 1], [1, 0.8]),
              opacity: useTransform(smoothScrollY, [0, 0.5], [1, 0])
            }}
          >
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="text-8xl md:text-9xl font-black mb-8 text-white drop-shadow-lg"
                style={{
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                }}
              >
                FAVOUR<br />
                <span className="text-yellow-400">CROCHET</span>
              </motion.h1>
              
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-2xl mb-12 font-light text-white/90"
              >
                Handcrafted Excellence • Surinamese Inspiration
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-full text-lg font-bold shadow-xl"
                >
                  Shop Collection
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
                >
                  Our Story
                </motion.button>
              </motion.div>
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
              {/* Cultural floating shapes - much smoother and slower */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-gradient-to-br from-red-500/10 via-yellow-400/10 to-green-500/10 rounded-full blur-md"
                  style={{
                    width: Math.random() * 60 + 30,
                    height: Math.random() * 60 + 30,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, Math.random() * 40 - 20, 0],
                    x: [0, Math.random() * 40 - 20, 0],
                    rotate: [0, 180],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 60 + Math.random() * 40,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 25
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
                    
                    {/* Real Crochet Product Image */}
                    <motion.div
                      className="w-full h-full relative overflow-hidden bg-cover bg-center"
                      style={{
                        backgroundImage: 'url("/images/heritage-yellow-outfit.jpg")'
                      }}
                    >
                      {/* Overlay for branding */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                        {/* Floating crochet patterns */}
                        <div className="absolute inset-0 opacity-20">
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-8 h-8 border border-white/40 rounded-full"
                              style={{
                                left: `${20 + (i % 3) * 30}%`,
                                top: `${20 + Math.floor(i / 3) * 40}%`
                              }}
                              animate={{
                                scale: [0.5, 1, 0.5],
                                opacity: [0.2, 0.6, 0.2],
                                rotate: [0, 180, 360]
                              }}
                              transition={{
                                duration: 4 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5
                              }}
                            />
                          ))}
                        </div>
                        
                        {/* Product info overlay */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <motion.div
                            className="text-white"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <div className="text-2xl font-bold mb-2">Heritage Crochet Dress</div>
                            <div className="text-sm opacity-90 mb-3">Handcrafted Premium Collection</div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs opacity-70 ml-2">Suriname Colors</span>
                            </div>
                          </motion.div>
                        </div>
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
                  <div 
                    className="aspect-square relative overflow-hidden bg-cover bg-center" 
                    style={{
                      backgroundImage: 'url("/images/featured-suriname-shirt.jpg")'
                    }}
                  >
                    <div className="w-full h-full bg-black/20 hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-2xl font-bold drop-shadow-lg">FAVOUR</div>
                        <div className="text-sm opacity-90">CROCHET</div>
                      </div>
                    </div>
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
