import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles, removeRequest } from '../../actions/profile';

const RequestItem = ({ userID, getProfiles, removeRequest, profile: {profiles} }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

      return(<Fragment>
          <h2>Request</h2>
          {/* <img src={avatar} alt="avatar"/> */}
            {/* <h2>{firstName + " " + lastName}</h2>
            <p>{status} {company && <span> at {company}</span>}</p>
            <p>{location && <span>{location}</span>}</p> */}
          <div>
            {profiles.map( prof => {
              if (prof.user._id === userID) {
                return(<div key={prof._id}>
                  <img src={prof.user.avatar} alt="avatar"/>
                  <h2>{prof.user.firstName + ' ' + prof.user.lastName}</h2>
                  <Link to={`profile/user/${userID}`}>
                    View Profile
                  </Link>
                  <button type='button' onClick={e => removeRequest(userID)}>
                    Remove request
                  </button>
                </div>)
              } else {
                return null;
              }
            })}
          </div>
          {/* <ul>
            {skills.slice(0,4).map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul> */}
        </Fragment>);
};

RequestItem.propTypes = {
  removeRequest: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles, removeRequest })(RequestItem);