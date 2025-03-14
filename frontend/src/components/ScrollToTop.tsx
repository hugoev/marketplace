import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { Button } from './ui/button'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Button
      className={`fixed bottom-8 right-8 rounded-full p-3 bg-black/80 backdrop-blur-sm hover:bg-black transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      onClick={scrollToTop}
      size="icon"
    >
      <ChevronUp className="h-5 w-5 text-white" />
    </Button>
  )
} 