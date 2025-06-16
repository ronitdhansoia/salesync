const express = require('express');
const router = express.Router();

// Placeholder for WhatsApp routes
router.get('/', (req, res) => {
  res.json({ message: 'WhatsApp route' });
});

module.exports = router;