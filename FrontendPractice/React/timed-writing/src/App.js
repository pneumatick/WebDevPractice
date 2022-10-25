import './App.css';
import React from 'react';
import TimerContainer from './components/TimerContainer';
import Notepad from './components/Notepad';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      text: ''
    };

    this.toggleWriting = this.toggleWriting.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.presentOutcome = this.presentOutcome.bind(this);
  }

  // Start the timer and let the user write
  toggleWriting() {
    let newState = this.state.disabled ? false : true;
    this.setState({ disabled: newState });
  }

  // Store the user's text input
  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  // Show the user the result of their writing
  presentOutcome() {
    alert(this.state.text);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TimerContainer
            disabled={this.state.disabled}
            toggleWriting={this.toggleWriting}
            presentOutcome={this.presentOutcome}
          />
          <Notepad 
            disabled={this.state.disabled} 
            onChange={this.handleChange} 
          />
        </header>
      </div>
    );
  }
}

export default App;
