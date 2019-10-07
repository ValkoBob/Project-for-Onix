import React from 'react';
import PropTypes from 'prop-types';

const FooterView = ({
  gitHub,
  linkToOriginal,
  authorName 
}) => {
  return (
    <footer>
      <div className="socials">
        <div className="git">
          <a href={gitHub} aria-label="Save"><i className="fab fa-github" /></a>
        </div>
        <div className="link_to_original">
          <a href={linkToOriginal} aria-label="Save"><i className="far fa-image" /></a>
        </div>
      </div>
      <h2 id="author">
        Author:
        {' '}
        {authorName}
      </h2>
    </footer>
  );
};

FooterView.propTypes = {
  gitHub: PropTypes.string,
  linkToOriginal: PropTypes.string,
  authorName: PropTypes.string,
};

FooterView.defaultProps = {
  gitHub: 'https://github.com',
  linkToOriginal: 'https://dribbble.com',
  authorName: 'Some Name',
};

export default FooterView;
