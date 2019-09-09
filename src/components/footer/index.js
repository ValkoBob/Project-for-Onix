import React from "react";

export default function Footer() {
  const about = {
    authorName: 'Bobyr Valentyn',
    gitHub: 'https://github.com/ValkoBob',
    linkToOriginal: 'https://dribbble.com/shots/6707868-Art-Exhibition'
  };

  return (
      <footer>
        <div className="socials">
          <div className="git">
            <a href={about.gitHub}><i className="fab fa-github"/></a>
          </div>
          <div className="link_to_original">
            <a href={about.linkToOriginal}><i className="far fa-image"/></a>
          </div>
        </div>
        <h2 id="author">
          Author: {about.authorName}
        </h2>
      </footer>
  )
}
