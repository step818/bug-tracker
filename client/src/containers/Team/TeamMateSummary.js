import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// * pass teammate .user .id. User is from project's user

const TeamMateSummary = ({ auth, mate: { _id, firstName, lastName, role, user, avatar } }) => {
  return (
    <div>
      <p>--------------------</p>
      <p>{avatar}</p>
      <p>{firstName} {lastName}</p>
      <p>{role}</p>
      <Link to={`/profile/${user}`}>
        View Profile
      </Link>
      <p>--------------------</p>
    </div>
  )
}

TeamMateSummary.propTypes = {
  mate: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { })(TeamMateSummary);
