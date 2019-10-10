import React from 'react';
import PropTypes from 'prop-types';
import WithScroll from '../../../../hoc/WithScroll';

const Component = ({ handleScrollToUp, scrollVisibility, color }) => {
  return (
    <div>
      {
        scrollVisibility
        && (
        <button type="button" className="scrollToTop" color={color} onClick={handleScrollToUp}>
          <i className="fas fa-angle-up"> </i>
        </button>
        )
      }
    </div>
  );
};

Component.propTypes = {
  scrollVisibility: PropTypes.bool.isRequired,
  handleScrollToUp: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired
};

const Scroll = WithScroll(Component);

export default Scroll;
