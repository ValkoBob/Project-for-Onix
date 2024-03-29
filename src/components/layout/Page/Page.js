import React, { Component } from 'react';
import PageView from './PageView';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: 'My hobbies'
    };
  }

  render() {
    const { projectName } = this.state;
    return (
      <PageView
        projectName={projectName}
      />
    );
  }
}
