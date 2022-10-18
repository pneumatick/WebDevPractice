import { NavLink } from 'react-router-dom';
import React from 'react';

class DefaultCategories extends React.Component {
    render() {
      return (
        <nav className="main-nav">
          <ul>
            <li><NavLink to="/mountain">Mountain</NavLink></li>
            <li><NavLink to="/beach">Beaches</NavLink></li>
            <li><NavLink to="/bird">Birds</NavLink></li>
            <li><NavLink to="/food">Food</NavLink></li>
          </ul>
        </nav>
      );
    }
}

export default DefaultCategories;