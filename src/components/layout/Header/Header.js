import React, { useState } from 'react';
import HeaderView from './HeaderView';

const Header = () => {
  const [logo] = useState('Logo');
  const [menu] = useState([
    'Project',
    'About',
    'Author'
  ]);
  return (
    <HeaderView
      logo={logo}
      menu={menu}
    />
  );
};

export default Header;
