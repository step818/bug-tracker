const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Project = require('../../models/Projects');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route  Post api/projects
//@desc   Create a project
//@access Private
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
        description: req.body.description,
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

//@route  Get api/projects
//@desc   Get all project
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  Get api/projects/:id
//@desc   Get project by id
//@access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found '});
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found '});
    }
    res.status(500).send('Server Error');
  }
});

//@route  Delete api/projects/:id
//@desc   Delete a project
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found '});
    }

    // Check user
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized '});
    }

    await project.remove();

    res.json({ msg: 'Project removed '});
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found '});
    }
    res.status(500).send('Server Error');
  }
});

//@route  PUT api/projects/like/:id
//@desc   Like a project
//@access Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    // Check if the post has already been liked by a user
    if(project.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Project already liked '});
    }

    project.likes.unshift({ user: req.user.id });

    await project.save();

    res.json(project.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  PUT api/projects/unlike/:id
//@desc   Unlike a project
//@access Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    // Check if the post has already been liked by a user
    if(project.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Project has not yet been liked' });
    }

    // Get remove index
    const removeIndex = project.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    project.likes.splice(removeIndex, 1);

    await project.save();

    res.json(project.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  Post api/projects/comment
//@desc   Comment on a project
//@access Private
router.post(
  '/comment/:id',
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
      const project = await Project.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        points: user.points,
        user: req.user.id
      };

      project.comments.unshift(newComment);

      await project.save();

      res.json(project.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

//@route  Delete api/projects/comment/:id/:comment_id
//@desc   Delete comment from a project
//@access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    // Pull out comment
    const comment = project.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeIndex = project.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    project.comments.splice(removeIndex, 1);

    await project.save();

    res.json(project.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  Post api/projects/goal
//@desc   Post a goal to a project
//@access Private
router.post(
  '/goal/:id',
  [
    auth, 
    [
      check('title', 'Title is required')
      .not()
      .isEmpty(),
      check('priority', 'Priority is required')
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
      const project = await Project.findById(req.params.id);

      const newGoal = {
        title: req.body.title,
        priority: req.body.priority,
        description: req.body.description,
        user: req.user.id
      };

      if (!project) {
        return res.status(404).json({ msg: 'Project not found '});
      }
  
      // Check user of project is creating goal
      if (project.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized to add goals to projects of other users' });
      }

      project.goals.unshift(newGoal);

      await project.save();
      // The line below is the 'payload' we see in the reducer
      res.json(project.goals);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error: Post Goal');
    }
});

//@route  Delete api/projects/goal/:id/:comment_id
//@desc   Delete goal from a project
//@access Private
router.delete('/goal/:id/:goal_id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    // Pull out goal
    const goal = project.goals.find(
      goal => goal.id === req.params.goal_id
    );

    // Make sure goal exists
    if (!goal) {
      return res.status(404).json({ msg: 'Goal does not exist' });
    }

    // Check user
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeIndex = project.goals
      .map(goal => goal.user.toString())
      .indexOf(req.user.id);

    project.goals.splice(removeIndex, 1);

    await project.save();

    res.json(project.goals);
  } catch (err) {
    console.error(err.message + "allo");
    res.status(500).send('Server Error');
  }
});

//@route  PUT api/projects/goal/complete/:id
//@desc   Complete or Uncomplete a Goal
//@access Private
router.put('/goal/done/:id/:goal_id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    // Pull out goal
    const goal = project.goals.find(
      goal => goal.id === req.params.goal_id
    );

    // Make sure goal exists
    if (!goal) {
      return res.status(404).json({ msg: 'Goal does not exist' });
    }

    // Switch DONE status of goal
    if(!goal.done) {
      goal.done = true;
    } else {
      goal.done = false;
    }

    await project.save();

    res.json(project.goals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;