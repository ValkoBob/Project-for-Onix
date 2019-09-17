import React, {Component} from 'react';

const FooterView = (props) => {
  return (
      <footer>
        <div className="socials">
          <div className="git">
            <a href={props.gitHub}><i className="fab fa-github"/></a>
          </div>
          <div className="link_to_original">
            <a href={props.linkToOriginal}><i className="far fa-image"/></a>
          </div>
        </div>
        <h2 id="author">
          Author: {props.authorName}
        </h2>
      </footer>
  )
};

export default FooterView;