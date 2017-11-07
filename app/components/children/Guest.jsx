import React from 'react';
import { Link } from 'react-router-dom';

class Guest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videogames: 'false',
      fantasy: 'false',
      scifi: 'false',
      programming: 'false'
    }
  }

  render () {
    return(
      <div>
        <ul>
          <li><Link to="/dashboard/guest/videogames">Video Games</Link></li>
          <li><Link to="/dashboard/guest/fantasy">Fantasy</Link></li>
          <li><Link to="/dashboard/guest/scifi">Sci-Fi</Link></li>
          <li><Link to="/dashboard/guest/programming">Programming</Link></li>
        </ul>
      </div>
    )};
}

export default Guest;
