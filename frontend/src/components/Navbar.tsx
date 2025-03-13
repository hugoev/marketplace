import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Search, MapPin, Heart, Bell, Menu } from 'lucide-react';
import { Input } from './ui/input';
import { categories } from '@/lib/mock-data'

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50">
      <div className="bg-white/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4">
          {/* Main Navbar */}
          <div className="h-16 flex items-center gap-6">
            <Link to="/" className="text-xl font-bold tracking-tight">
              marketplace
            </Link>

            {/* Location Selector */}
            <Button variant="ghost" className="hidden md:flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>San Francisco</span>
            </Button>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <Input 
                  placeholder="Search for anything..." 
                  className="w-full pl-10 h-11 bg-gray-50 border-gray-200 group-hover:border-gray-300 transition-colors"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium opacity-100 text-gray-400">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-gray-100">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-gray-100 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
              </Button>
              <Button 
                className="bg-black hover:bg-black/90 text-white rounded-full px-6" 
                asChild
              >
                <Link to="/create">Sell Now</Link>
              </Button>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="h-12 -mx-2 flex items-center gap-1 text-sm overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.slug}`}
                className="px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-black transition-colors whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 