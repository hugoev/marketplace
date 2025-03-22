const router = require('express').Router();
const { authenticateToken } = require('../middleware/auth');
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const { maxPrice, category, condition, search } = req.query;
    let query = {};

    // Apply filters if provided
    if (maxPrice) {
      query.price = { $lte: parseFloat(maxPrice) };
    }
    if (category) {
      query.category = category;
    }
    if (condition) {
      query.condition = condition;
    }
    if (search) {
      query.$text = { $search: search };
    }

    const products = await Product.find(query)
      .populate('seller', 'name avatar location')
      .sort({ createdAt: -1 });
    
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name avatar location phone email');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Increment views
    product.views += 1;
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create product (protected route)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, price, category, condition, location, images, tags } = req.body;
    
    const product = new Product({
      name,
      description,
      price,
      category,
      condition,
      location,
      images,
      tags,
      seller: req.user.id
    });

    await product.save();
    await product.populate('seller', 'name avatar location');
    
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update product (protected route)
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'price', 'category', 'condition', 'location', 'images', 'tags', 'status'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.user.id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    updates.forEach(update => product[update] = req.body[update]);
    await product.save();
    await product.populate('seller', 'name avatar location');

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete product (protected route)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      seller: req.user.id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 