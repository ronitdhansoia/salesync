const express = require('express');
const router = express.Router();

// Placeholder for user routes
router.get('/', (req, res) => {
  res.json({ message: 'Users route' });
});

module.exports = router;