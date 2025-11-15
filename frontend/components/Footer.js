import Link from 'next/link'
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Quick Links': [
      { name: 'About Us', href: '/about' },
      { name: 'Products', href: '/products' },
      { name: 'Custom Orders', href: '/custom-orders' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Care Instructions', href: '/care-instructions' },
    ],
    'Customer Service': [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns & Exchanges', href: '/returns' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Track Your Order', href: '/track-order' },
    ],
    'African Heritage': [
      { name: 'Traditional Styles', href: '/styles/traditional' },
      { name: 'Cultural Significance', href: '/culture' },
      { name: 'Fabric Stories', href: '/fabrics' },
      { name: 'Pattern Meanings', href: '/patterns' },
      { name: 'Artisan Stories', href: '/artisans' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'Pinterest', href: '#', icon: 'pinterest' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* African Pattern Border */}
      <div className="h-2 kente-accent"></div>
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-hero-gradient flex items-center justify-center">
                <span className="text-white font-bold text-2xl">F</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white">
                  Favour Crochet
                </h3>
                <p className="text-african-gold text-sm">
                  African Style Fashion
                </p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Handcrafted African traditional dresses and modern crochet designs. 
              Each piece tells a story of heritage, beauty, and exceptional craftsmanship.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPinIcon className="w-5 h-5 text-african-gold flex-shrink-0" />
                <span className="text-sm text-gray-300">Lagos, Nigeria</span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-african-gold flex-shrink-0" />
                <span className="text-sm text-gray-300">+234 (0) 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-african-gold flex-shrink-0" />
                <span className="text-sm text-gray-300">hello@favourcrochet.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-lg mb-6 text-african-gold font-display">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-african-gold transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center lg:max-w-none lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="lg:flex-1">
              <h4 className="text-lg font-semibold text-african-gold font-display mb-2">
                Stay Connected with African Fashion
              </h4>
              <p className="text-gray-300 text-sm">
                Get updates on new collections, cultural stories, and exclusive offers.
              </p>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <form className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-african-gold focus:border-transparent"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-african-gold hover:bg-african-copper text-gray-900 font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex justify-center lg:justify-start space-x-6 mb-6 lg:mb-0">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-gray-400 hover:text-african-gold transition-colors duration-200"
                aria-label={social.name}
              >
                <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200">
                  <span className="sr-only">{social.name}</span>
                  {/* You can replace these with actual social media icons */}
                  <div className="w-5 h-5 bg-current rounded"></div>
                </div>
              </a>
            ))}
          </div>
          
          <div className="text-center lg:text-right">
            <p className="text-gray-400 text-sm flex items-center justify-center lg:justify-end">
              © {currentYear} Favour Crochet. Made with{' '}
              <HeartIcon className="w-4 h-4 text-red-500 mx-1" />{' '}
              in Nigeria
            </p>
            <div className="mt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-end space-y-2 sm:space-y-0 sm:space-x-4 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-african-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-african-gold transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-african-gold transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cultural Quote */}
      <div className="bg-black/30 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-african-gold italic font-display text-lg">
            "Fashion is not just about clothing, it's about identity, culture, and the stories we carry within us."
          </p>
          <p className="text-gray-400 text-sm mt-2">— African Proverb</p>
        </div>
      </div>
    </footer>
  )
}