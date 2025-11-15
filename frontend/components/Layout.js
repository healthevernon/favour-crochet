import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import Header from './Header'
import Footer from './Footer'
import Cart from './Cart'

export default function Layout({ children, title = "Suriname Pangi - Premium Fashion & Style" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Premium fashion meets innovative design. Redefining style with exclusive pieces from Suriname Pangi - where traditional craftsmanship meets contemporary design." />
        <meta name="keywords" content="Suriname fashion, premium clothing, crochet, handmade, luxury fashion, contemporary design, exclusive pieces, Pangi, modern style" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Premium fashion meets innovative design. Redefining style with exclusive pieces from Suriname Pangi." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
        
        {/* Additional fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Head>
      
      <div className="min-h-screen flex flex-col bg-warmwhite">
        <Header />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
        
        {/* Shopping Cart Sidebar */}
        <Cart />
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#374151',
              boxShadow: '0 10px 25px -3px rgba(255, 90, 31, 0.1)',
              border: '1px solid #fcd9bd',
            },
            success: {
              iconTheme: {
                primary: '#ff5a1f',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </>
  )
}