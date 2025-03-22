import { useState, useEffect } from 'react';
import { Listing, ListingSearchParams } from '@/types';
import { apiService } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ListingCard } from '@/components/ListingCard';

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState<ListingSearchParams>({
    location: '',
    category: '',
    page: 0,
    size: 12
  });

  useEffect(() => {
    loadListings();
  }, [searchParams]);

  async function loadListings() {
    try {
      setLoading(true);
      const response = await apiService.getListings(searchParams);
      setListings(response.data.content);
    } catch (error) {
      console.error('Failed to load listings:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-4 mb-8">
        <Input
          placeholder="Location"
          value={searchParams.location}
          onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
          className="max-w-xs"
        />
        <Select value={searchParams.category} onValueChange={(value) => setSearchParams({ ...searchParams, category: value })}>
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="furniture">Furniture</SelectItem>
            <SelectItem value="vehicles">Vehicles</SelectItem>
            {/* Add more categories */}
          </SelectContent>
        </Select>
        <Button onClick={loadListings}>Search</Button>
      </div>

      {loading ? (
        <div className="flex justify-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
} 