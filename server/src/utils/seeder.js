const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
const Review = require('../models/Review');
const Message = require('../models/Message');

const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    bio: 'Passionate about technology and vintage items'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
    phone: '(555) 987-6543',
    location: 'Los Angeles, CA',
    bio: 'Love finding unique items and great deals'
  },
  {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: 'password123',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson',
    phone: '(555) 456-7890',
    location: 'Chicago, IL',
    bio: 'Collector of vintage electronics'
  }
];

const products = [
  {
    name: 'iPhone 13 Pro',
    description: 'Excellent condition, includes original box and accessories',
    price: 799.99,
    category: 'Electronics',
    condition: 'Like New',
    location: 'New York, NY',
    images: [
      'https://picsum.photos/id/1/500/500',
      'https://picsum.photos/id/2/500/500'
    ],
    tags: ['apple', 'smartphone', 'mobile']
  },
  {
    name: 'Vintage Leather Jacket',
    description: 'Classic brown leather jacket, size M, minimal wear',
    price: 120.00,
    category: 'Clothing',
    condition: 'Good',
    location: 'Los Angeles, CA',
    images: [
      'https://picsum.photos/id/3/500/500',
      'https://picsum.photos/id/4/500/500'
    ],
    tags: ['fashion', 'vintage', 'leather']
  },
  {
    name: 'Mountain Bike',
    description: 'Trek mountain bike, 21 speeds, recently serviced',
    price: 350.00,
    category: 'Sports',
    condition: 'Good',
    location: 'Chicago, IL',
    images: [
      'https://picsum.photos/id/5/500/500',
      'https://picsum.photos/id/6/500/500'
    ],
    tags: ['bike', 'outdoor', 'sports']
  },
  {
    name: 'Gaming Console PS5',
    description: 'PlayStation 5 with two controllers and 3 games',
    price: 450.00,
    category: 'Electronics',
    condition: 'Like New',
    location: 'New York, NY',
    images: [
      'https://picsum.photos/id/7/500/500',
      'https://picsum.photos/id/8/500/500'
    ],
    tags: ['gaming', 'console', 'playstation']
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    await Message.deleteMany({});

    // Create users
    const createdUsers = await Promise.all(
      users.map(async user => {
        const hashedPassword = await bcrypt.hash(user.password, 8);
        return User.create({
          ...user,
          password: hashedPassword
        });
      })
    );

    // Create products
    const createdProducts = await Promise.all(
      products.map((product, index) => {
        return Product.create({
          ...product,
          seller: createdUsers[index % createdUsers.length]._id
        });
      })
    );

    // Create reviews
    const reviews = [
      {
        reviewer: createdUsers[0]._id,
        reviewed: createdUsers[1]._id,
        rating: 5,
        comment: 'Great seller! Item was exactly as described.',
        transaction: createdProducts[0]._id
      },
      {
        reviewer: createdUsers[1]._id,
        reviewed: createdUsers[2]._id,
        rating: 4,
        comment: 'Good communication and fast shipping.',
        transaction: createdProducts[1]._id
      }
    ];

    await Review.insertMany(reviews);

    // Create messages
    const messages = [
      {
        sender: createdUsers[0]._id,
        receiver: createdUsers[1]._id,
        product: createdProducts[0]._id,
        content: 'Is this item still available?',
        type: 'message'
      },
      {
        sender: createdUsers[1]._id,
        receiver: createdUsers[0]._id,
        product: createdProducts[0]._id,
        content: 'Yes, it is! Would you like to make an offer?',
        type: 'message'
      },
      {
        sender: createdUsers[0]._id,
        receiver: createdUsers[1]._id,
        product: createdProducts[0]._id,
        content: 'I offer $700',
        type: 'offer',
        offerAmount: 700
      }
    ];

    await Message.insertMany(messages);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

module.exports = seedDatabase; 