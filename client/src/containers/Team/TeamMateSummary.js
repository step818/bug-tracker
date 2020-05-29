import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const TeamMateSummary = ({ auth, mate: { _id, firstName, lastName, role, user } }) => {
  return (
    <div>
      <p>--------------------</p>
      <p>{firstName} {lastName}</p>
      <p>{role}</p>
      <Link to={`/profile/${user}`}>
        View profile
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

export default connect(mapStateToProps, {})(TeamMateSummary);
