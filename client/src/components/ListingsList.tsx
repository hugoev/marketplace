import { useEffect, useState } from 'react';
import { listingsApi } from '../lib/services/listings';
import type { Listing } from '../types/api';

export function ListingsList() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await listingsApi.getAll();
        setListings(response.data);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {listings.map((listing) => (
        <div key={listing.id}>
          <h3>{listing.title}</h3>
          <p>{listing.description}</p>
          <p>Price: ${listing.price}</p>
          <p>Location: {listing.location}</p>
        </div>
      ))}
    </div>
  );
} 