import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    return ( 
      <Square
          key={i} 
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}    
      />
    );
  }

  createTable() {
    let divs = [];
    /* Create three divs */
    for (let i = 0; i < 3; i++) {
      divs.push(<div key={i} className="board-row">
        {/* Create three squares per div */}
        {(() => {
          let squares = [];
          for (let j = 0; j < 3; j++) {
            squares.push(this.renderSquare(3 * i + j));
          }
          return squares;
        })()}
      </div>);
    }
    return divs;
  }

  render() {
    return (
      <div>
        {this.createTable()}
      </div>
    );
  }
}
  
class Game extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          history: [{
              squares: Array(9).fill(null),
              prevMoves: []
          }],
          stepNumber: 0,
          xIsNext: true,
      };
  }

  handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const prevMoves = current.prevMoves.slice();
      if (calculateWinner(squares) || squares[i]) {
          return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      prevMoves.push(`(${Math.floor(i / 3)}, ${i % 3})`);
      console.log(prevMoves)
      this.setState({
          history: history.concat([{
              squares: squares,
              prevMoves: prevMoves
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext
      });
  }

  jumpTo(e, step) {
      this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0
      });
  }

  render() {
      const history = this.state.history;
      const prevMoves = history[history.length - 1].prevMoves;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
          const desc = move ?
              `Go to move #${move} ${prevMoves[move-1]}` :
              'Go to game start';
          return (
              <li key={move}>
                  <button 
                    onClick={(e) => this.jumpTo(e, move)}
                    style={{
                      fontWeight: this.state.stepNumber === move ? 'bold' : 'normal'
                    }}
                  >
                    {desc}
                  </button>
              </li>
          );
      });

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      }
      else  if (!winner && this.state.stepNumber >= 9) {
        status = 'Draw';
      }
      else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  