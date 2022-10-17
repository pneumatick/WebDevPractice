import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
      this.setState({value: e.target.value});
    }
  
    render() {
      return (
        <InputGroup className="search-bar">
          <Form.Control placeholder="Search..." onChange={this.handleChange}/>
          <Button disabled={!this.state.value}>Search</Button>
        </InputGroup>
      );
    }
}

export default SearchBar;