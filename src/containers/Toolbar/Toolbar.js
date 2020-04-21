import React from 'react';
import classes from './Toolbar.module.css';
import ToolbarItems from '../../components/Navigation/ToolbarItems'

const toolbar = (props) => {
  return(
    <header className={classes.Toolbar}>
      <nav>
        <ToolbarItems />
      </nav>
    </header>
  );
}

export default toolbar;