import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../../hoc/Layout/Spinner';

const Friends = ({ getCurrentProfile, profile: { loading, profile }}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <p>List of requests if there are any with addd friend button</p>
      {profile.requests.length > 0 ? ( profile.requests.map(request => (request.user)) ) : (<p>No requests</p>)}
      <p>list of confirmed friends if there are any</p>
      {profile.friends.length > 0 ? ( profile.friends.map(friend => (friend.user)) ) : ( <p>No friends</p>)}
    </Fragment>
  )
}

Friends.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Friends);
