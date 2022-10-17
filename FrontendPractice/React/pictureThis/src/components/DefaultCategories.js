import Button from 'react-bootstrap/Button';
import React from 'react';

class DefaultCategories extends React.Component {
    render() {
      return (
        <div className="default-categories">
          <Button className="default-button">Mountain</Button>
          <Button className="default-button">Beach</Button>
          <Button className="default-button">Bird</Button>
          <Button className="default-button">Food</Button>
        </div>
      );
    }
}

export default DefaultCategories;