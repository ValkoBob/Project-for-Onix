import React, {Component} from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Page from './components/layout/Page/Page';
import Home from './components/pages/Home/Home';
import './scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
  }

  render() {
    return (
        <Router history={this.history}>
          <Route exact strict path="/" component={Page} />
          <Route exact strict path="/" component={Home} />
        </Router>
    );
  }
}

export default App;