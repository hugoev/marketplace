export const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    count: 1234,
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80"
  },
  {
    name: "Vehicles",
    slug: "vehicles",
    count: 890,
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&q=80"
  },
  {
    name: "Fashion",
    slug: "fashion",
    count: 2341,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80"
  },
  {
    name: "Real Estate",
    slug: "real-estate",
    count: 432,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80"
  }
];

export const listings = [
  {
    id: 1,
    title: "iPhone 14 Pro - Mint Condition",
    description: "Barely used iPhone 14 Pro with all original accessories and box. Perfect condition, no scratches.",
    price: 899,
    location: "San Francisco",
    image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=500&q=80",
    category: "Electronics",
    condition: "Like New",
    timeAgo: "2 hours ago",
    images: [
      "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=500&q=80",
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"
    ],
    seller: {
      name: "John Smith",
      rating: 4.8,
      verified: true,
      responseRate: "98%",
      responseTime: "< 1 hour",
      memberSince: "Jan 2023",
      listings: 15,
      phone: "+1 (555) 123-4567",
      email: "john.smith@example.com"
    }
  },
  {
    id: 2,
    title: "MacBook Pro 16\" M1 Max",
    description: "2022 MacBook Pro with M1 Max chip, 32GB RAM, 1TB SSD. Includes charger and original box.",
    price: 1999,
    location: "New York",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    category: "Electronics",
    condition: "Excellent",
    timeAgo: "5 hours ago",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80"
    ],
    seller: {
      name: "Sarah Johnson",
      rating: 4.5,
      verified: true,
      responseRate: "95%",
      responseTime: "< 2 hours",
      memberSince: "Mar 2023",
      listings: 8,
      email: "sarah.j@example.com"
    }
  },
  {
    id: 3,
    title: "Tesla Model 3 2022",
    description: "Tesla Model 3 Long Range, White exterior, Black interior, FSD package, 15k miles.",
    price: 42999,
    location: "Los Angeles",
    image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=500&q=80",
    category: "Vehicles",
    condition: "Excellent",
    timeAgo: "1 day ago",
    images: [
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=500&q=80",
      "https://images.unsplash.com/photo-1537984822441-cff330075342?w=500&q=80",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=500&q=80"
    ],
    seller: {
      name: "Mike Wilson",
      rating: 4.2,
      verified: false,
      responseRate: "90%",
      responseTime: "< 3 hours",
      memberSince: "Jun 2023",
      listings: 5,
      phone: "+1 (555) 987-6543"
    }
  }
]; 