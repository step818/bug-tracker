import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../hoc/Layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ getProfiles, profile: { profiles, loading }}) => {
  useEffect(() => {
    getProfiles();
  }, []);

  return <Fragment>
    { loading ? <Spinner /> : <Fragment>
      <h1>Profiles</h1>
      <p>
        Browse and connect with developers
      </p>
      <div>
        {profiles.length > 0 ? (
          profiles.map(profile => (
            <ProfileItem key={profile.id} profile={profile} />
          ))
        ) : <h4>No profiles found.</h4>}
      </div>
      </Fragment>}
  </Fragment>
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);