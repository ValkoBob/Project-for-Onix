import React, { Component } from 'react';
import HeaderView from './HeaderView';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: 'Logo',
      menu: [
        'Project',
        'About',
        'Author'
      ]
    };
  }

  render() {
    const { logo, menu } = this.state;
    return (
      <HeaderView
        logo={logo}
        menu={menu}
      />
    );
  }
}
