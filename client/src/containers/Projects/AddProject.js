import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/project';
import { connect } from 'react-redux';

const AddProject = ({ addPost }) => {
  const [text, description, setText] = useState('');

  return (
    <div>
        <div>
          <h3>Add a Project</h3>
        </div>
        <form onSubmit={e => {
          e.preventDefault();
          addPost({ text });
          setText('');
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
            onChange={e => setText(e.target.value)}
            placeholder="Short description">
            </input>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
  )
}

AddProject.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(AddProject);
