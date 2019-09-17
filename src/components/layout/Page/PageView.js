import React, {Component} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const PageView = (props) => {
  return (
      <section className="container">
        <div className="first_page">
          <Header />
          <div className="info-text-block" id="project">
            <h1>{props.projectName}</h1>
            <ul>
              <li>history;</li>
              <li>political philosophy;</li>
              <li>programming;</li>
              <li>european soccer;</li>
              <li>like to play computer games.</li>
            </ul>
            <button>Learn more</button>
          </div>
          <Footer />
        </div>
      </section>
  )
};

export default PageView;