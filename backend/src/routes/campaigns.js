const express = require('express');
const router = express.Router();

// Placeholder for campaign routes
router.get('/', (req, res) => {
  res.json({ message: 'Campaigns route' });
});

module.exports = router;