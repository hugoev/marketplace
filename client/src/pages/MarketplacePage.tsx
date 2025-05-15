import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CustomSelect } from '@/components/ui/custom-select'
import { Slider } from '@/components/ui/slider'
import {
  Heart,
  Search,
  SlidersHorizontal,
  X,
  Grid2x2,
  LayoutList,
  MapPin,
  ChevronDown,
  Check,
  Star,
  Filter,
  ArrowUpDown,
  Image as ImageIcon,
  MessageCircle,
  Clock,
  Share2,
  Phone,
  Mail,
  Eye,
  EyeOff,
  Shield,
  Flag,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  MoreVertical,
  Instagram,
  Loader2,
  Plus
} from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { FadeIn } from '@/components/FadeIn'
import { useListings } from '@/hooks/useListings'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Product, ProductFilters } from '../hooks/useProducts'
import { useProducts } from '../hooks/useProducts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'

// Define the categories with proper type
const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "vehicles", label: "Vehicles" },
  { value: "furniture", label: "Furniture" },
  { value: "real-estate", label: "Real Estate" },
  { value: "fashion", label: "Fashion" },
  { value: "sports", label: "Sports" },
  { value: "books", label: "Books" },
  { value: "collectibles", label: "Collectibles" },
  { value: "home-garden", label: "Home & Garden" },
  { value: "jobs", label: "Jobs" },
  { value: "services", label: "Services" },
  { value: "pets", label: "Pets" },
  { value: "musical-instruments", label: "Musical Instruments" },
  { value: "art-crafts", label: "Art & Crafts" },
  { value: "gaming", label: "Gaming" },
  { value: "tools-equipment", label: "Tools & Equipment" }
];

// Add this type for the failedImages state
type FailedImagesSet = Set<string>;

const defaultPriceRange: [number, number] = [0, 1000000];

