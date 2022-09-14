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
          className='text-field' 
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleSubmit(e, value) {
    let tasks = this.state.tasks.slice();

    this.setState((prevState) => {
      return {
        tasks: tasks.concat(value)
      }
    });

    e.target.reset();
    e.preventDefault();
  }

  deleteItem(e) {
    let itemIndex = e.target.parentElement.id;
    let tasks = this.state.tasks.slice();
    tasks.splice(itemIndex, 1);
    this.setState((prevState) => {
      return {
        tasks: tasks.concat()
      }
    });
  }

  render() {
    let tasks = this.state.tasks.slice();

    let listItems = tasks.map((task, index) => {
      return (
        <li key={index} id={index}>
          {task}
          <button onClick={this.deleteItem}>Delete</button>
        </li>
      );
    });


    return (
      <div>
        <TextBar onSubmit={this.handleSubmit} />
        <ul>
          {listItems}
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