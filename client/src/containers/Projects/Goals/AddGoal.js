import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addGoal } from '../../../actions/project';
import { connect } from 'react-redux';

const AddGoal = ({ projId, addGoal }) => {
  const [title, setTitle] = useState('');
  const [priority, setPrio] = useState('');
  const [description, setDesc] = useState('');
  const [status, setStat] = useState('');

  return (
    <div>
      <div>
          <h3>Add a Goal</h3>
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                addGoal( projId, { title, priority, description, status });
                setTitle(''); setPrio(''); setDesc(''); setStat('');
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
                <input 
                  name="status" 
                  value={status} 
                  onChange={e => setStat(e.target.value)}
                  placeholder="What's the status? ex: Open, In progress, Finished" 
                  >
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
  projId: PropTypes.string.isRequired
};

export default connect( null, { addGoal })(AddGoal);
