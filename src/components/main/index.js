import React, {Component} from "react";


const projectName = 'My hobbies:';

class Main extends Component {
  render() {
    return (
        <div className="info-text-block" id="project">
          <h1>{projectName}</h1>
          <ul>
            <li>history;</li>
            <li>political philosophy;</li>
            <li>programming;</li>
            <li>european soccer;</li>
            <li>like to play computer games.</li>
          </ul>
          <button>Learn more</button>
        </div>
    )
  }
}

export default Main
