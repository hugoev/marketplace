import { Listing } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistance } from 'date-fns';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        {listing.imageUrls[0] && (
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <img
              src={listing.imageUrls[0]}
              alt={listing.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <CardTitle className="text-lg">{listing.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-start mb-2">
          <span className="text-2xl font-bold">${listing.price}</span>
          <span className="text-sm text-muted-foreground">
            {formatDistance(new Date(listing.createdAt), new Date(), { addSuffix: true })}
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          <div>{listing.location}</div>
          <div>{listing.category}</div>
        </div>
      </CardContent>
    </Card>
  );
} 