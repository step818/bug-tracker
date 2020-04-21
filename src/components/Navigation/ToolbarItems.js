import React from 'react';
import ToolbarItem from './Item/ToolbarItem';

const toolbarItems = () => {
  return(
    <ul>
      <li><ToolbarItem link="/" exact>Home</ToolbarItem></li>
      <li><ToolbarItem link="/projects">Projects</ToolbarItem></li>
      <li>Add Project</li>
      <li>Notifications</li>
      <li>Account</li>
      <li>Team</li>
      <li>Add Team Member</li>
    </ul>
  );
}

export default toolbarItems;