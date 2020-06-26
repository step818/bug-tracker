import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles, getCurrentProfile } from '../../actions/profile';
import Spinner from '../../hoc/Layout/Spinner';
import ProfileItem from '../profiles/ProfileItem';

const Friends = ({ getCurrentProfile, getProfiles, profile: { loading, profile, profiles }}) => {
  useEffect(() => {
    getCurrentProfile();
    getProfiles();
  }, [getCurrentProfile, getProfiles]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <p>List of requests if there are any with addd friend button</p>
      {
        // I need to map out both, profiles, and the requests from the profile to check if the ids are equal,
        // then display the profile that matches
      }
      {profile.requests.length > 0 ? ( 
        profile.requests.map(request => (<p key={request._id}>{request.profile}</p>)) ) : (<p>No requests</p>)}
      
      {/* <p>list of confirmed friends if there are any</p>
      {profile.friends.length > 0 ? ( profile.friends.map(friend => (friend.user)) ) : ( <p>No friends</p>)} */}
    </Fragment>
  )
}

Friends.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, getProfiles })(Friends);
