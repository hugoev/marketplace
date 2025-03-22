import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Search, MapPin, Heart, Bell, Menu, X, User, LogOut, Settings, UserCircle } from 'lucide-react';
import { Input } from './ui/input';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Vehicles", slug: "vehicles" },
  { name: "Furniture", slug: "furniture" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Fashion", slug: "fashion" },
  { name: "Sports", slug: "sports" },
  { name: "Books", slug: "books" },
  { name: "Collectibles", slug: "collectibles" },
  { name: "Home & Garden", slug: "home-garden" },
  { name: "Jobs", slug: "jobs" },
  { name: "Services", slug: "services" },
  { name: "Pets", slug: "pets" },
  { name: "Musical Instruments", slug: "musical-instruments" },
  { name: "Art & Crafts", slug: "art-crafts" },
  { name: "Gaming", slug: "gaming" },
  { name: "Tools & Equipment", slug: "tools-equipment" }
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(() => {
    return localStorage.getItem('userLocation') || 'San Francisco, CA'
  });
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [tempLocation, setTempLocation] = useState(userLocation);
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Save location to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('userLocation', userLocation);
  }, [userLocation]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Command+K (Mac) or Control+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); // Prevent default browser behavior
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Clear search when leaving marketplace
  useEffect(() => {
    if (!location.pathname.includes('marketplace')) {
      setSearchQuery('');
    }
  }, [location.pathname]);

  // Update search query from URL when on marketplace
  useEffect(() => {
    if (location.pathname.includes('marketplace')) {
      const params = new URLSearchParams(location.search);
      const searchParam = params.get('search');
      if (searchParam) {
        setSearchQuery(searchParam);
      }
    }
  }, [location.search]);

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserLocation(tempLocation);
    setIsEditingLocation(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-black">
                  <MapPin className="h-4 w-4" />
                  <span className="max-w-[150px] truncate">{userLocation}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Your Location</h4>
                    <p className="text-sm text-gray-500">
                      This helps us show you relevant items in your area
                    </p>
                  </div>
                  
                  {isEditingLocation ? (
                    <form onSubmit={handleLocationSubmit} className="space-y-2">
                      <Input
                        placeholder="Enter city, state"
                        value={tempLocation}
                        onChange={(e) => setTempLocation(e.target.value)}
                        autoFocus
                      />
                      <div className="flex items-center gap-2">
                        <Button type="submit" className="flex-1">
                          Save
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => {
                            setTempLocation(userLocation)
                            setIsEditingLocation(false)
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <span className="font-medium">{userLocation}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setIsEditingLocation(true)}
                      >
                        Change Location
                      </Button>
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500">
                      Your location is used to show you relevant listings and improve your marketplace experience.
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative group">
                <Input 
                  ref={searchInputRef}
                  placeholder="Search for anything..." 
                  className="w-full pl-10 h-11 bg-gray-50 border-gray-200 group-hover:border-gray-300 transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => {
                      setSearchQuery('');
                      if (location.pathname.includes('marketplace')) {
                        navigate('/marketplace');
                      }
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium opacity-100 text-gray-400">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-gray-100">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-gray-100 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
              </Button>
              {user ? (
                <>
                  <Button 
                    className="bg-black hover:bg-black/90 text-white rounded-full px-6" 
                    asChild
                  >
                    <Link to="/create">Sell Now</Link>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="h-8 w-8 rounded-full"
                          />
                        ) : (
                          <UserCircle className="h-6 w-6" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/settings" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    className="bg-black hover:bg-black/90 text-white rounded-full px-6"
                    asChild
                  >
                    <Link to="/login" state={{ from: '/create', message: 'Please sign in to create a listing' }}>
                      Sell Now
                    </Link>
                  </Button>
                  <Button 
                    className="bg-black hover:bg-black/90 text-white rounded-full px-6"
                    asChild
                  >
                    <Link to="/login" state={{ from: location.pathname }}>
                      Sign in
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Category Navigation */}
          <div className="h-12 -mx-2 flex items-center gap-1 text-sm overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/marketplace?category=${category.slug}`}
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