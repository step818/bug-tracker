import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../../hoc/Layout/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = ({ auth, getCurrentProfile, profile }) => { 
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return profile.loading && profile.profile === null ? (
    <Spinner /> 
  ) : (
    <Fragment>
      <h1>Dashboard</h1>
      <p>Welcome {auth.user && auth.user.firstName}</p>
      {profile.profile !== null ? (
        <Fragment>
          <DashboardActions/>
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
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);