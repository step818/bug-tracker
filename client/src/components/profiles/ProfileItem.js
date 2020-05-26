import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const ProfileItem = ({
  profile: {
    user: { _id, firstName, lastName, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return <div>
    <img src={avatar} alt="avatar"/>
    <div>
      <h2>{firstName + " " + lastName}</h2>
      <p>{status} {company && <span> at {company}</span>}</p>
      <p>{location && <span>{location}</span>}</p>
      <Link to={`profile/${_id}`}>
        View Profile
      </Link>
    </div>
    <ul>
      {skills.slice(0,4).map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  </div>;
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
