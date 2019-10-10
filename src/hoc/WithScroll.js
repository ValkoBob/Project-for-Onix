import React from 'react';
import PropTypes from 'prop-types';

const WithScroll = (Component) => {
  class Scroll extends React.Component {
    render() {
      const { handleScrollToUp, scrollVisibility } = this.props;
      const newColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i += 1) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
      return (
        <Component
          color={newColor}
          handleScrollToUp={handleScrollToUp}
          scrollVisibility={scrollVisibility}
        />
      );
    }
  }
  Scroll.propTypes = {
    scrollVisibility: PropTypes.bool.isRequired,
    handleScrollToUp: PropTypes.func.isRequired,
  };
  return Scroll;
};

export default WithScroll;
