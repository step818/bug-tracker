import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/project';

const CommentForm = ({ projId, addComment }) => {
  const [text, setText] = useState('');

  // setText is prebuilt, no need to build it here.

  return (
    <div>
      <h3>Comments welcomed!</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          addComment( projId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Leave a comment'
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <input type='submit' value='Submit' />
      </form>
      
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func
};

export default connect( null, { addComment })(CommentForm);
