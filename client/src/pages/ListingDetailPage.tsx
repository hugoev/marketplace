import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '@/lib/api';
import { Listing } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadListing(parseInt(id));
    }
  }, [id]);

  async function loadListing(listingId: number) {
    try {
      setLoading(true);
      const response = await apiService.getListingById(listingId);
      setListing(response.data);
    } catch (err) {
      setError('Failed to load listing');
      console.error('Error loading listing:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!listing) return <div>Listing not found</div>;

  return (
    <div className="container mx-auto py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">{listing.title}</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full rounded-lg"
            />
          </div>
          <div>
            <p className="text-3xl font-bold text-green-600 mb-4">
              ${listing.price.toLocaleString()}
            </p>
            <p className="text-gray-600 mb-4">{listing.description}</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Location: {listing.location}</p>
              <p>Category: {listing.category}</p>
              {listing.condition && <p>Condition: {listing.condition}</p>}
            </div>
            <div className="mt-6">
              <Button className="w-full">Contact Seller</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 