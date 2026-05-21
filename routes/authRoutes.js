const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
router.post('/jwt', async (req, res) => {
  try {
    const user = req.body;
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    .json({ success: true });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/logout', async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    .json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;