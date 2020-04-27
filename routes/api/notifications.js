const express = require('express');
const router = express.Router();

//@route Get api/notification
//@desc Test route
//@access Public
router.get('/', (req, res) => res.send('Notification route'));

module.exports = router;