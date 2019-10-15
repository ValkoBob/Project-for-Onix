import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Page from './components/layout/Page/Page';
import Home from './components/pages/Home/Home';
import { ThemeContext, themes } from './components/context/ThemeContext';
import './scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
    this.state = {
      theme: themes.light,
    };
  }

  toggleTheme = () => {
    let { theme } = this.state;
    theme = theme === themes.light
      ? themes.dark
      : themes.light;
    this.setState({
      theme
    });
  };

  render() {
    const { theme } = this.state;
    return (
      <Router history={this.history}>
        <ThemeContext.Provider value={{
          theme,
          toggleTheme: this.toggleTheme
        }}
        >
          <Page />
          <Switch>
            <Route exact strict path="/" component={Home} />
          </Switch>
        </ThemeContext.Provider>
      </Router>
    );
  }
}

export default App;
