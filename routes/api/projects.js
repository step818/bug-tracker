const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Project = require('../../models/Projects');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route  Post api/projects
//@desc   Create a project
//@access Public
router.post(
  '/',
  [
    auth, 
    [
      check('text', 'Text is required')
      .not()
      .isEmpty()
    ]
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
      const user = await User.findById(req.user.id).select('-password');

      const newProject = new Project ({
        text: req.body.text,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        user: req.user.id
      });

      const project = await newProject.save();

      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

module.exports = router;