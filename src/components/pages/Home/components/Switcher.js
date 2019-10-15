import React from 'react';
import { ThemeContext } from '../../../context/ThemeContext';

const Switcher = () => {
  return (
    <ThemeContext.Consumer>
      {({ toggleTheme }) => (
        <div className="switcher">
          <button onClick={toggleTheme} className="btn-switcher" type="button">
            <i className="far fa-moon" />
          </button>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

export default Switcher;
