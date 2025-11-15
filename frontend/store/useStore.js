import { create } from 'zustand'

const useStore = create((set, get) => ({
      // Cart state
      cart: [],
      cartOpen: false,
      
      // Add item to cart
      addToCart: (product, quantity = 1, options = {}) => {
        const { cart } = get()
        const existingItem = cart.find(item => 
          item.id === product.id && 
          JSON.stringify(item.options) === JSON.stringify(options)
        )
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id && JSON.stringify(item.options) === JSON.stringify(options)
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
        } else {
          set({
            cart: [...cart, { 
              ...product, 
              quantity, 
              options,
              cartId: Date.now() + Math.random()
            }]
          })
        }
      },
      
      // Remove item from cart
      removeFromCart: (cartId) => {
        set({
          cart: get().cart.filter(item => item.cartId !== cartId)
        })
      },
      
      // Update item quantity
      updateQuantity: (cartId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartId)
          return
        }
        
        set({
          cart: get().cart.map(item =>
            item.cartId === cartId ? { ...item, quantity } : item
          )
        })
      },
      
      // Clear cart
      clearCart: () => set({ cart: [] }),
      
      // Toggle cart
      toggleCart: () => set({ cartOpen: !get().cartOpen }),
      
      // Get cart totals
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      getCartItemsCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
      },
      
      // Filters state
      filters: {
        category: '',
        africanStyle: '',
        priceRange: [0, 1000],
        inStock: false,
        search: ''
      },
      
      updateFilters: (newFilters) => {
        set({
          filters: { ...get().filters, ...newFilters }
        })
      },
      
      clearFilters: () => {
        set({
          filters: {
            category: '',
            africanStyle: '',
            priceRange: [0, 1000],
            inStock: false,
            search: ''
          }
        })
      },
      
      // User state
      user: null,
      isAuthenticated: false,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false, cart: [] }),
      
      // UI State
      mobileMenuOpen: false,
      toggleMobileMenu: () => set({ mobileMenuOpen: !get().mobileMenuOpen }),
      
      // Wishlist
      wishlist: [],
      
      addToWishlist: (product) => {
        const { wishlist } = get()
        if (!wishlist.find(item => item.id === product.id)) {
          set({ wishlist: [...wishlist, product] })
        }
      },
      
      removeFromWishlist: (productId) => {
        set({
          wishlist: get().wishlist.filter(item => item.id !== productId)
        })
      },
      
      isInWishlist: (productId) => {
        return get().wishlist.some(item => item.id === productId)
      }
}))

export default useStore