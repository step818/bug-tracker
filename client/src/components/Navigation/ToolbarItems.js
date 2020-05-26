import React, { Fragment } from 'react';
import ToolbarItem from './Item/ToolbarItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const toolbarItems = ({auth: { isAuthenticated, loading }, logout}) => {
  const authLinks = (
    <ul>
      <li><ToolbarItem link="/dashboard" exact>Home</ToolbarItem></li>
      <li><ToolbarItem link="/projects">Projects</ToolbarItem></li>
      <li><ToolbarItem link="/addProject">Add Project</ToolbarItem></li>
      <li><ToolbarItem link="/notifications">Notifications</ToolbarItem></li>
      <li><ToolbarItem link="/account">Account</ToolbarItem></li>
      <li><ToolbarItem link="/profiles">Accomplishers</ToolbarItem></li>
      <li><ToolbarItem link="/addMember">Add Team Member</ToolbarItem></li>
      <li><a onClick={logout} href='#!'>Log Out</a></li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><ToolbarItem link='/login'>Log In</ToolbarItem></li>
      <li><ToolbarItem link='/register'>Register</ToolbarItem></li>
    </ul>
  );

  return (
    <div>
      {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
    </div>
  );
};

toolbarItems.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(toolbarItems);