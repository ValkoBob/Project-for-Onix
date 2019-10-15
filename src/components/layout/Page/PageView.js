import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ThemeContext } from '../../context/ThemeContext';

const PageView = ({ projectName }) => {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <section className="container" style={{ backgroundColor: theme.background }}>
          <div className="first_page">
            <Header />
            <div className="info-text-block" id="project">
              <h1>{projectName}</h1>
              <ul>
                <li>history;</li>
                <li>political philosophy;</li>
                <li>programming;</li>
                <li>european soccer;</li>
                <li>like to play computer games.</li>
              </ul>
            </div>
            <Footer />
          </div>
        </section>
      )}
    </ThemeContext.Consumer>
  );
};

PageView.propTypes = {
  projectName: PropTypes.string
};

PageView.defaultProps = {
  projectName: ''
};

export default PageView;
