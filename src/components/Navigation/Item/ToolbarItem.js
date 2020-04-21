import React from 'react';
import { NavLink } from 'react-router-dom';

const toolbarItem = (props) => (
  <div>
    <NavLink to={props.link} path={props.exact} >
      {props.children}
    </NavLink>
  </div>
);

export default toolbarItem;