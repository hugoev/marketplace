import { useEffect, useRef, ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
}

export function FadeIn({ children, delay = 0 }: FadeInProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0')
              entry.target.classList.remove('opacity-0', 'translate-y-8')
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={elementRef}
      className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
    >
      {children}
    </div>
  )
} 