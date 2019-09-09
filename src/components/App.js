import React, {Fragment} from 'react'
import Header from './header'
import Main from './main'
import Footer from './footer'
import Bio from './biography'
import Forecast from './forecast'
import '../assets/css/index.css';

export default function App() {
  return (
      <Fragment>
        <section className="container">
          <div className="first_page">
            <Header/>
            <Main/>
            <Footer/>
          </div>
        </section>
        <Bio/>
        <Forecast/>
      </Fragment>
  )
}