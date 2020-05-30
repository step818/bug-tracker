import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addProject } from '../../actions/project';
import { connect } from 'react-redux';

const AddProject = ({ addProject }) => {
  const [text, setText] = useState('');
  const [description, setDesc] = useState('');

  return (
    <div>
        <div>
          <h3>Add a Project</h3>
        </div>
        <form onSubmit={e => {
          e.preventDefault();
          addProject({ text, description });
          setText('');
          setDesc('');
        }}>
          <input 
            name="text" 
            value={text} 
            onChange={e => setText(e.target.value)}
            placeholder="Title your project" 
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
  )
}

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired
};

export default connect(null, { addProject })(AddProject);
