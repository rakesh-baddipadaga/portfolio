const express = require('express');
const Profile = require('../models/profile');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;

