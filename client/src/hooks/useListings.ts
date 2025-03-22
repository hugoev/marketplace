import { useState, useEffect } from 'react'
import { Listing, ListingSearchParams } from '@/types'
import { apiService } from '@/lib/api'

export function useListings() {
  const [listings, setListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState<ListingSearchParams>({
    priceRange: [0, 1000000],
    sortBy: 'newest',
    page: 0,
    size: 12
  })

  useEffect(() => {
    fetchListings()
  }, [searchParams])

  const fetchListings = async () => {
    try {
      setIsLoading(true)
      setError(null)
      console.log('Fetching listings with params:', searchParams)
      const response = await apiService.getListings(searchParams)
      console.log('Listings response:', response.data)
      setListings(response.data.content || [])
    } catch (err) {
      console.error('Error fetching listings:', err)
      setError('Failed to fetch listings')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    listings,
    isLoading,
    error,
    searchParams,
    setSearchParams
  }
} 