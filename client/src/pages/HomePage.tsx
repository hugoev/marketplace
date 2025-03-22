import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Search, Heart, MessageCircle, DollarSign, Shield, Clock, Users, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { categories, listings } from '@/lib/mock-data'
import { ScrollToTop } from '@/components/ScrollToTop'
import { FadeIn } from '@/components/FadeIn'

export default function HomePage() {
  // Mock data for featured listings
  const featuredListings = [
    {
      id: 1,
      title: "iPhone 14 Pro - Mint Condition",
      price: 899,
      location: "San Francisco",
      image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=500&q=80",
      category: "Electronics",
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      title: "MacBook Pro 16\" M1 Max",
      price: 1999,
      location: "New York",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
      category: "Electronics",
      timeAgo: "5 hours ago"
    },
    {
      id: 3,
      title: "Sony PlayStation 5",
      price: 499,
      location: "Los Angeles",
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80",
      category: "Gaming",
      timeAgo: "1 day ago"
    },
    {
      id: 4,
      title: "Nike Air Max 2023",
      price: 179,
      location: "Chicago",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
      category: "Fashion",
      timeAgo: "3 days ago"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-gray-100 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1.5 bg-black text-white text-sm rounded-full">
                  New on Marketplace
                </span>
                <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                  Your Local Marketplace
                </h1>
                <p className="text-xl text-gray-600">
                  Buy and sell items easily in your local community
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 max-w-md">
                <Link to="/create">
                  <Button size="lg" className="bg-black hover:bg-black/90 text-white rounded-full h-12 hover:scale-105 transition-transform w-full">
                    Start Selling
                  </Button>
                </Link>
                <Link to="/marketplace">
                  <Button size="lg" variant="outline" className="rounded-full h-12 hover:scale-105 transition-transform w-full">
                    Browse Items
                  </Button>
                </Link>
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
        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Users", value: "50K+", icon: Users, delay: 0 },
              { label: "Daily Listings", value: "1000+", icon: DollarSign, delay: 100 },
              { label: "Categories", value: "20+", icon: Search, delay: 200 },
              { label: "Response Time", value: "< 10min", icon: Clock, delay: 300 }
            ].map((stat) => (
              <FadeIn key={stat.label} delay={stat.delay}>
                <Card className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-black/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Featured Categories */}
        <section className="mb-12">
          <FadeIn>
            <h2 className="text-2xl font-semibold mb-6">Popular Categories</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <FadeIn key={category.name} delay={index * 100}>
                <Link 
                  to={`/marketplace?category=${category.slug}`}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end transform group-hover:translate-y-[-4px] transition-transform">
                    <h3 className="text-white font-medium text-lg">{category.name}</h3>
                    <p className="text-white/90 text-sm">{category.count} items</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Featured Listings</h2>
            <Link 
              to="/marketplace" 
              className="text-sm text-gray-600 hover:text-black flex items-center gap-1"
            >
              View all
              <span className="text-lg">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((listing) => (
              <Link key={listing.id} to={`/listings/${listing.id}`}>
                <Card className="group overflow-hidden border-0 bg-white hover:shadow-xl transition-all duration-300 rounded-xl">
                  <div className="aspect-square overflow-hidden bg-gray-100 relative">
                    <img 
                      src={listing.image} 
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {listing.title}
                      </h3>
                      <span className="font-semibold whitespace-nowrap text-green-600">
                        ${listing.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{listing.location}</span>
                      <span className="h-1 w-1 rounded-full bg-gray-300" />
                      <span>{listing.timeAgo}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust & Safety Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
            <FadeIn>
              <div className="max-w-2xl mx-auto text-center mb-12 relative">
                <h2 className="text-3xl font-bold mb-4">Safe and Secure Trading</h2>
                <p className="text-gray-300">We prioritize your safety with verified users and secure transactions</p>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-8 relative">
              {[
                {
                  title: "Verified Users",
                  description: "All users are verified through our secure verification process",
                  icon: Shield
                },
                {
                  title: "Secure Messaging",
                  description: "Chat safely with buyers and sellers through our platform",
                  icon: MessageCircle
                },
                {
                  title: "Safe Payments",
                  description: "Multiple secure payment options available",
                  icon: DollarSign
                }
              ].map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download App Section */}
        <section className="mb-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 border overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />
            <div className="grid md:grid-cols-2 gap-12 items-center relative">
              <FadeIn>
                <div>
                  <h2 className="text-3xl font-bold mb-4">Get the Marketplace App</h2>
                  <p className="text-gray-600 mb-8">
                    Buy and sell faster with our mobile app. Available for iOS and Android.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-black text-white hover:bg-black/90 hover:scale-105 transition-transform">
                      Download for iOS
                    </Button>
                    <Button variant="outline" className="hover:scale-105 transition-transform">
                      Download for Android
                    </Button>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl bg-gray-100 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                    <img 
                      src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80" 
                      alt="Mobile app preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-2xl" />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-gray-600 mb-8">
              Join thousands of users who buy and sell on our platform every day
            </p>
            <Button size="lg" className="bg-black hover:bg-black/90 text-white px-8">
              Start Selling Now
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Marketplace</h3>
              <p className="text-sm text-gray-600">
                Your local marketplace for buying and selling.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link 
                    to="/about" 
                    className="hover:text-black transition-colors duration-200 inline-block relative group"
                  >
                    About Us
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-200 group-hover:w-full" />
                  </Link>
                </li>
                <li><Link to="/contact" className="hover:text-black transition-colors">Contact</Link></li>
                <li><Link to="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {categories.slice(0, 4).map(category => (
                  <li key={category.slug}>
                    <Link to={`/marketplace?category=${category.slug}`} className="hover:text-black transition-colors">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <Link to="#" className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <Facebook className="h-5 w-5 text-gray-600" />
                </Link>
                <Link to="#" className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <Instagram className="h-5 w-5 text-gray-600" />
                </Link>
                <Link to="#" className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <Twitter className="h-5 w-5 text-gray-600" />
                </Link>
                <Link to="#" className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <Linkedin className="h-5 w-5 text-gray-600" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  )
} 