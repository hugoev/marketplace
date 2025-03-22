const router = require('express').Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const Product = require('../models/Product');

// Get conversations list
router.get('/conversations', auth, async (req, res) => {
  try {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: req.user.id },
            { receiver: req.user.id }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', req.user.id] },
              '$receiver',
              '$sender'
            ]
          },
          lastMessage: { $first: '$$ROOT' }
        }
      }
    ]);

    await Message.populate(messages, {
      path: 'lastMessage.sender lastMessage.receiver',
      select: 'name avatar'
    });

    await Message.populate(messages, {
      path: 'lastMessage.product',
      select: 'name images'
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get messages with a specific user
router.get('/conversation/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.id }
      ]
    })
    .populate('sender', 'name avatar')
    .populate('receiver', 'name avatar')
    .populate('product', 'name images price')
    .sort({ createdAt: -1 })
    .limit(50);

    // Mark messages as read
    await Message.updateMany(
      {
        sender: req.params.userId,
        receiver: req.user.id,
        read: false
      },
      { read: true }
    );

    res.json(messages.reverse());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Send a message
router.post('/', auth, async (req, res) => {
  try {
    const { receiver, content, product, type, offerAmount } = req.body;

    const message = new Message({
      sender: req.user.id,
      receiver,
      content,
      product,
      type,
      offerAmount
    });

    await message.save();
    await message.populate([
      { path: 'sender', select: 'name avatar' },
      { path: 'receiver', select: 'name avatar' },
      { path: 'product', select: 'name images price' }
    ]);

    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update offer status
router.patch('/offer/:messageId', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Message.findOne({
      _id: req.params.messageId,
      type: 'offer',
      receiver: req.user.id
    });

    if (!message) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    message.offerStatus = status;
    if (status === 'accepted') {
      // Update product status
      await Product.findByIdAndUpdate(message.product, { status: 'pending' });
    }

    await message.save();
    res.json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a message
router.delete('/:id', auth, async (req, res) => {
  try {
    const message = await Message.findOneAndDelete({
      _id: req.params.id,
      sender: req.user.id
    });

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 