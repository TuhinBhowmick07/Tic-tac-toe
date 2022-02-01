import React from "react";
import "./App.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      square: Array(9).fill(null),
      turnX: true
    };
  }
  handleClick(i) {
    const newSquare = this.state.square.slice();
    if (winner(newSquare) || newSquare[i] != null) {
      return;
    }
    this.state.turnX ? (newSquare[i] = "X") : (newSquare[i] = "O");
    this.setState({
      square: newSquare,
      turnX: !this.state.turnX
    });
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.square[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  render() {
    let Winner = winner(this.state.square);
    let status;
    if (Winner) {
      status = "winner is : " + Winner;
    } else {
      status = "It is " + (this.state.turnX ? "X" : "O") + "'s turn";
    }
    return (
      <>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </>
    );
  }
}
function winner(square) {
  let list = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < list.length; i++) {
    const [a, b, c] = list[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
export default Game;

