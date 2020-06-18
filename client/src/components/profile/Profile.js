import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../hoc/Layout/Spinner';
import { getProfileById, addFriend } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileGithub from './ProfileGithub';


const Profile = ({ addFriend, getProfileById, profile: { loading, profile }, auth, match}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id])

  return (
    <Fragment>
      {profile===null || loading ? <Spinner/> : 
        <Fragment>
          <div>
            <ProfileTop profile={profile} />
          </div>
          <Link to="/profiles">Back to Profiles</Link>

          {
            auth.isAuthenticated && !auth.loading && 
            auth.user._id !== profile.user._id &&
            <button type='button' onClick={() => addFriend(profile.user._id)}>
              Add Friend
            </button>
          }

          { auth.isAuthenticated && !auth.loading && 
            auth.user._id === profile.user._id && 
            <Link to="/edit-profile">
              Edit Profile
            </Link>
          }

          {profile.githubusername && (
            <ProfileGithub username={profile.githubusername} />
          )}
        </Fragment>}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  addFriend: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById, addFriend })(Profile);
