import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    social,
    user: { firstName, lastName, avatar }
  }
}) => {
  return (
    <div>
      <img
        src={avatar}
        alt=""
      />
      <h1>{firstName} {lastName}</h1>
      <p>Status: {status} {company && <span>at {company}</span>}</p>
      <p>{location && <span>Location: {location}</span>}</p>
      <div>
        {social && social.twitter && (
              <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                <i>((tw))</i>
              </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i>((fb))</i>
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i>((linkedIn))</i>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i>((youTube))</i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i>((ig))</i>
          </a>
        )}
      </div>
    </div>
  )
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileTop;
