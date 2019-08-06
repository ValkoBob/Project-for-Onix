import React, {Component} from "react";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorName: 'Bobyr Valentyn',
      gitHub: 'https://github.com/ValkoBob',
      linkToOriginal: 'https://dribbble.com/shots/6707868-Art-Exhibition'
    };
  }

  render() {
    return (
        <footer>
          <div className="socials">
            <div className="git">
              <a href={this.state.gitHub}><i className="fab fa-github"/></a>
            </div>
            <div className="link_to_original">
              <a href={this.state.linkToOriginal}><i className="far fa-image"/></a>
            </div>
          </div>
          <h2 id="author">
            Author: {this.state.authorName}
          </h2>
        </footer>
    )
  }
}

export default Footer
