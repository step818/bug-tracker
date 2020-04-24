import React from 'react';
import ToolbarItem from './Item/ToolbarItem';
import classes from './ToolbarItems.module.css';

const toolbarItems = () => {
  return(
    <ul className={classes.ToolbarItems}>
      <li><ToolbarItem link="/" exact>Home</ToolbarItem></li>
      <li><ToolbarItem link="/projects">Projects</ToolbarItem></li>
      <li><ToolbarItem link="/addProject">Add Project</ToolbarItem></li>
      <li><ToolbarItem link="/notifications">Notifications</ToolbarItem></li>
      <li><ToolbarItem link="/account">Account</ToolbarItem></li>
      <li><ToolbarItem link="/team">Team</ToolbarItem></li>
      <li><ToolbarItem link="/addMember">Add Team Member</ToolbarItem></li>
    </ul>
  );
}

export default toolbarItems;