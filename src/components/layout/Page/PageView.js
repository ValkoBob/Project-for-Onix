import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const PageView = ({ projectName }) => {
  return (
    <section className="container">
      <div className="first_page">
        <Header/>
        <div className="info-text-block" id="project">
          <h1>{projectName}</h1>
          <ul>
            <li>history;</li>
            <li>political philosophy;</li>
            <li>programming;</li>
            <li>european soccer;</li>
            <li>like to play computer games.</li>
          </ul>
          <button type="button">Learn more</button>
        </div>
        <Footer/>
      </div>
    </section>
  );
};

PageView.propTypes = {
  projectName: PropTypes.string
};

PageView.defaultProps = {
  projectName: ''
};

export default PageView;
