import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ProductImage from './ProductImage'
import useStore from '../store/useStore'
import { toast } from 'react-hot-toast'

export default function Cart() {
  const { 
    cart, 
    cartOpen, 
    toggleCart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    clearCart 
  } = useStore()

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId)
      toast.success('Item removed from cart')
    } else {
      updateQuantity(cartId, newQuantity)
    }
  }

  const handleRemoveItem = (cartId, title) => {
    removeFromCart(cartId)
    toast.success(`${title} removed from cart`)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price)
  }

  const subtotal = getCartTotal()
  const shipping = 2500 // ₦2,500 flat shipping rate
  const tax = subtotal * 0.075 // 7.5% VAT
  const total = subtotal + shipping + tax

  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={toggleCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-6 bg-gradient-to-r from-primary-600 to-primary-700">
                      <Dialog.Title className="text-lg font-semibold text-white font-display">
                        Shopping Cart ({cart.length})
                      </Dialog.Title>
                      <button
                        type="button"
                        className="text-white hover:text-primary-200 transition-colors"
                        onClick={toggleCart}
                      >
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                      {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                          <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
                          <Link 
                            href="/products"
                            onClick={toggleCart}
                            className="btn-primary"
                          >
                            Continue Shopping
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <AnimatePresence>
                            {cart.map((item) => (
                              <motion.div
                                key={item.cartId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                className="flex items-start space-x-4 border-b border-gray-200 pb-6"
                              >
                                {/* Product Image */}
                                <div className="relative w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                  <ProductImage
                                    src={item.primary_image ? `${process.env.NEXT_PUBLIC_API_URL}${item.primary_image}` : `/images/products/${item.title.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                                    alt={item.title}
                                    fill
                                    className="rounded-lg"
                                  />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                                    {item.title}
                                  </h4>
                                  
                                  {item.options && (
                                    <div className="mt-1 text-xs text-gray-500">
                                      {item.options.size && <span>Size: {item.options.size}</span>}
                                      {item.options.color && <span className="ml-2">Color: {item.options.color}</span>}
                                    </div>
                                  )}
                                  
                                  <div className="mt-2 flex items-center justify-between">
                                    <p className="text-sm font-semibold text-primary-600">
                                      {formatPrice(item.price)}
                                    </p>
                                    
                                    {/* Quantity Controls */}
                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                      >
                                        <MinusIcon className="w-4 h-4 text-gray-600" />
                                      </button>
                                      
                                      <span className="text-sm font-medium text-gray-900 min-w-[2rem] text-center">
                                        {item.quantity}
                                      </span>
                                      
                                      <button
                                        onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                      >
                                        <PlusIcon className="w-4 h-4 text-gray-600" />
                                      </button>
                                      
                                      <button
                                        onClick={() => handleRemoveItem(item.cartId, item.title)}
                                        className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors ml-2"
                                      >
                                        <TrashIcon className="w-4 h-4 text-red-600" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>

                          {/* Clear Cart Button */}
                          {cart.length > 0 && (
                            <button
                              onClick={() => {
                                clearCart()
                                toast.success('Cart cleared')
                              }}
                              className="w-full text-center text-sm text-red-600 hover:text-red-700 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              Clear Cart
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer - Order Summary & Checkout */}
                    {cart.length > 0 && (
                      <div className="border-t border-gray-200 px-6 py-6 space-y-4">
                        
                        {/* Order Summary */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-900">{formatPrice(subtotal)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping</span>
                            <span className="text-gray-900">{formatPrice(shipping)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tax (7.5%)</span>
                            <span className="text-gray-900">{formatPrice(tax)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                            <span className="text-gray-900">Total</span>
                            <span className="text-primary-600">{formatPrice(total)}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                          <Link
                            href="/checkout"
                            onClick={toggleCart}
                            className="w-full btn-primary text-center block"
                          >
                            Proceed to Checkout
                          </Link>
                          
                          <Link
                            href="/products"
                            onClick={toggleCart}
                            className="w-full btn-secondary text-center block"
                          >
                            Continue Shopping
                          </Link>
                        </div>
                        
                        {/* Security Badge */}
                        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 pt-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <span>Secure checkout guaranteed</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}