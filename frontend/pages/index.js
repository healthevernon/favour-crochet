import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PlayIcon } from '@heroicons/react/24/outline'
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

  // Refs for scroll animations
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const productRef = useRef(null)
  
  // Scroll animation hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <div ref={containerRef}>
      <Layout title="Suriname Pangi - Premium Fashion & Style">
        {/* Hero Section with Parallax */}
        <motion.section 
          ref={heroRef}
          className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Background Video/Image */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ scale: heroScale }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800">
              {/* Large Product Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.3 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="w-96 h-96 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full blur-3xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Hero Content */}
          <div className="relative z-10 text-center text-white px-4">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight"
            >
              SURINAME
              <br />
              <span className="text-blue-400">PANGI</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl mb-12 font-light max-w-2xl mx-auto"
            >
              Premium fashion meets innovative design. 
              <br />
              Redefining style, one piece at a time.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="space-y-4"
            >
              <Link href="/shop" className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
                SHOP THE DROP
              </Link>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <span>Free worldwide shipping</span>
                <span>•</span>
                <span>Premium materials</span>
                <span>•</span>
                <span>Limited edition</span>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm font-light">SCROLL</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-px h-12 bg-white"
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Product Zoom Section - Permian World Style */}
        <section className="min-h-screen bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Product Image with Zoom Effect */}
              <motion.div
                ref={productRef}
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden relative group">
                  <motion.div
                    className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <span className="text-white text-6xl font-bold">SP</span>
                  </motion.div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-black px-6 py-3 rounded-full font-semibold"
                    >
                      VIEW PRODUCT
                    </motion.button>
                  </div>
                </div>
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
