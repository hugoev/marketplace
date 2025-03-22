import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  Loader2
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
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Filters Header */}
      <div className="sticky top-[7.5rem] z-10 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-gray-200"
                    onClick={() => setIsFiltersOpen(true)}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                  <SheetContent side="left" className="w-full sm:w-[380px] p-0">
                    <SheetHeader className="p-6 border-b">
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-80px)] p-6">
                      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                        <Input
                          type="text"
                          placeholder="Search products..."
                          onChange={(e) => updateFilters({ search: e.target.value })}
                          className="w-full"
                        />
                        <Input
                          type="number"
                          placeholder="Max price"
                          onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) })}
                          className="w-full"
                        />
                        <div className="border-b pb-6">
                          <label className="block text-sm font-medium mb-3">Category</label>
                          <Select
                            value={filters.category || "all"}
                            onValueChange={handleCategoryFilter}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              {categories.map(category => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Select
                          value={filters.condition || "all"}
                          onValueChange={handleConditionChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Conditions</SelectItem>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="Like New">Like New</SelectItem>
                            <SelectItem value="Good">Good</SelectItem>
                            <SelectItem value="Fair">Fair</SelectItem>
                            <SelectItem value="Poor">Poor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>

                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="hover:bg-gray-100"
                  >
                    <Grid2x2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="hover:bg-gray-100"
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Select
                defaultValue={filters.sortBy || 'newest'}
                onValueChange={handleSort}
              >
                <SelectTrigger className="w-[180px]">
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
            
            {/* Active Filters */}
            {Object.keys(filters).some(key => {
              if (key === 'priceRange') return false
              if (key === 'sortBy') return false
              return filters[key as keyof typeof filters]
            }) && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Active filters:</span>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filters).map(([key, value]) => {
                    if (key === 'priceRange' || key === 'sortBy') return null
                    if (!value) return null
                    return (
                      <span
                        key={key}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 cursor-pointer transform hover:scale-105 transition-all"
                        onClick={() => handleFilterChange(key as keyof ProductFilters, undefined)}
                      >
                        {key}: {value}
                        <X className="h-3 w-3" />
                      </span>
                    )
                  })}
                  <Button 
                    variant="link" 
                    className="text-sm h-auto p-0 hover:text-red-500 transition-colors"
                    onClick={clearFilters}
                  >
                    Clear all
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24 border border-gray-100">
              <div className="space-y-6">
                {/* Category Filter */}
                <div className="border-b pb-6">
                  <label className="block text-sm font-medium mb-3">Category</label>
                  <Select
                    value={filters.category || "all"}
                    onValueChange={handleCategoryFilter}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div className="border-b pb-6">
                  <label className="block text-sm font-medium mb-3">Price</label>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Price Range</span>
                      <span className="text-sm text-gray-500">
                        ${currentPriceRange[0].toLocaleString()} - ${currentPriceRange[1].toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      value={currentPriceRange}
                      max={1000000}
                      step={1000}
                      onValueChange={(value: [number, number]) => {
                        handleFilterChange('priceRange', value);
                      }}
                    />
                  </div>
                </div>

                {/* Condition Filter */}
                <div className="border-b pb-6">
                  <label className="block text-sm font-medium mb-3">Condition</label>
                  <div className="space-y-2">
                    {['New', 'Like New', 'Good', 'Fair'].map((condition) => (
                      <label key={condition} className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="condition"
                          className="rounded border-gray-300"
                          checked={filters.condition === condition}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleFilterChange('condition', condition);
                            }
                          }}
                        />
                        <span className="text-sm">{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Seller Rating Filter */}
                <div className="border-b pb-6">
                  <label className="block text-sm font-medium mb-3">Seller Rating</label>
                  <div className="space-y-2">
                    {[4, 3, 2].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          className="rounded border-gray-300"
                          checked={filters.minRating === rating}
                          onChange={() => handleFilterChange('minRating', rating)}
                        />
                        <div className="flex items-center gap-1">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-sm">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {Array.from({ length: itemsPerPage }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-t-xl" />
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-red-400 mx-auto" />
                <h3 className="text-lg font-medium text-gray-900 mt-4">
                  Failed to load listings
                </h3>
                <p className="mt-1 text-gray-500">
                  Please try again later
                </p>
                <Button
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            ) : (
              <>
                {currentListings.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mb-4">
                      <Search className="h-12 w-12 text-gray-400 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No listings found</h3>
                    <p className="mt-1 text-gray-500">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      className="mt-4"
                      onClick={clearFilters}
                    >
                      Clear all filters
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className={`grid gap-6 ${
                      viewMode === 'grid' 
                        ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                        : 'grid-cols-1'
                    }`}>
                      {currentListings.map((product, index) => (
                        <FadeIn key={product._id} delay={index * 100}>
                          <Card 
                            className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${
                              viewMode === 'list' ? 'flex' : ''
                            }`}
                          >
                            {/* Image section with quick view */}
                            <div 
                              className={`relative ${
                                viewMode === 'list' ? 'w-48' : 'aspect-square'
                              }`}
                              onClick={() => setQuickViewItem(product)}
                            >
                              {!failedImages.has(product.images[0]) ? (
                                <img 
                                  src={product.images[0]} 
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  onError={() => handleImageError(product.images[0])}
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                                  Quick View
                                </span>
                              </div>
                              {product.images.length > 1 && (
                                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                  <ImageIcon className="h-3 w-3" />
                                  {product.images.length}
                                </div>
                              )}
                            </div>

                            {/* Content section */}
                            <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                              <div className="space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h3 className="font-medium line-clamp-1 group-hover:text-blue-600 transition-colors">
                                      {product.name}
                                    </h3>
                                    {viewMode === 'list' && (
                                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                                        {product.description}
                                      </p>
                                    )}
                                  </div>
                                  <span className="font-semibold whitespace-nowrap text-green-600">
                                    ${product.price.toLocaleString()}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>{product.location}</span>
                                  </div>
                                  <span>•</span>
                                  <span>{product.timeAgo}</span>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t">
                                  <div className="flex items-center gap-1 text-sm">
                                    <span className="text-gray-600">
                                      {product.seller.name.split(' ')[0]} {product.seller.name.split(' ')[1]?.charAt(0)}.
                                    </span>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setQuickViewItem(product);
                                    }}
                                  >
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </FadeIn>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-8 flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        ))}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <Dialog open={!!quickViewItem} onOpenChange={() => setQuickViewItem(null)}>
        <DialogContent className="max-w-2xl" hideClose>
          {quickViewItem && (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-4 top-4 h-8 w-8" 
                onClick={() => setQuickViewItem(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="absolute right-12 top-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsSharingModalOpen(true)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Listing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsReportModalOpen(true)}>
                      <Flag className="h-4 w-4 mr-2" />
                      Report Listing
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="grid md:grid-cols-2 gap-6 pt-6">
                <div className="space-y-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative group">
                    {!failedImages.has(quickViewItem.images[selectedImage]) ? (
                      <img 
                        src={quickViewItem.images[selectedImage]} 
                        alt={quickViewItem.name}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(quickViewItem.images[selectedImage])}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <AlertTriangle className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    {quickViewItem.images.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                          onClick={() => setSelectedImage(prev => prev - 1)}
                          disabled={selectedImage === 0}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                          onClick={() => setSelectedImage(prev => prev + 1)}
                          disabled={selectedImage === quickViewItem.images.length - 1}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                  {quickViewItem.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {quickViewItem.images.map((image, i) => (
                        <button
                          key={i}
                          className={`aspect-square rounded-md overflow-hidden bg-gray-100 relative ${
                            selectedImage === i ? 'ring-2 ring-black' : ''
                          }`}
                          onClick={() => setSelectedImage(i)}
                        >
                          {!failedImages.has(image) ? (
                            <img 
                              src={image}
                              alt={`${quickViewItem.name} - ${i + 1}`}
                              className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                              onError={() => handleImageError(image)}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <AlertTriangle className="h-4 w-4 text-gray-400" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">{quickViewItem.name}</h2>
                    <p className="text-gray-600 mt-2">{quickViewItem.description}</p>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${quickViewItem.price.toLocaleString()}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      {quickViewItem.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {quickViewItem.timeAgo}
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Seller Information</h3>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {quickViewItem.seller.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">
                            {quickViewItem.seller.name.split(' ')[0]} {quickViewItem.seller.name.split(' ')[1]?.charAt(0)}.
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Member since {quickViewItem.seller.memberSince} • {quickViewItem.seller.listings} listings
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          {quickViewItem.seller.rating} rating
                        </div>
                        <div>Response rate: {quickViewItem.seller.responseRate}</div>
                        <div>Response time: {quickViewItem.seller.responseTime}</div>
                      </div>
                      {revealedModalContact ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Contact Information</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 hover:bg-red-50 hover:text-red-600 transition-colors"
                              onClick={() => setRevealedModalContact(false)}
                            >
                              <EyeOff className="h-4 w-4 mr-2" />
                              Hide Contact
                            </Button>
                          </div>
                          <div className="flex flex-col gap-2 text-sm">
                            {quickViewItem.seller.phone && (
                              <a 
                                href={`tel:${quickViewItem.seller.phone}`}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                              >
                                <Phone className="h-4 w-4" />
                                {quickViewItem.seller.phone}
                              </a>
                            )}
                            {quickViewItem.seller.email && (
                              <a 
                                href={`mailto:${quickViewItem.seller.email}`}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                              >
                                <Mail className="h-4 w-4" />
                                {quickViewItem.seller.email}
                              </a>
                            )}
                          </div>
                        </div>
                      ) : (
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => setRevealedModalContact(true)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          <Shield className="h-3 w-3 mr-2" />
                          Show Contact Information
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t">
                    <Button className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message Seller
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Report Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Report Listing</DialogTitle>
          <DialogDescription>
            Please select a reason for reporting this listing. Your report will be reviewed by our team.
          </DialogDescription>
          <div className="space-y-2">
            {[
              'Fraudulent or scam',
              'Inappropriate content',
              'Misleading information',
              'Wrong category',
              'Other'
            ].map(reason => (
              <label key={reason} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <input type="radio" name="report-reason" className="rounded border-gray-300" />
                <span>{reason}</span>
              </label>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsReportModalOpen(false)}>
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
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleShare('facebook')}
            >
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleShare('twitter')}
            >
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleShare('linkedin')}
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleShare('copy')}
            >
              <LinkIcon className="h-4 w-4 mr-2" />
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