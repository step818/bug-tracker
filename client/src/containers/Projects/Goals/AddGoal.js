import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addGoal } from '../../../actions/project';
import { addPoints } from '../../../actions/auth';
import { connect } from 'react-redux';

const AddGoal = ({ projId, addGoal, auth:{ user }, addPoints }) => {
  const [title, setTitle] = useState('');
  const [priority, setPrio] = useState('');
  const [description, setDesc] = useState('');

  const newGoalReward = 1;

  return (
    <div>
      <div>
          <h3>Add a Goal</h3>
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                addPoints(user._id, newGoalReward);
                addGoal( projId, { title, priority, description });
                setTitle(''); setPrio(''); setDesc('');
              }}>
                <input 
                  name="title" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Title your goal" 
                  required >
                </input>
                <input
                  name="priority"
                  value={priority}
                  onChange={e => setPrio(e.target.value)}
                  placeholder="Rate the priority: 1 - 10"
                  required >
                </input>
                <input
                  name="description"
                  value={description}
                  onChange={e => setDesc(e.target.value)}
                  placeholder="Write a short description">
                </input>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
    </div>
  )
}

AddGoal.propTypes = {
  addGoal: PropTypes.func.isRequired,
  projId: PropTypes.string.isRequired,
  addPoints: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect( mapStateToProps, { addGoal, addPoints })(AddGoal);
