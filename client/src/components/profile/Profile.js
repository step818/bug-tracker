import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../hoc/Layout/Spinner';
import { getProfileById, addFriend, sendRequest } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileGithub from './ProfileGithub';
import classes from './Profile.module.css';


const Profile = ({ sendRequest, addFriend, getProfileById, profile: { loading, profile }, auth, match}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id])

  return (
    <Fragment>
      <div className={classes.Profile}>
        {profile===null || loading ? <Spinner/> : 
          <Fragment>
            <div>
              <ProfileTop profile={profile} />
            </div>
            <Link to="/profiles">Back to Profiles</Link>

            {
              auth.isAuthenticated && !auth.loading && 
              auth.user._id !== profile.user._id &&
              <button type='button' onClick={() => sendRequest(profile.user._id)}>
                Send Friend Request
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
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  addFriend: PropTypes.func.isRequired,
  sendRequest: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById, addFriend, sendRequest })(Profile);
