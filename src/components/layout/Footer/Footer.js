import React from 'react';
import FooterView from './FooterView';

const Header = () => {
  const authorName = 'Bobyr Valentyn';
  const gitHub = 'https://github.com/ValkoBob';
  const linkToOriginal = 'https://dribbble.com/shots/6707868-Art-Exhibition';
  return (
    <FooterView
      authorName={authorName}
      github={gitHub}
      linkToOriginal={linkToOriginal}
    />
  );
};

export default Header;
