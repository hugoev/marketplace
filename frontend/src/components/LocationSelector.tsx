import { useState, useEffect } from 'react'
import { MapPin, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'

// You would need to implement or use a service for this
const suggestedLocations = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA',
]

export function LocationSelector() {
  const [location, setLocation] = useState(() => {
    return localStorage.getItem('userLocation') || 'San Francisco, CA'
  })
  const [isEditing, setIsEditing] = useState(false)
  const [tempLocation, setTempLocation] = useState(location)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem('userLocation', location)
  }, [location])

  const detectLocation = () => {
    setIsLoading(true)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // You would need to implement this service
            const response = await fetch(
              `https://api.example.com/geocode?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
            )
            const data = await response.json()
            setLocation(data.formatted_address)
            setTempLocation(data.formatted_address)
            setIsLoading(false)
            setIsEditing(false)
          } catch (error) {
            console.error('Error getting location:', error)
            setIsLoading(false)
          }
        },
        (error) => {
          console.error('Error getting location:', error)
          setIsLoading(false)
        }
      )
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLocation(tempLocation)
    setIsEditing(false)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-black">
          <MapPin className="h-4 w-4" />
          <span className="max-w-[150px] truncate">{location}</span>
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
          
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Command className="rounded-lg border shadow-md">
                <CommandInput
                  placeholder="Enter city, state"
                  value={tempLocation}
                  onValueChange={setTempLocation}
                />
                <CommandEmpty>No location found.</CommandEmpty>
                <CommandGroup>
                  {suggestedLocations
                    .filter(loc => 
                      loc.toLowerCase().includes(tempLocation.toLowerCase())
                    )
                    .map(loc => (
                      <CommandItem
                        key={loc}
                        onSelect={() => {
                          setTempLocation(loc)
                          setLocation(loc)
                          setIsEditing(false)
                        }}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        {loc}
                      </CommandItem>
                    ))
                  }
                </CommandGroup>
              </Command>
              <div className="flex items-center gap-2">
                <Button type="submit" className="flex-1">
                  Save
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setTempLocation(location)
                    setIsEditing(false)
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
                <span className="font-medium">{location}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsEditing(true)}
                >
                  Change Location
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={detectLocation}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Detecting Location...
                    </>
                  ) : (
                    'Use Current Location'
                  )}
                </Button>
              </div>
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
  )
} 