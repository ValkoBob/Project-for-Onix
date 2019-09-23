import React from 'react';
import PropTypes from 'prop-types';

const HeaderView = ({ logo, menu }) => {
  return (
    <header>
      <a className="logo">{logo}</a>
      <nav className="menu">
        {menu.map((menuItem) =>
          <a href="#">{menuItem}</a>
        )}
      </nav>
    </header>
  );
};

HeaderView.propTypes = {
  logo: PropTypes.string,
  menu: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.string
    ))
};

HeaderView.defaultProps = {
  projectName: ''
};

export default HeaderView;
