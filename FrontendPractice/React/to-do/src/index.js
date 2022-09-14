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
      <form 
        className='task-form' 
        onSubmit={(e) => this.props.onSubmit(e, this.state.value)}
      >
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

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false
    }

    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete() {
    this.setState((prevState) => {
        return {
          completed: !this.state.completed
        };
      }
    );
  }

  render() {
    return (
      <li
        style={{color: this.state.completed ? 'green' : 'black'}}
      >
        {this.props.task}
        <button
          onClick={this.handleComplete}
        >
          Done
        </button>
        <button 
          onClick={() => this.props.deleteItem(this.props.id)}
        >
          Delete
        </button>
      </li>
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

  deleteItem(id) {
    let tasks = this.state.tasks.slice();
    tasks.splice(id, 1);
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
        <ListItem 
          key={index} 
          id={index} 
          task={task} 
          deleteItem={(id) => this.deleteItem(id)} 
        />
      );
    });


    return (
      <div className='list-div'>
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
        <h1>React To-Do List</h1>
        <List />
      </div>
    );
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Page />);