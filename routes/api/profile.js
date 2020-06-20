const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
// const { default: profile } = require('../../client/src/reducers/profile');

//@route   Get api/profile/me
//@desc    Get current users profile
//@access  Private
router.get('/me', auth, async (req, res) => {
  try{
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['firstName', 'lastName', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch(err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});
  
//@route   Post api/profile
//@desc    Create or update user profile
//@access  Private
router.post(
  '/', 
  [
    auth, 
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required.')
        .not()
        .isEmpty()
    ]
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    //Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if(profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileFields},
          {new: true}
        );

        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route   Get api/profile
//@desc    Get all profiles
//@access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['firstName', 'lastName', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route   Get api/profile/user/:user_id
//@desc    Get profile by user ID
//@access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ 
      user: req.params.user_id 
    }).populate('user', ['firstName', 'lastName', 'avatar', 'points']);
    
    if(!profile) return res.status(400).json({ msg: 'Profile not found' });
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route   Delete api/profile
//@desc    Delete profile, user & posts
//@access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // @todo = remove users projects

    // Remove profile
    await Profile.findOneAndRemove({ user : req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id : req.user.id });

    res.json({ msg: 'User and profile removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route   Get api/profile/github/:username
//@desc    Get user repos from Github
//@access  Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if(error) console.error(error);

      if(response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  PUT api/profile/friend/:id
//@desc   Add a friend
//@access Private
router.put('/friend/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Check if the profile has already been added by the user
    if(profile.friends.filter(friend => friend.user.toString() === req.params.id).length > 0) {
      return res.status(400).json({ msg: 'Profile already added '});
    }
    // Add friend
    profile.friends.unshift({ user: req.params.id });

    await profile.save();

    res.json(profile.friends);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  PUT api/profile//friendRequest/:id
//@desc   Send a friend request
//@access Private
router.put('/friendRequest/:id', auth, async (req, res) => {
  try {
    // Find the profile that I want to send a request to
    const friendProfile = await Profile.findOne({ user: req.params.id });
    

    //If user hasn't created a profile, then we get a Server error!!!
    // But the button won't appear unless you have a profile, so the front end
    // prevents the error from occuring.

    // Check if the profile has already been added by the user
    // if(friendProfile.requests) {
    //   if(friendProfile.requests.filter(request => request.user.toString() === req.user._id)) {
    //     return res.status(400).json({ msg: 'Profile already requested '});
    //   }
    // }
    
    // Check if the user is trying to request themself
    if(req.params.id === req.user.id) {
      return res.status(400).json({ msg: 'Cannot befriend yourself '});
    }

    //Send request (my id) to that profile
    friendProfile.requests.unshift({ user: req.user.id });

    await friendProfile.save();

    res.json(friendProfile.requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;