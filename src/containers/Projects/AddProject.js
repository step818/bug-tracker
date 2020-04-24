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
          <label>Team Members</label>
          <select id="memberName">
            <option value="Will">Will Dewitt</option>
            <option value="John">John Doe</option>
            <option value="Lee">Lee Deedah</option>
          </select>
          Assign roles for each member.
          for each member, have a roles input.
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
};

export default AddProject;