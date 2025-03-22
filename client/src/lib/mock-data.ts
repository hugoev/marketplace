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
    title: "iPhone 14 Pro Max - 256GB Space Black",
    price: 899,
    description: "Selling my iPhone 14 Pro Max in perfect condition. 256GB, Space Black. Includes original box, charger, and AppleCare+ until 2024. Battery health at 97%. No scratches or dents.",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=2070",
    images: [
      "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=2070",
      "https://images.unsplash.com/photo-1663499482479-e1ff1704c68a?q=80&w=2070",
      "https://images.unsplash.com/photo-1663499481614-e68c5ebe4c09?q=80&w=2070",
    ],
    category: "Electronics",
    condition: "Like New",
    timeAgo: "2 hours ago",
    seller: {
      name: "Michael Chen",
      rating: 4.9,
      memberSince: "Jan 2022",
      listings: 15,
      responseRate: "98%",
      responseTime: "< 1 hour",
      phone: "+1 (415) 555-0123",
      email: "michael.c@example.com"
    }
  },
  {
    id: 2,
    title: "2023 MacBook Pro 16\" M2 Max - 32GB RAM, 1TB",
    price: 2499,
    description: "Selling my MacBook Pro 16-inch (2023) with M2 Max chip. Only 3 months old, in perfect condition. Specs: 32GB RAM, 1TB SSD, Space Gray. Includes original packaging and accessories. AppleCare+ until 2026.",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2070",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2070",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=2070"
    ],
    category: "Electronics",
    condition: "Like New",
    timeAgo: "5 hours ago",
    seller: {
      name: "Sarah Johnson",
      rating: 4.8,
      memberSince: "Mar 2021",
      listings: 23,
      responseRate: "95%",
      responseTime: "< 30 mins",
      phone: "+1 (212) 555-0456",
      email: "sarah.j@example.com"
    }
  },
  {
    id: 3,
    title: "2022 Tesla Model 3 Long Range - White",
    price: 39900,
    description: "2022 Tesla Model 3 Long Range in Pearl White. 15,000 miles, perfect condition. Full Self-Driving capability, premium interior, 19\" Sport Wheels. Extended warranty until 2027. Clean title, no accidents.",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071",
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070",
      "https://images.unsplash.com/photo-1551829142-d9b8cf2c8738?q=80&w=2071",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2071"
    ],
    category: "Vehicles",
    condition: "Excellent",
    timeAgo: "1 day ago",
    seller: {
      name: "David Wilson",
      rating: 5.0,
      memberSince: "Jun 2020",
      listings: 8,
      responseRate: "100%",
      responseTime: "< 15 mins",
      phone: "+1 (310) 555-0789",
      email: "david.w@example.com"
    }
  },
  {
    id: 4,
    title: "Sony A7 IV Mirrorless Camera with 24-70mm Lens",
    price: 2799,
    description: "Sony A7 IV with FE 24-70mm f/2.8 GM lens. Purchased 6 months ago, like new condition. Includes original box, extra battery, 128GB SD card, and camera bag. Only 2,500 shutter count.",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1621520291095-aa6c7137f048?q=80&w=2070",
    images: [
      "https://images.unsplash.com/photo-1621520291095-aa6c7137f048?q=80&w=2070",
      "https://images.unsplash.com/photo-1621520291205-17f2d0f4c71f?q=80&w=2070",
      "https://images.unsplash.com/photo-1621520291301-426e9a8a55c7?q=80&w=2070"
    ],
    category: "Electronics",
    condition: "Like New",
    timeAgo: "3 days ago",
    seller: {
      name: "Emily Brown",
      rating: 4.7,
      memberSince: "Sep 2021",
      listings: 31,
      responseRate: "92%",
      responseTime: "< 2 hours",
      phone: "+1 (312) 555-0321",
      email: "emily.b@example.com"
    }
  },
  {
    id: 5,
    title: "Modern Leather Sectional Sofa - Gray",
    price: 1299,
    description: "Contemporary L-shaped sectional sofa in genuine leather. Gray color, 1 year old, excellent condition. Includes ottoman. Pet-free and smoke-free home. Dimensions: 108\"W x 84\"D x 34\"H",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070",
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=2070",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069"
    ],
    category: "Furniture",
    condition: "Good",
    timeAgo: "4 days ago",
    seller: {
      name: "Alex Martinez",
      rating: 4.9,
      memberSince: "Dec 2020",
      listings: 12,
      responseRate: "97%",
      responseTime: "< 1 hour",
      phone: "+1 (206) 555-0147",
      email: "alex.m@example.com"
    }
  },
  {
    id: 6,
    title: "Giant Trance X 29 Mountain Bike 2023",
    price: 3499,
    description: "2023 Giant Trance X 29 Advanced Pro 1. Carbon frame, SRAM GX Eagle groupset, Fox 36 Performance Elite fork. Size Large. Less than 500 miles ridden, maintained regularly.",
    location: "Denver, CO",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=2068",
    images: [
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=2068",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=2068",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=2068"
    ],
    category: "Sports",
    condition: "Excellent",
    timeAgo: "5 days ago",
    seller: {
      name: "Chris Taylor",
      rating: 4.8,
      memberSince: "Jul 2021",
      listings: 19,
      responseRate: "94%",
      responseTime: "< 3 hours",
      phone: "+1 (303) 555-0963",
      email: "chris.t@example.com"
    }
  }
];