export default function MarketplacePage() {
  const {
    products = [],
    loading,
    error,
    filters,
    updateFilters,
  } = useProducts();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [quickViewItem, setQuickViewItem] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [revealedModalContact, setRevealedModalContact] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false)
  const [failedImages, setFailedImages] = useState<FailedImagesSet>(new Set())

  const itemsPerPage = 12
  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentListings = products?.slice(startIndex, endIndex) || []

  const navigate = useNavigate();

  const handleFilterChange = (type: keyof ProductFilters, value: any) => {
    updateFilters({
      [type]: value,
    });
  }

  const handleSort = (value: string) => {
    const [sortBy, sortDirection] = value.split('-') as [string, 'asc' | 'desc'];
    updateFilters({
      sortBy,
      sortDirection
    });
  }

  const clearFilters = () => {
    updateFilters({
      category: undefined,
      condition: undefined,
      priceRange: defaultPriceRange,
      sortBy: 'newest',
      sortDirection: 'desc',
      search: '',
      minRating: undefined
    });
    setCurrentPage(1);
  }

  const handleImageError = (imageUrl: string) => {
    setFailedImages(prev => new Set([...prev, imageUrl]))
  }

  const handleShare = async (platform: 'facebook' | 'twitter' | 'linkedin' | 'copy') => {
    const url = window.location.href
    const title = quickViewItem ? `Check out ${quickViewItem.name} on Marketplace` : 'Check out this listing on Marketplace'

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank')
        break
      case 'copy':
        await navigator.clipboard.writeText(url)
        // You could add a toast notification here
        break
    }
    setIsSharingModalOpen(false)
  }

  // Handle keyboard navigation in quick view modal
  useEffect(() => {
    if (!quickViewItem) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && selectedImage > 0) {
        setSelectedImage(prev => prev - 1)
      } else if (e.key === 'ArrowRight' && quickViewItem.images && selectedImage < quickViewItem.images.length - 1) {
        setSelectedImage(prev => prev + 1)
      } else if (e.key === 'Escape') {
        setQuickViewItem(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [quickViewItem, selectedImage])

  // Reset states when quick view modal closes
  useEffect(() => {
    if (!quickViewItem) {
      setSelectedImage(0)
      setRevealedModalContact(false)
    }
  }, [quickViewItem])

  // Add default values for price range
  const currentPriceRange = filters.priceRange || [0, 1000000];

  const handleConditionChange = (value: string) => {
    handleFilterChange('condition', value === 'all' ? undefined : value);
  };

  const handleCategoryFilter = (value: string) => {
    handleFilterChange('category', value === 'all' ? undefined : value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading products...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] pb-12">
      {/* Filters Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 hover:bg-black/5 transition-colors h-8"
                onClick={() => setIsFiltersOpen(true)}
              >
                <Filter className="h-4 w-4" />
                <span className="font-medium">Filters</span>
              </Button>
              <SheetContent side="left" className="w-full sm:w-[400px] p-0">
                <SheetHeader className="px-6 py-4 border-b sticky top-0 bg-white z-10">
                  <div className="flex items-center justify-between">
                    <SheetTitle>Filters</SheetTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters} 
                      className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Reset all
                    </Button>
                  </div>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-80px)]">
                  <div className="p-6 space-y-6">
                    {/* Search Section */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Search</label>
                          {filters.search && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleFilterChange('search', '')}
                              className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                            >
                              Clear
                            </Button>
                          )}
                        </div>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="text"
                            placeholder="Search products..."
                            value={filters.search || ''}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full pl-10 bg-black/5 border-none focus-visible:ring-1 focus-visible:ring-black rounded-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Category Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        {filters.category && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleCategoryFilter('all')}
                            className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                          >
                            Clear
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map(category => (
                          <button
                            key={category.value}
                            onClick={() => handleCategoryFilter(category.value)}
                            className={`
                              flex items-center gap-2 p-3 rounded-xl text-left transition-all
                              ${filters.category === category.value 
                                ? 'bg-black text-white' 
                                : 'bg-black/5 hover:bg-black/10 text-gray-700'
                              }
                            `}
                          >
                            <span className="text-sm font-medium">{category.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Price Range</label>
                        {(currentPriceRange[0] !== 0 || currentPriceRange[1] !== 1000000) && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleFilterChange('priceRange', defaultPriceRange)}
                            className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                          >
                            Reset
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="text-xs text-gray-500">Min Price</label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={currentPriceRange[0]}
                            onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value), currentPriceRange[1]])}
                            className="w-full bg-black/5 border-none focus-visible:ring-1 focus-visible:ring-black rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-500">Max Price</label>
                          <Input
                            type="number"
                            placeholder="Any"
                            value={currentPriceRange[1]}
                            onChange={(e) => handleFilterChange('priceRange', [currentPriceRange[0], Number(e.target.value)])}
                            className="w-full bg-black/5 border-none focus-visible:ring-1 focus-visible:ring-black rounded-xl"
                          />
                        </div>
                      </div>
                      <Slider
                        value={currentPriceRange}
                        max={1000000}
                        step={1000}
                        className="mt-6"
                        onValueChange={(value: [number, number]) => {
                          handleFilterChange('priceRange', value);
                        }}
                      />
                      <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                        <span>${currentPriceRange[0].toLocaleString()}</span>
                        <span>${currentPriceRange[1].toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Condition Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Condition</label>
                        {filters.condition && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleConditionChange('all')}
                            className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                          >
                            Clear
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {['New', 'Like New', 'Good', 'Fair'].map((condition) => (
                          <button
                            key={condition}
                            onClick={() => handleConditionChange(condition)}
                            className={`
                              flex items-center justify-center p-3 rounded-xl transition-all
                              ${filters.condition === condition 
                                ? 'bg-black text-white' 
                                : 'bg-black/5 hover:bg-black/10 text-gray-700'
                              }
                            `}
                          >
                            <span className="text-sm font-medium">{condition}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Seller Rating Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Seller Rating</label>
                        {filters.minRating && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleFilterChange('minRating', undefined)}
                            className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                          >
                            Clear
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {[4, 3, 2].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => handleFilterChange('minRating', rating)}
                            className={`
                              w-full flex items-center justify-between p-3 rounded-xl transition-all
                              ${filters.minRating === rating 
                                ? 'bg-black text-white' 
                                : 'bg-black/5 hover:bg-black/10 text-gray-700'
                              }
                            `}
                          >
                            <div className="flex items-center gap-1">
                              {Array.from({ length: rating }).map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${filters.minRating === rating ? 'fill-white text-white' : 'fill-yellow-400 text-yellow-400'}`} />
                              ))}
                              {Array.from({ length: 5 - rating }).map((_, i) => (
                                <Star key={i + rating} className={`h-4 w-4 ${filters.minRating === rating ? 'text-white/30' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className="text-sm font-medium">& up</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Apply Filters Button */}
                    <div className="sticky bottom-0 bg-white border-t p-4 -mx-6 -mb-6">
                      <Button 
                        className="w-full bg-black hover:bg-black/90 text-white"
                        onClick={() => setIsFiltersOpen(false)}
                      >
                        Show Results
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>

            <div className="hidden md:flex items-center gap-1.5">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 px-3 hover:bg-black/5 transition-colors"
              >
                <Grid2x2 className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 px-3 hover:bg-black/5 transition-colors"
              >
                <LayoutList className="h-4 w-4 mr-2" />
                List
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select
              defaultValue={filters.sortBy || 'newest'}
              onValueChange={handleSort}
            >
              <SelectTrigger className="w-[160px] h-9 bg-black/5 border-none hover:bg-black/10 transition-colors rounded-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="views-desc">Most Viewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {Object.keys(filters).some(key => {
          if (key === 'priceRange') return false
          if (key === 'sortBy') return false
          if (key === 'category') return false
          return filters[key as keyof typeof filters]
        }) && (
          <div className="border-t">
            <div className="container mx-auto px-4 py-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Filters:</span>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(filters).map(([key, value]) => {
                    if (key === 'priceRange' || key === 'sortBy' || key === 'category') return null
                    if (!value) return null
                    return (
                      <span
                        key={key}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-black/5 hover:bg-black/10 rounded-full text-gray-700 cursor-pointer transform hover:scale-105 transition-all text-xs font-medium"
                        onClick={() => handleFilterChange(key as keyof ProductFilters, undefined)}
                      >
                        {key}: {value}
                        <X className="h-3 w-3" />
                      </span>
                    )
                  })}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs h-6 px-2 text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                    onClick={clearFilters}
                  >
                    Clear all
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm sticky top-[4.5rem]">
              {/* ... rest of sidebar content ... */}
            </div>
          </div>

          {/* Listings Grid */}
          <div className={`${isFiltersOpen ? 'lg:col-span-4' : 'lg:col-span-5'} transition-all duration-300`}>
            {loading ? (
              <div className={`grid gap-4 ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
                  : 'grid-cols-1'
              }`}>
                {Array.from({ length: itemsPerPage }).map((_, i) => (
                  <Card key={i} className="animate-pulse overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="bg-black/5 aspect-square" />
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div className="h-4 bg-black/5 rounded-full w-3/4" />
                        <div className="h-4 bg-black/5 rounded-full w-1/4" />
                        <div className="h-4 bg-black/5 rounded-full w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
                    : 'grid-cols-1 gap-y-4'
                }`}>
                  {currentListings.map((product, index) => (
                    <FadeIn key={product._id} delay={index * 50}>
                      <Card 
                        className={`group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${
                          viewMode === 'list' ? 'flex h-48' : ''
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/marketplace/listing/${product._id}`);
                        }}
                      >
                        {/* Image section */}
                        <div 
                          className={`relative overflow-hidden ${
                            viewMode === 'list' 
                              ? 'w-48 rounded-l-2xl' 
                              : 'aspect-square rounded-t-2xl'
                          }`}
                        >
                          {!failedImages.has(product.images[0]) ? (
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={() => handleImageError(product.images[0])}
                            />
                          ) : (
                            <div className="w-full h-full bg-black/5 flex items-center justify-center">
                              <AlertTriangle className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          {product.images.length > 1 && (
                            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <ImageIcon className="h-3 w-3" />
                              {product.images.length}
                            </div>
                          )}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add to wishlist
                              }}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="absolute bottom-2 left-2">
                            <div className="flex items-center gap-1.5">
                              <div className="h-6 w-6 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-sm font-medium">
                                {product.seller.name.charAt(0)}
                              </div>
                              <span className="text-xs font-medium text-white drop-shadow-sm">
                                {product.seller.name.split(' ')[0]}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content section */}
                        <CardContent className={`${
                          viewMode === 'list' 
                            ? 'flex-1 p-4 flex flex-col justify-between' 
                            : 'p-4'
                        }`}>
                          <div className={`space-y-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                            <div className="flex items-start justify-between gap-2">
                              <div className="space-y-1 flex-1">
                                <h3 className="font-medium line-clamp-2 leading-tight">
                                  {product.name}
                                </h3>
                                {viewMode === 'list' && (
                                  <p className="text-sm text-gray-600 line-clamp-2">
                                    {product.description}
                                  </p>
                                )}
                              </div>
                              <span className="font-semibold whitespace-nowrap text-green-600">
                                ${product.price.toLocaleString()}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{product.location}</span>
                              </div>
                              <span>•</span>
                              <span>{product.timeAgo}</span>
                            </div>

                            {viewMode === 'list' && (
                              <div className="flex items-center gap-4 mt-auto pt-4">
                                <div className="flex items-center gap-1 text-sm">
                                  <Eye className="h-4 w-4 text-gray-400" />
                                  <span className="text-gray-500">{product.views || 0} views</span>
                                </div>
                                {product.seller.rating && (
                                  <div className="flex items-center gap-1 text-sm">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="text-gray-500">{product.seller.rating}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </FadeIn>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="h-8 px-2 hover:bg-black/5 rounded-full"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={`h-8 w-8 rounded-full ${currentPage === page ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-black/5'}`}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="h-8 px-2 hover:bg-black/5 rounded-full"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button - Create Listing */}
      <Link 
        to="/create" 
        className="fixed bottom-6 right-6 bg-black text-white rounded-full p-4 shadow-lg hover:bg-black/90 transition-colors"
      >
        <Plus className="h-6 w-6" />
      </Link>

      {/* Quick View Modal */}
      <Dialog open={!!quickViewItem} onOpenChange={() => setQuickViewItem(null)}>
        <DialogContent className="max-w-4xl p-0 gap-0 rounded-2xl overflow-hidden" hideClose>
          {quickViewItem && (
            <div className="flex flex-col md:flex-row h-[80vh]">
              {/* Image Gallery */}
              <div className="relative w-full md:w-3/5 bg-black flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-4 top-4 h-8 w-8 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white z-10" 
                  onClick={() => setQuickViewItem(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="absolute right-14 top-4 z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => setIsSharingModalOpen(true)} className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Share Listing
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsReportModalOpen(true)} className="gap-2 text-red-600">
                        <Flag className="h-4 w-4" />
                        Report Listing
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="w-full h-full flex items-center justify-center">
                  {!failedImages.has(quickViewItem.images[selectedImage]) ? (
                    <img 
                      src={quickViewItem.images[selectedImage]} 
                      alt={quickViewItem.name}
                      className="w-full h-full object-contain"
                      onError={() => handleImageError(quickViewItem.images[selectedImage])}
                    />
                  ) : (
                    <div className="w-full h-full bg-black flex items-center justify-center">
                      <AlertTriangle className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  {quickViewItem.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white disabled:opacity-0"
                        onClick={() => setSelectedImage(prev => prev - 1)}
                        disabled={selectedImage === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white disabled:opacity-0"
                        onClick={() => setSelectedImage(prev => prev + 1)}
                        disabled={selectedImage === quickViewItem.images.length - 1}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
                {quickViewItem.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {quickViewItem.images.map((_, i) => (
                      <button
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          selectedImage === i ? 'bg-white w-4' : 'bg-white/50'
                        }`}
                        onClick={() => setSelectedImage(i)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="w-full md:w-2/5 bg-white p-6 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">{quickViewItem.name}</h2>
                    <p className="text-gray-600">{quickViewItem.description}</p>
                  </div>
                  <div className="text-3xl font-bold text-green-600">
                    ${quickViewItem.price.toLocaleString()}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      {quickViewItem.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {quickViewItem.timeAgo}
                    </div>
                  </div>
                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-4">Seller Information</h3>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-black/5 flex items-center justify-center text-sm font-medium">
                        {quickViewItem.seller.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {quickViewItem.seller.name}
                          </span>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm">{quickViewItem.seller.rating}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 mt-0.5">
                          Member since {quickViewItem.seller.memberSince} • {quickViewItem.seller.listings} listings
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>Response rate: {quickViewItem.seller.responseRate}</div>
                        <div>Response time: {quickViewItem.seller.responseTime}</div>
                      </div>
                      {revealedModalContact ? (
                        <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Contact Information</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => setRevealedModalContact(false)}
                            >
                              <EyeOff className="h-4 w-4 mr-2" />
                              Hide
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {quickViewItem.seller.phone && (
                              <a 
                                href={`tel:${quickViewItem.seller.phone}`}
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white text-gray-600 hover:text-gray-900 transition-colors"
                              >
                                <Phone className="h-4 w-4" />
                                {quickViewItem.seller.phone}
                              </a>
                            )}
                            {quickViewItem.seller.email && (
                              <a 
                                href={`mailto:${quickViewItem.seller.email}`}
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white text-gray-600 hover:text-gray-900 transition-colors"
                              >
                                <Mail className="h-4 w-4" />
                                {quickViewItem.seller.email}
                              </a>
                            )}
                          </div>
                        </div>
                      ) : (
                        <Button
                          className="w-full bg-black hover:bg-black/90 text-white"
                          onClick={() => setRevealedModalContact(true)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Show Contact Information
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-6 border-t">
                    <Button className="w-full bg-black hover:bg-black/90 text-white">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message Seller
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Report Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Report Listing</DialogTitle>
          <DialogDescription>
            Help us understand what's wrong with this listing. Your report will be reviewed by our team.
          </DialogDescription>
          <div className="space-y-2 mt-4">
            {[
              'Fraudulent or scam',
              'Inappropriate content',
              'Misleading information',
              'Wrong category',
              'Prohibited item',
              'Other'
            ].map(reason => (
              <label 
                key={reason} 
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer border border-transparent hover:border-gray-100 transition-colors"
              >
                <input type="radio" name="report-reason" className="rounded-full border-gray-300" />
                <span className="text-sm">{reason}</span>
              </label>
            ))}
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsReportModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsReportModalOpen(false)} className="bg-red-600 hover:bg-red-700">
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Modal */}
      <Dialog open={isSharingModalOpen} onOpenChange={setIsSharingModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Share Listing</DialogTitle>
          <DialogDescription>
            Share this listing with others through your preferred platform.
          </DialogDescription>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button
              variant="outline"
              className="w-full h-12 gap-3"
              onClick={() => handleShare('facebook')}
            >
              <Facebook className="h-5 w-5 text-blue-600" />
              Facebook
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 gap-3"
              onClick={() => handleShare('twitter')}
            >
              <Twitter className="h-5 w-5 text-blue-400" />
              Twitter
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 gap-3"
              onClick={() => handleShare('linkedin')}
            >
              <Linkedin className="h-5 w-5 text-blue-700" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 gap-3"
              onClick={() => handleShare('copy')}
            >
              <LinkIcon className="h-5 w-5" />
              Copy Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Start Selling CTA */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
        <p className="text-gray-600 mb-8">
          Join thousands of users who buy and sell on our platform every day
        </p>
        <Link to="/create">
          <Button size="lg" className="bg-black hover:bg-black/90 text-white px-8">
            Start Selling Now
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-12 border-t pt-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-4 max-w-md">
            <Link to="/about" className="hover:text-black transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-black transition-colors">Contact</Link>
            <Link to="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
          </div>
          <div className="mt-4 border-t pt-4">
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {categories.slice(0, 4).map(category => (
                <li key={category.value}>
                  <Link to={`/marketplace?category=${category.value}`} className="hover:text-black transition-colors">
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 border-t pt-4">
            <h3 className="text-xl font-semibold mb-4">Social Media</h3>
            <div className="flex gap-4">
              <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5 text-gray-600" />
              </Link>
              <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5 text-gray-600" />
              </Link>
              <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <Twitter className="h-5 w-5 text-gray-600" />
              </Link>
              <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <Linkedin className="h-5 w-5 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 