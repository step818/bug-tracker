import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../../hoc/Layout/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = ({ auth, getCurrentProfile, deleteAccount, profile: { profile, loading } }) => { 
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner /> 
  ) : (
    <Fragment>
      <h1>Dashboard</h1>
      <img
        class="round-img my-1"
        src={auth.user.avatar}
        alt=""
      />
      <p>Welcome {auth.user && auth.user.firstName}</p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions/>
          <h3>Bio</h3>
          <p>{profile.bio}</p>
          <h3>Company</h3>
          <p>{profile.company}</p>
          <h3>Skills</h3>
          <p>{profile.skills.map(skill => (
            <p>
              {skill}</p>
          ))}</p>
          <div>
            <button onClick={() => deleteAccount()}>
              <i>Delete My Account</i>
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
            <p>You have not yet set up a profile, please add some info.</p>
            <Link to='/create-profile'>Create Profile</Link>
            <div>
              <button onClick={() => deleteAccount()}>
                <i>Delete My Account</i>
              </button>
            </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount:PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);