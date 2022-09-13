import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class TextBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <form className='task-form' onSubmit={(e) => this.props.onSubmit(e, this.state.value)}>
        <input 
          className='input-field' 
          type='text' 
          placeholder='Write your task here...'
          onChange={this.handleChange}
          >
          </input>
        <button className='submit-button'>Create</button>
      </form>
    );
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  handleSubmit(e, value) {
    e.preventDefault();
    console.log(value);
  }

  render() {
    return (
      <div>
        <TextBar onSubmit={this.handleSubmit} />
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
      </div>
    );
  };
}

class Page extends React.Component {
  render() {
    return (
      <div className='page'>
        <List />
      </div>
    );
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Page />);