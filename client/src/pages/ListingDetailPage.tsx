import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService, productsApi } from '@/lib/api';
import { Listing } from '@/types';
import { Product } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  MapPin,
  Clock,
  MessageCircle,
  Star,
  ChevronLeft,
  AlertTriangle,
  Phone,
  Mail,
  Eye,
  EyeOff,
  Shield,
  Loader2
} from 'lucide-react';

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Product | Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revealedContact, setRevealedContact] = useState(false);

  useEffect(() => {
    async function loadItem() {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Try to load as a product first
        try {
          const response = await productsApi.getById(id);
          setItem(response);
        } catch (productErr) {
          // If that fails, try to load as a listing
          try {
            const response = await apiService.getListingById(Number(id));
            setItem(response.data);
          } catch (listingErr) {
            throw new Error('Failed to load item');
          }
        }
      } catch (err) {
        console.error('Error loading item:', err);
        setError(err instanceof Error ? err.message : 'Failed to load item');
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading item...</span>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="container mx-auto p-4">
        <Card className="p-6 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4 animate-bounce" />
          <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error || 'Item not found'}</p>
          <Link to="/marketplace">
            <Button variant="outline" className="inline-flex items-center">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Helper function to determine if item is a Product
  const isProduct = (item: Product | Listing): item is Product => {
    return '_id' in item;
  };

  // Get the appropriate fields based on item type
  const title = isProduct(item) ? item.name : item.title;
  const mainImage = isProduct(item) ? item.images[0] : item.image;
  const images = item.images;
  const description = item.description;
  const price = item.price;
  const location = item.location;
  const timeAgo = item.timeAgo;
  const condition = item.condition;
  const seller = item.seller;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link to="/marketplace">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={mainImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, index) => (
              <div key={index} className="aspect-square rounded-md overflow-hidden bg-gray-100">
                <img src={img} alt={`${title} ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Item Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {timeAgo}
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {location}
              </span>
            </div>
          </div>

          <div className="border-t border-b py-4">
            <div className="text-3xl font-bold mb-4">${price.toLocaleString()}</div>
            {condition && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                <Shield className="h-4 w-4 mr-2" />
                {condition}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{description}</p>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Seller Information</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{seller?.name || 'Anonymous Seller'}</h3>
                  {seller?.memberSince && (
                    <p className="text-sm text-gray-600">Member since {seller.memberSince}</p>
                  )}
                </div>
                {seller?.rating !== undefined && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{seller.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                {seller?.responseRate && (
                  <div>
                    <p>Response rate</p>
                    <p className="font-semibold">{seller.responseRate}</p>
                  </div>
                )}
                {seller?.responseTime && (
                  <div>
                    <p>Response time</p>
                    <p className="font-semibold">{seller.responseTime}</p>
                  </div>
                )}
                {seller?.listings !== undefined && (
                  <div>
                    <p>Total listings</p>
                    <p className="font-semibold">{seller.listings}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {(seller?.phone || seller?.email) && (
                  <Button
                    onClick={() => setRevealedContact(!revealedContact)}
                    className="w-full"
                    variant="outline"
                  >
                    {revealedContact ? (
                      <EyeOff className="mr-2 h-4 w-4" />
                    ) : (
                      <Eye className="mr-2 h-4 w-4" />
                    )}
                    {revealedContact ? 'Hide Contact Info' : 'Show Contact Info'}
                  </Button>
                )}

                {revealedContact && (
                  <div className="space-y-2">
                    {seller?.phone && (
                      <Button variant="outline" className="w-full">
                        <Phone className="mr-2 h-4 w-4" />
                        {seller.phone}
                      </Button>
                    )}
                    {seller?.email && (
                      <Button variant="outline" className="w-full">
                        <Mail className="mr-2 h-4 w-4" />
                        {seller.email}
                      </Button>
                    )}
                  </div>
                )}

                <Button className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message Seller
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 