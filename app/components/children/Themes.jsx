import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header.jsx';


class Themes extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return(
      <div>
        <Header />
        <section className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <ul className="list-group" id="theme-list">
                <Link to="/videogames"><li className="list-group-item">Video Games</li></Link>
                <Link to="/fantasy"><li className="list-group-item">Fantasy</li></Link>
                <Link to="/scifi"><li className="list-group-item">Sci-Fi</li></Link>
              </ul>
            </div>
          </div>
        </section>
      </div>
    )};
}

export default Themes;
