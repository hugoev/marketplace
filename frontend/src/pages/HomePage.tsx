import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Search, Heart, MessageCircle, DollarSign, Shield } from 'lucide-react'
import { categories, listings } from '@/lib/mock-data'

export default function HomePage() {
  // Mock data for featured listings
  const featuredListings = [
    {
      id: 1,
      title: "iPhone 14 Pro - Excellent Condition",
      price: 899,
      location: "San Francisco",
      image: "https://placehold.co/600x400",
      category: "Electronics"
    },
    // Add more mock listings
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Your Local Marketplace
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Buy and sell items easily in your local community
              </p>
              <div className="grid sm:grid-cols-2 gap-4 max-w-md">
                <Button size="lg" className="bg-black hover:bg-black/90 text-white rounded-full h-12">
                  Start Selling
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-12">
                  Browse Items
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              {/* Hero Image Grid - Updated with real images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square rounded-2xl bg-gray-100 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070" 
                      alt="Nike Shoes"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl bg-gray-100 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1932" 
                      alt="Furniture"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="pt-8">
                  <div className="aspect-square rounded-2xl bg-gray-100 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?q=80&w=2070" 
                      alt="Electronics"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {/* Featured Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={`/category/${category.slug}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <h3 className="text-white font-medium">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Featured Listings</h2>
            <Link 
              to="/listings" 
              className="text-sm text-gray-600 hover:text-black flex items-center gap-1"
            >
              View all
              <span className="text-lg">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((listing) => (
              <Link key={listing.id} to={`/listings/${listing.id}`}>
                <Card className="group overflow-hidden border-0 bg-white hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square overflow-hidden bg-gray-100 relative">
                    <img 
                      src={listing.image} 
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-medium text-sm line-clamp-2">
                        {listing.title}
                      </h3>
                      <span className="font-semibold whitespace-nowrap">
                        ${listing.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{listing.location}</span>
                      <span>•</span>
                      <span>{listing.timeAgo}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section className="rounded-2xl bg-white border p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Secure Transactions</h3>
              <p className="text-gray-600 text-sm">
                Safe and secure payments through our platform
              </p>
            </div>
            {/* Add more trust elements */}
          </div>
        </section>
      </main>
    </div>
  )
} 