import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ListingDetail } from '@/types';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ListingDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadListing(parseInt(id));
  }, [id]);

  async function loadListing(listingId: number) {
    try {
      setLoading(true);
      const data = await api.getListingDetail(listingId);
      setListing(data);
    } catch (error) {
      console.error('Failed to load listing:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="flex justify-center">Loading...</div>;
  if (!listing) return <div>Listing not found</div>;

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{listing.title}</CardTitle>
          <div className="text-3xl font-bold">${listing.price}</div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {listing.imageUrls.length > 0 ? (
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <img
                    src={listing.imageUrls[0]}
                    alt={listing.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : null}
              <p className="mt-4 text-lg">{listing.description}</p>
            </div>
            <div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p>{listing.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Contact Information</h3>
                  {listing.contactEmail && (
                    <p>Email: {listing.contactEmail}</p>
                  )}
                  {listing.contactPhone && (
                    <p>Phone: {listing.contactPhone}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">Category</h3>
                  <p>{listing.category}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 