import React from 'react';
import PropTypes from 'prop-types';

const HeaderView = ({ logo, menu }) => {
  return (
    <header>
      <a href="/#" className="logo">{logo}</a>
      <nav className="menu">
        {menu.map((menuItem) => <a key={menuItem.id} href="/#">{menuItem}</a>)}
      </nav>
    </header>
  );
};

HeaderView.propTypes = {
  logo: PropTypes.string,
  menu: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.object
    )
  ).isRequired
};

HeaderView.defaultProps = {
  logo: 'logo'
};

export default HeaderView;
