import { motion } from 'framer-motion'
import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout title="About Us - Favour Crochet">
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-red-600 via-yellow-400 to-green-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black mb-6"
            >
              OUR STORY
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-light"
            >
              Celebrating Surinamese Heritage Through Modern Crochet Fashion
            </motion.p>
          </div>
        </section>

        {/* Story Content */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-xl max-w-none"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-8">From Heritage to High Fashion</h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Favour Crochet was born from a deep appreciation for the rich textile traditions of Suriname. 
                Our founder discovered the intricate crochet techniques passed down through generations of 
                Surinamese artisans and envisioned bringing these beautiful crafts to the modern fashion world.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-700">
                    To preserve and celebrate Surinamese crochet heritage while creating contemporary 
                    fashion pieces that empower both artisans and fashion enthusiasts worldwide.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-700">
                    A world where traditional craftsmanship thrives in modern contexts, creating 
                    sustainable livelihoods and preserving cultural heritage for future generations.
                  </p>
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-6">The Suriname Flag Colors</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our signature color palette draws directly from the Surinamese flag - the vibrant red 
                representing progress and love, the golden yellow symbolizing justice and prosperity, 
                and the deep green reflecting hope and fertility. These colors are woven into every 
                piece we create, honoring our cultural roots.
              </p>

              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Handcrafted Excellence</h3>
                <p className="text-gray-700">
                  Every Favour Crochet piece is meticulously handcrafted by skilled artisans who have 
                  mastered traditional Surinamese techniques. We work directly with craftspeople in 
                  Suriname, ensuring fair wages and preserving these invaluable skills for future generations.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16"
            >
              Our Values
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Authenticity",
                  description: "Staying true to traditional Surinamese crochet techniques while embracing modern design.",
                  color: "from-red-500 to-red-600"
                },
                {
                  title: "Quality",
                  description: "Using only the finest materials and ensuring every stitch meets our exacting standards.",
                  color: "from-yellow-400 to-yellow-500"
                },
                {
                  title: "Heritage",
                  description: "Preserving and celebrating the rich cultural traditions of Surinamese craftsmanship.",
                  color: "from-green-500 to-green-600"
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm"
                >
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center`}>
                    <div className="w-8 h-8 bg-white rounded-full" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}