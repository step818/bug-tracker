import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../hoc/Layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';


const Profile = ({ getProfileById, profile: { loading, profile }, auth, match}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById])

  return (
    <Fragment>
      {profile===null || loading ? <Spinner/> : 
        <Fragment>
          {profile.location}
          {profile.company}
          <Link to="/profiles">Back to Profiles</Link>
          {auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id && <Link to="/edit-profile">Edit Profile</Link>}
        </Fragment>}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
