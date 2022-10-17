import './App.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <Form.Control placeholder="Search..." onChange={this.handleChange} />
        <Button disabled={!this.state.value}>Search</Button>
      </InputGroup>
    );
  }
}

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

class ImageArea extends React.Component {
  render() {
    return <h1>No Images</h1>
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <h1>Picture This</h1>
          <SearchBar />
          <DefaultCategories />
          <ImageArea />
        </Container>
      </header>
    </div>
  );
}

export default App;
