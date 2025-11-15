import Image from 'next/image'
import { useState } from 'react'

const ProductImage = ({ 
  src, 
  alt, 
  className = '', 
  fill = false, 
  width, 
  height, 
  fallback = null 
}) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  // Default fallback component
  const DefaultFallback = () => (
    <div className={`bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center ${className}`}>
      <span className="text-primary-600 font-semibold text-2xl">
        {alt?.charAt(0)?.toUpperCase() || 'F'}
      </span>
    </div>
  )

  if (hasError || !imgSrc) {
    return fallback || <DefaultFallback />
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleError}
        onLoad={handleLoad}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
      />
    </div>
  )
}

export default ProductImage