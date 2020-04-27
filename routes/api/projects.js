const express = require('express');
const router = express.Router();

//@route Get api/projects
//@desc Test route
//@access Public
router.get('/', (req, res) => res.send('Projects route'));

module.exports = router;