import React, { Component } from 'react';

class AddProject extends Component {
  render(){
    return(
      <div>
        <h4>Create New Goal</h4>
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input type="text" id="title" onChange={this.handleChange} required={true} />
          <label>Description</label>
          <input type="text" id="description" onChange={this.handleChange} />
        </form>
      </div>
    );
  }
};

export default AddProject;