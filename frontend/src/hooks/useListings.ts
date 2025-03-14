import { useState, useEffect, useMemo } from 'react'
import { listings as mockListings } from '@/lib/mock-data'

interface Filters {
  category?: string
  priceRange: [number, number]
  condition?: string[]
  location?: string
  sortBy: string
  minRating?: number
}

interface Seller {
  name: string;
  rating: number;
  verified: boolean;
  responseRate: string;
  responseTime: string;
  memberSince: string;
  listings: number;
  phone?: string;
  email?: string;
}

export function useListings() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 1000000],
    sortBy: 'newest'
  })
  const [isLoading, setIsLoading] = useState(true)

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter and sort listings
  const filteredListings = useMemo(() => {
    let result = [...mockListings]

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(listing =>
        listing.title.toLowerCase().includes(query) ||
        listing.description.toLowerCase().includes(query) ||
        listing.category.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(listing => 
        listing.category.toLowerCase() === filters.category!.toLowerCase()
      )
    }

    // Apply price range filter
    result = result.filter(listing =>
      listing.price >= filters.priceRange[0] &&
      listing.price <= filters.priceRange[1]
    )

    // Apply condition filter
    if (filters.condition?.length) {
      result = result.filter(listing =>
        filters.condition!.includes(listing.condition)
      )
    }

    // Apply location filter
    if (filters.location) {
      result = result.filter(listing =>
        listing.location.toLowerCase().includes(filters.location!.toLowerCase())
      )
    }

    // Apply rating filter
    if (filters.minRating) {
      result = result.filter(listing =>
        listing.seller.rating >= filters.minRating!
      )
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.seller.rating - a.seller.rating)
        break
      default: // 'newest'
        // Assuming timeAgo is already sorted
        break
    }

    return result
  }, [searchQuery, filters])

  return {
    listings: filteredListings,
    isLoading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters
  }
} 