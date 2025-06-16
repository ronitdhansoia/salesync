const express = require('express');
const router = express.Router();

// Placeholder for contact routes
router.get('/', (req, res) => {
  res.json({ message: 'Contacts route' });
});

module.exports = router;