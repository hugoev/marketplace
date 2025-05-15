import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Search, Heart, MessageCircle, DollarSign, Shield, Clock, Users, Facebook, Twitter, Instagram, Linkedin, MapPin } from 'lucide-react'
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
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border-b min-h-[90vh] flex items-center">
        {/* Animated background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBzdHJva2U9InJnYmEoMCwwLDAsMC4wNSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
        </div>

        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-white text-sm rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    New on Marketplace
                  </span>
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full font-medium">
                    50K+ Active Users
                  </span>
                </div>
                <h1 className="text-7xl font-bold tracking-tight bg-gradient-to-br from-black via-gray-700 to-gray-800 bg-clip-text text-transparent">
                  Your Local
                  <br />
                  Marketplace
                </h1>
                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                  Discover unique items, connect with sellers, and find amazing deals in your local community. Join thousands of happy users today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <Link to="/create" className="flex-1">
                  <Button size="lg" className="bg-black hover:bg-black/90 text-white rounded-full h-14 hover:scale-105 transition-all duration-300 w-full font-medium shadow-lg hover:shadow-xl">
                    Start Selling
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/marketplace" className="flex-1">
                  <Button size="lg" variant="outline" className="rounded-full h-14 hover:scale-105 transition-all duration-300 w-full font-medium border-2">
                    Browse Items
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Secure Payments
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  24/7 Support
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative">
              {/* Hero Image Grid */}
              <div className="grid grid-cols-2 gap-6 transform hover:scale-[1.02] transition-all duration-700">
                <div className="space-y-6">
                  <div className="aspect-square rounded-3xl bg-gray-100 overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070" 
                      alt="Nike Shoes"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="aspect-square rounded-3xl bg-gray-100 overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1932" 
                      alt="Furniture"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="pt-12">
                  <div className="aspect-square rounded-3xl bg-gray-100 overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?q=80&w=2070" 
                      alt="Electronics"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-yellow-100 rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-60" />
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-24">
        {/* Stats Section */}
        <section className="mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Users", value: "50K+", icon: Users, delay: 0 },
              { label: "Daily Listings", value: "1000+", icon: DollarSign, delay: 100 },
              { label: "Categories", value: "20+", icon: Search, delay: 200 },
              { label: "Response Time", value: "< 10min", icon: Clock, delay: 300 }
            ].map((stat) => (
              <FadeIn key={stat.label} delay={stat.delay}>
                <Card className="group hover:shadow-xl transition-all duration-500 border-none bg-gradient-to-br from-white to-gray-50 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent" />
                  <CardContent className="p-8 relative">
                    <div className="h-14 w-14 rounded-2xl bg-black/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 mb-4">
                      <stat.icon className="h-7 w-7 text-black" />
                    </div>
                    <p className="text-4xl font-bold mb-2 bg-gradient-to-br from-black to-gray-600 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Featured Categories */}
        <section className="mb-32">
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold">Popular Categories</h2>
                <p className="text-gray-600">Explore our most popular categories</p>
              </div>
              <Link 
                to="/marketplace" 
                className="group flex items-center gap-2 px-6 py-3 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
              >
                <span className="text-sm font-medium">View all categories</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <FadeIn key={category.name} delay={index * 100}>
                <Link 
                  to={`/marketplace?category=${category.slug}`}
                  className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 hover:shadow-2xl transition-all duration-500"
                >
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end transform group-hover:translate-y-[-8px] transition-transform duration-500">
                    <h3 className="text-white font-semibold text-2xl mb-2">{category.name}</h3>
                    <p className="text-white/90 text-sm flex items-center gap-2">
                      {category.count} items
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        <section className="mb-32">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">Featured Listings</h2>
              <p className="text-gray-600">Handpicked items you might love</p>
            </div>
            <Link 
              to="/marketplace" 
              className="group flex items-center gap-2 px-6 py-3 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
            >
              <span className="text-sm font-medium">View all listings</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredListings.map((listing, index) => (
              <FadeIn key={listing.id} delay={index * 100}>
                <Link to={`/listings/${listing.id}`}>
                  <Card className="group overflow-hidden border-none bg-white hover:shadow-2xl transition-all duration-500 rounded-3xl">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative rounded-2xl">
                      <img 
                        src={listing.image} 
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-4 right-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="space-y-1 flex-1">
                          <span className="text-xs font-medium text-gray-500">{listing.category}</span>
                          <h3 className="font-medium text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {listing.title}
                          </h3>
                        </div>
                        <span className="font-semibold whitespace-nowrap text-green-600 text-xl">
                          ${listing.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {listing.location}
                        </span>
                        <span>•</span>
                        <span>{listing.timeAgo}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
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