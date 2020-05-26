import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './ToolbarItem.module.css';

const toolbarItem = (props) => (
  <div>
    <NavLink to={props.link} path={props.exact} activeClassName={classes.active} >
      {props.children}
    </NavLink>
  </div>
);

export default toolbarItem;