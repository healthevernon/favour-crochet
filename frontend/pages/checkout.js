import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import useStore from '../store/useStore'

export default function Checkout() {
  const { cart, getCartTotal, getCartItemsCount, clearCart } = useStore()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'suriname',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmitOrder = (e) => {
    e.preventDefault()
    // Process order
    console.log('Order submitted:', { formData, cart })
    alert('Order placed successfully! You will receive a confirmation email shortly.')
    clearCart()
    // Redirect to success page
  }

  if (getCartItemsCount() === 0) {
    return (
      <Layout title="Checkout - Favour Crochet">
        <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                🛒
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-6">Add some beautiful crochet pieces to your cart first!</p>
              <motion.a
                href="/products"
                whileHover={{ scale: 1.05 }}
                className="inline-block bg-gradient-to-r from-red-600 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-red-700 hover:to-yellow-600 transition-all"
              >
                Shop Collection
              </motion.a>
            </motion.div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Checkout - Favour Crochet">
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-br from-red-600 via-yellow-400 to-green-600 py-12">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black mb-4"
            >
              CHECKOUT
            </motion.h1>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center space-x-4">
              {[
                { num: 1, label: 'Shipping' },
                { num: 2, label: 'Payment' },
                { num: 3, label: 'Review' }
              ].map((stepItem, index) => (
                <div key={stepItem.num} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= stepItem.num 
                      ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {stepItem.num}
                  </div>
                  <span className={`ml-2 font-medium ${
                    step >= stepItem.num ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {stepItem.label}
                  </span>
                  {index < 2 && (
                    <div className={`w-16 h-1 mx-4 ${
                      step > stepItem.num ? 'bg-red-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Checkout Content */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <form onSubmit={handleSubmitOrder}>
                    
                    {/* Step 1: Shipping Information */}
                    {step === 1 && (
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                              <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                              <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                              <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                              <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                              <select
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              >
                                <option value="suriname">Suriname</option>
                                <option value="netherlands">Netherlands</option>
                                <option value="usa">United States</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Payment Information */}
                    {step === 2 && (
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="1234 5678 9012 3456"
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                              <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                              <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                            <input
                              type="text"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Order Review */}
                    {step === 3 && (
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Shipping Address</h3>
                            <p className="text-gray-600">
                              {formData.firstName} {formData.lastName}<br />
                              {formData.address}<br />
                              {formData.city}, {formData.postalCode}<br />
                              {formData.country}
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Payment Method</h3>
                            <p className="text-gray-600">
                              Card ending in {formData.cardNumber.slice(-4)}<br />
                              {formData.cardName}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                      <motion.button
                        type="button"
                        onClick={handlePrevStep}
                        disabled={step === 1}
                        whileHover={{ scale: step === 1 ? 1 : 1.05 }}
                        className={`px-6 py-3 rounded-full font-semibold transition-all ${
                          step === 1 
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'bg-gray-600 text-white hover:bg-gray-700'
                        }`}
                      >
                        Previous
                      </motion.button>

                      {step < 3 ? (
                        <motion.button
                          type="button"
                          onClick={handleNextStep}
                          whileHover={{ scale: 1.05 }}
                          className="px-8 py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-full font-semibold hover:from-red-700 hover:to-yellow-600 transition-all"
                        >
                          Continue
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05 }}
                          className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full font-semibold hover:from-green-700 hover:to-green-800 transition-all"
                        >
                          Place Order
                        </motion.button>
                      )}
                    </div>
                  </form>
                </motion.div>
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                  
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                          {item.image && (
                            <div 
                              className="w-full h-full bg-cover bg-center rounded-lg"
                              style={{ backgroundImage: `url("${item.image}")` }}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          <p className="font-semibold">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${getCartTotal()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>$15.00</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${(getCartTotal() + 15 + getCartTotal() * 0.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}