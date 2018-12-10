import React from "react";
import Board from "./Board";
import calculateWinner from "./calculateWinner";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (winner === false) {
      status = "Match nul";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    let move = this.state.stepNumber;
    return (
      <div>
        <button
          onClick={() => {
            if (move - 1 >= 0) this.jumpTo(move - 1);
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            if (move + 1 < this.state.history.length) this.jumpTo(move + 1);
          }}
        >
          Next
        </button>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button
              onClick={() =>
                this.setState({
                  history: [
                    {
                      squares: Array(9).fill(null)
                    }
                  ],
                  stepNumber: 0,
                  xIsNext: true
                })
              }
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
