import React, {Component} from 'react';

const HeaderView = (props) => {
  return (
      <header>
        <a className="logo">{props.logo}</a>
        <nav className="menu">
          {props.menu.map( (menuItem) =>
            <a href="#">{menuItem}</a>
          )}
        </nav>
      </header>
  )
};

export default HeaderView;