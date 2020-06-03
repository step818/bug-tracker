const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//@route   Get api/auth
//@desc    Get user by ID
//@access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const AuthUser = require('../../models/User');

//@route   Post api/auth
//@desc    Authenticate user & get token
//@access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //See if user exists
      let user = await User.findOne({ email });

      if(!user) {
        return  res
          .status(400)
          .json({ errors: [{msg: 'Invalid Creds' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Creds' }]});
      }

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload, 
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route  PUT api/user/points/:id
//@desc   User gets rewarded or deducted points
//@access Private
router.put('/points/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    // Add points
    const newPoints = req.body.points;

    user.points = user.points + newPoints;

    await user.save();

    res.json(user.points);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;