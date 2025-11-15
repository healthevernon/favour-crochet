import '../styles/globals.css'
import { useEffect } from 'react'
import useStore from '../store/useStore'

export default function App({ Component, pageProps }) {
  const { setUser } = useStore()

  useEffect(() => {
    // Initialize user from localStorage or token validation
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        setUser(user)
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
  }, [setUser])

  return <Component {...pageProps} />
}