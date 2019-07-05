import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function HelloWorld() {
    return (
    <section className="container">
        <div className="first_page">
            <header>
                <a className="logo">Logo</a>
                <nav className="menu">
                    <a href="#">Project</a>
                    <a href="#">About</a>
                    <a href="#">Author</a>
                </nav>
            </header>
            <div className="info-text-block" id="project">
                <h1>Project for Onix</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, quod!</p>
                <button>Learn more</button>
            </div>
            <footer>
                <div className="socials">
                    <div className="git">
                        <a href="https://github.com/ValkoBob"><i className="fab fa-github"/></a>
                    </div>
                    <div className="link_to_original">
                        <a href="https://dribbble.com/shots/6707868-Art-Exhibition"><i className="far fa-image"/></a>
                    </div>
                </div>
                <h2 id="author">
                    Author: Bobyr Valentyn
                </h2>
            </footer>
        </div>
    </section>
    )
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'));
