import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  ShoppingBagIcon, 
  HeartIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'

export default function Header() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  
  const { 
    cart, 
    wishlist, 
    toggleCart, 
    mobileMenuOpen, 
    toggleMobileMenu,
    getCartItemsCount,
    isAuthenticated,
    user
  } = useStore()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const navigation = [
    { name: 'Home', href: '/', current: router.pathname === '/' },
    { name: 'Products', href: '/products', current: router.pathname === '/products' },
    { name: 'Categories', href: '/categories', current: router.pathname === '/categories' },
    { name: 'About', href: '/about', current: router.pathname === '/about' },
    { name: 'Contact', href: '/contact', current: router.pathname === '/contact' },
  ]

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-primary-100' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-hero-gradient flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-xl lg:text-2xl">F</span>
              </div>
              <div className="absolute -inset-1 bg-hero-gradient rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-display font-bold text-xl lg:text-2xl ${
                isScrolled ? 'text-gray-900' : 'text-white text-shadow'
              }`}>
                Favour Crochet
              </h1>
              <p className={`text-sm ${
                isScrolled ? 'text-primary-600' : 'text-primary-100'
              }`}>
                African Style Fashion
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-200 hover:text-primary-500 ${
                  item.current
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : isScrolled 
                      ? 'text-gray-700 hover:text-primary-600' 
                      : 'text-white hover:text-primary-200 text-shadow'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search African styles, dresses..."
                className={`w-full pl-10 pr-4 py-2 rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  isScrolled 
                    ? 'bg-white border-gray-300 text-gray-900' 
                    : 'bg-white/90 backdrop-blur border-white/50 text-gray-900 placeholder-gray-600'
                }`}
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            
            {/* Wishlist */}
            <Link href="/wishlist" className="relative group">
              <HeartIcon className={`w-6 h-6 transition-colors duration-200 ${
                isScrolled ? 'text-gray-700 hover:text-red-500' : 'text-white hover:text-red-200'
              }`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <button 
              onClick={toggleCart}
              className="relative group"
            >
              <ShoppingBagIcon className={`w-6 h-6 transition-colors duration-200 ${
                isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
              }`} />
              {getCartItemsCount() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                >
                  {getCartItemsCount()}
                </motion.span>
              )}
            </button>

            {/* User Account */}
            <div className="relative">
              {isAuthenticated ? (
                <Link href="/profile" className="group">
                  <div className={`w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center transition-all duration-200 ${
                    isScrolled ? 'hover:bg-primary-200' : 'hover:bg-white/20'
                  }`}>
                    <span className="text-primary-600 font-medium text-sm">
                      {user?.first_name?.[0] || user?.username?.[0] || 'U'}
                    </span>
                  </div>
                </Link>
              ) : (
                <Link href="/auth/login" className="group">
                  <UserIcon className={`w-6 h-6 transition-colors duration-200 ${
                    isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
                  }`} />
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className={`w-6 h-6 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`} />
              ) : (
                <Bars3Icon className={`w-6 h-6 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border bg-white/90 backdrop-blur border-white/50 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => toggleMobileMenu()}
                  className={`block py-2 font-medium transition-colors duration-200 ${
                    item.current
                      ? 'text-primary-600 border-l-4 border-primary-600 pl-4'
                      : 'text-gray-700 hover:text-primary-600 hover:pl-4 hover:border-l-4 hover:border-primary-200'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <hr className="border-gray-200" />
              
              {!isAuthenticated && (
                <div className="space-y-2">
                  <Link
                    href="/auth/login"
                    onClick={() => toggleMobileMenu()}
                    className="block py-2 text-gray-700 hover:text-primary-600 font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => toggleMobileMenu()}
                    className="block py-2 text-gray-700 hover:text-primary-600 font-medium"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}