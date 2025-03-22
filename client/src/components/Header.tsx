import { LocationSelector } from '@/components/LocationSelector'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link to="/" className="font-semibold text-xl">
          Marketplace
        </Link>

        {/* Center section with search and location */}
        <div className="flex items-center gap-4">
          <LocationSelector />
          {/* Other header content */}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <Link to="/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Listing
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
} 