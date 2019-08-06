import React, {Component} from 'react'

class Header extends Component {
  render() {
    return (
        <header>
          <a className="logo">Logo</a>
          <nav className="menu">
            <a href="#">Project</a>
            <a href="#">About</a>
            <a href="#">Author</a>
          </nav>
        </header>
    )
  }
}

export default Header