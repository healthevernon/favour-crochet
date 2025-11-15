import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import useStore from '../store/useStore'

export default function Account() {
  const { user, isAuthenticated } = useStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    country: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Profile updated:', formData)
    alert('Profile updated successfully!')
  }

  if (!isAuthenticated) {
    return (
      <Layout title="Account - Favour Crochet">
        <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign In Required</h1>
              <p className="text-gray-600 mb-8">Please sign in to access your account</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-red-600 to-yellow-500 text-white py-3 rounded-full font-semibold hover:from-red-700 hover:to-yellow-600 transition-all"
              >
                Sign In
              </motion.button>
            </motion.div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="My Account - Favour Crochet">
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-br from-red-600 via-yellow-400 to-green-600 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-4"
            >
              MY ACCOUNT
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl"
            >
              Welcome back, {user?.name || 'Valued Customer'}!
            </motion.p>
          </div>
        </section>

        {/* Account Content */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <nav className="space-y-2">
                    {[
                      { id: 'profile', name: 'Profile', icon: '👤' },
                      { id: 'orders', name: 'My Orders', icon: '📦' },
                      { id: 'wishlist', name: 'Wishlist', icon: '❤️' },
                      { id: 'addresses', name: 'Addresses', icon: '📍' },
                      { id: 'settings', name: 'Settings', icon: '⚙️' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                          activeTab === item.id
                            ? 'bg-gradient-to-r from-red-100 to-yellow-100 text-red-700 border border-red-200'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-3"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  
                  {/* Profile Tab */}
                  {activeTab === 'profile' && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                            <select
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            >
                              <option value="">Select Country</option>
                              <option value="suriname">Suriname</option>
                              <option value="netherlands">Netherlands</option>
                              <option value="usa">United States</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>

                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-red-700 hover:to-yellow-600 transition-all"
                        >
                          Update Profile
                        </motion.button>
                      </form>
                    </div>
                  )}

                  {/* Orders Tab */}
                  {activeTab === 'orders' && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
                      <div className="space-y-4">
                        {[1, 2, 3].map((order) => (
                          <div key={order} className="border border-gray-200 rounded-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-semibold text-gray-900">Order #FC00{order}</h3>
                                <p className="text-sm text-gray-500">Placed on November {order + 10}, 2025</p>
                              </div>
                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                Delivered
                              </span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                              <div>
                                <h4 className="font-medium">Heritage Crochet Dress</h4>
                                <p className="text-gray-600">Size: M • Color: Yellow</p>
                                <p className="font-semibold">$299.00</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Other tabs content can be added similarly */}
                  {activeTab === 'wishlist' && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                      <p className="text-gray-600">Your wishlist items will appear here.</p>
                    </div>
                  )}

                  {activeTab === 'addresses' && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Addresses</h2>
                      <p className="text-gray-600">Manage your shipping and billing addresses.</p>
                    </div>
                  )}

                  {activeTab === 'settings' && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                      <p className="text-gray-600">Manage your account preferences and security settings.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}