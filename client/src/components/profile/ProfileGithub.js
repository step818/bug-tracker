import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../hoc/Layout/Spinner';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos, loading }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);

  return (
    <div>
      <h2>Github Repos</h2>
      {repos === null || loading ? <Spinner/> : (
        repos.map(repo => (
          <div key={repo.id}>
            <div>
              <h4>
                <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li>
                    Stars: {repo.stargazers_count}
                  </li>
                  <li>
                    Watchers: {repo.watchers_count}
                  </li>
                  <li>
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
          </div>
        ))
      )} 
    </div>
  )
}

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  repos: state.profile.repos,
  loading: state.profile.loading
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
