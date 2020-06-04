import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../../hoc/Layout/Spinner';
import DashboardActions from './DashboardActions';
import ProfileTop from '../../components/profile/ProfileTop';

const Dashboard = ({ auth, getCurrentProfile, deleteAccount, profile: { profile, loading } }) => { 
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner /> 
  ) : (
    <Fragment>
      <h1>Dashboard</h1>
      <h3>Welcome {auth.user.firstName}</h3>
      <p>Pebbles: {auth.user.points}</p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions/>
          <ProfileTop profile={profile} />
        </Fragment>
      ) : (
        <Fragment>
            <p>You have not yet set up a profile, please add some info.</p>
            <Link to='/create-profile'>Create Profile</Link>
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