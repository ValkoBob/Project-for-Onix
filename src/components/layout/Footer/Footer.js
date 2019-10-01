import React, { Component } from 'react';
import FooterView from './FooterView';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorName: 'Bobyr Valentyn',
      gitHub: 'https://github.com/ValkoBob',
      linkToOriginal: 'https://dribbble.com/shots/6707868-Art-Exhibition',
    };
  }

  render() {
    const { authorName, gitHub, linkToOriginal } = this.state;
    return (
      <FooterView
        authorName={authorName}
        github={gitHub}
        linkToOriginal={linkToOriginal}
      />
    );
  }
}
