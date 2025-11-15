import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { productsAPI, categoriesAPI } from '../lib/api'
import useStore from '../store/useStore'
import Link from 'next/link'
import Image from 'next/image'
import ProductImage from '../components/ProductImage'
import { 
  FunnelIcon, 
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingBagIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-hot-toast'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [productsRes, categoriesRes] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll()
      ])
      
      setProducts(productsRes.data.results || productsRes.data)
      setCategories(categoriesRes.data.results || categoriesRes.data)
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    toast.success(`${product.title} added to cart!`)
  }

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist')
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price)
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <Layout title="Products - Favour Crochet">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4 mx-auto"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="African Fashion Products - Favour Crochet">
      <div className="min-h-screen bg-gray-50 pt-20">
        
        {/* Hero Section */}
        <div className="bg-hero-gradient py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white font-display mb-6 text-shadow-lg">
              Our Collection
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover authentic African fashion and handmade crochet designs
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-center md:justify-end">
                <span className="text-gray-600">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="product-card group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <ProductImage
                      src={product.primary_image ? `${process.env.NEXT_PUBLIC_API_URL}${product.primary_image}` : `/images/products/${product.title.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                      alt={product.title}
                      fill
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                      <button
                        onClick={() => handleWishlistToggle(product)}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-red-500 transition-colors transform hover:scale-110"
                      >
                        {isInWishlist(product.id) ? (
                          <HeartSolidIcon className="w-6 h-6 text-red-500" />
                        ) : (
                          <HeartIcon className="w-6 h-6" />
                        )}
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors transform hover:scale-110"
                      >
                        <ShoppingBagIcon className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 space-y-2">
                      {product.is_featured && (
                        <div className="bg-african-gold text-white px-3 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}
                      {product.is_custom_order && (
                        <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Custom Made
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.african_style_display || product.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary-600 font-display">
                        {formatPrice(product.price)}
                      </span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    {/* Stock Status */}
                    <div className="text-xs text-gray-500 mb-4">
                      {product.is_custom_order ? (
                        <span className="text-blue-600">Made to order</span>
                      ) : product.stock_quantity > 0 ? (
                        <span className="text-green-600">{product.stock_quantity} in stock</span>
                      ) : (
                        <span className="text-red-600">Out of stock</span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full btn-primary text-sm py-3"
                      disabled={!product.is_in_stock}
                    >
                      {product.is_custom_order ? 'Order Now' : 'Add to Cart'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('')
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}