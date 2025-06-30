import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./Button"

interface CarouselProps {
  children: React.ReactNode[]
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  showArrows?: boolean
  itemsPerView?: number
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  className,
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  itemsPerView = 1
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const totalItems = React.Children.count(children)
  const maxIndex = Math.max(0, totalItems - itemsPerView)

  const goToPrevious = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems)
  }, [totalItems])

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems)
  }, [totalItems])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(goToNext, autoPlayInterval)
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, goToNext])

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden rounded-xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
            width: `${(totalItems * 100) / itemsPerView}%`
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / totalItems}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows */}
      {showArrows && totalItems > itemsPerView && (
        <>
          <Button
            onClick={goToPrevious}
            variant="tertiary"
            size="sm"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={goToNext}
            variant="tertiary"
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
      
      {/* Dots Indicator */}
      {showDots && totalItems > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalItems }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentIndex 
                  ? "bg-[#FF6A1A] scale-125 shadow-lg" 
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface CarouselItemProps {
  children: React.ReactNode
  className?: string
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ children, className }) => {
  return (
    <div className={cn("w-full", className)}>
      {children}
    </div>
  )
}