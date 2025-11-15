import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import useStore from '../store/useStore'

export default function Products() {
  const { addToCart, showNotification } = useStore()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  // Sample products - replace with real data
  const products = [
    {
      id: 1,
      name: "Heritage Crochet Dress",
      price: 299,
      image: "/images/heritage-yellow-outfit.jpg",
      category: "dresses",
      featured: true,
      colors: ["Yellow", "Red", "Green"],
      description: "Handcrafted traditional Surinamese crochet dress with modern fit"
    },
    {
      id: 2,
      name: "Suriname Flag Shirt",
      price: 149,
      image: "/images/featured-suriname-shirt.jpg", 
      category: "tops",
      featured: true,
      colors: ["Red", "Yellow", "Green"],
      description: "Premium crochet shirt featuring Suriname flag colors"
    },
    {
      id: 3,
      name: "Traditional Crochet Top",
      price: 199,
      image: "/images/hero-crochet-dress.jpg",
      category: "tops", 
      featured: false,
      colors: ["Cream", "White"],
      description: "Elegant handwoven crochet top with traditional patterns"
    },
    {
      id: 4,
      name: "Cultural Pattern Dress",
      price: 349,
      image: "/images/heritage-yellow-outfit.jpg",
      category: "dresses",
      featured: true,
      colors: ["Gold", "Yellow"],
      description: "Statement dress with authentic Surinamese cultural motifs"
    },
    {
      id: 5,
      name: "Artisan Crochet Set",
      price: 449,
      image: "/images/featured-suriname-shirt.jpg",
      category: "sets",
      featured: false,
      colors: ["Multi"],
      description: "Complete crochet set with top and matching accessories"
    },
    {
      id: 6,
      name: "Festival Collection Piece",
      price: 259,
      image: "/images/hero-crochet-dress.jpg",
      category: "dresses",
      featured: true,
      colors: ["White", "Cream"],
      description: "Perfect for special occasions and cultural celebrations"
    }
  ]

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'dresses', name: 'Dresses' },
    { id: 'tops', name: 'Tops' },
    { id: 'sets', name: 'Sets' },
  ]

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  )

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    showNotification(`${product.name} added to cart!`)
  }

  return (
    <Layout title="Collection - Favour Crochet">
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
              OUR COLLECTION
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-light"
            >
              Handcrafted Surinamese Crochet Fashion
            </motion.p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Sort By */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url("${product.image}")` }}
                    />
                    {product.featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="opacity-0 group-hover:opacity-100 bg-white text-black px-6 py-3 rounded-full font-semibold transition-all transform translate-y-4 group-hover:translate-y-0"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    
                    {/* Colors */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-sm text-gray-500">Colors:</span>
                      <div className="flex space-x-1">
                        {product.colors.map((color, i) => (
                          <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-4 py-2 rounded-full font-medium hover:from-red-700 hover:to-yellow-600 transition-all"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-6"
            >
              Custom Orders Available
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-8 text-gray-300"
            >
              Looking for something unique? Our artisans can create custom pieces tailored to your vision.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-red-700 hover:to-yellow-600 transition-all"
            >
              Request Custom Order
            </motion.button>
          </div>
        </section>
      </div>
    </Layout>
  )
}