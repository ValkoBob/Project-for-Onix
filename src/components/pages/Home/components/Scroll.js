import React from 'react';
import PropTypes from 'prop-types';

const Scroll = ({ handleScrollToUp, scrollVisibility }) => {
  return (
    <div>
      {
        scrollVisibility
        && (
        <button type="button" className="scrollToTop" onClick={handleScrollToUp}>
          <i className="fas fa-angle-up"> </i>
        </button>
        )
      }
    </div>
  );
};

Scroll.propTypes = {
  scrollVisibility: PropTypes.bool.isRequired,
  handleScrollToUp: PropTypes.func.isRequired
};
export default Scroll;
