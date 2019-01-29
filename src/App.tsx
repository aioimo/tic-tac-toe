import React, { Component } from 'react';
import './App.css';
import { render } from 'react-dom';


enum Player {
  None = 0,
  One = 1,
  Two = 2
}

interface IState {
  board: Player[]
  activePlayer: Player,
  winningPlayer: Player | null,
  gameOngoing: boolean,
  turnCounter: Number
}

interface IProps {}

class App extends Component<IProps, IState> {

  state = {
    board: [Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None],
    activePlayer: Player.One,
    winningPlayer: null,
    gameOngoing: true,
    turnCounter: 0
  }

  checkWinningPlayer = (board: Player[]) => {
    if (board[0]===board[1] && board[1]===board[2] && board[0]!== Player.None) return board[0]
    if (board[3]===board[4] && board[4]===board[5] && board[3]!== Player.None) return board[3]
    if (board[6]===board[7] && board[7]===board[8] && board[6]!== Player.None) return board[6]
    if (board[0]===board[3] && board[3]===board[6] && board[0]!== Player.None) return board[0]
    if (board[1]===board[4] && board[4]===board[7] && board[1]!== Player.None) return board[1]
    if (board[2]===board[5] && board[5]===board[8] && board[2]!== Player.None) return board[2]
    if (board[0]===board[4] && board[4]===board[8] && board[0]!== Player.None) return board[0]
    if (board[2]===board[4] && board[4]===board[6] && board[2]!== Player.None) return board[2]
    return null
  }

  handleCellClick = (index: number) => {
    const { board, activePlayer, gameOngoing, turnCounter } = this.state
    const newBoard = [...board]
    if (board[index] != Player.None || !gameOngoing) return 
    newBoard[index] = activePlayer
    const winningPlayer = this.checkWinningPlayer(newBoard)
    let isGameOngoing: boolean = gameOngoing
    if (winningPlayer) {
      isGameOngoing = false
    } else if (turnCounter + 1 === 9) {
      isGameOngoing = false
    }
    this.setState({ 
      board: newBoard, 
      activePlayer: 3 - activePlayer, 
      turnCounter: turnCounter + 1,
      winningPlayer,
      gameOngoing: isGameOngoing
    })
  }

  resetGame = () => {
    this.setState({
      board: [Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None],
      activePlayer: Player.One,
      winningPlayer: null,
      gameOngoing: true,
      turnCounter: 0
    })
  }

  renderCell = (index: number) => {
    const { board } = this.state
    return <div className="cell" data-player={board[index]} onClick={()=>this.handleCellClick(index)}></div>
  }

  renderBoard = () => {
    const { board } = this.state
    return (
      <div className="board-container" >
        {board.map((cell, i) => this.renderCell(i))}
      </div>
    ) 
  }

  renderStatus = () => {
    const { gameOngoing, winningPlayer} = this.state
    let statusText: String;
    if (winningPlayer) {
      statusText = `Player ${winningPlayer} won!`
    } else if (gameOngoing) {
      statusText = `The game is in progress.`
    } else {
      statusText = `The game is a draw.`
    }

    return (
      <div className="status-box">
        { `Player 1 is blue` } <br/>
        { `Player 2 is red` } <br/>
        {statusText} <br/>
        {!gameOngoing && <button className="reset" onClick={this.resetGame}>Reset</button>}
      </div>
    ) 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2> Tic Tac Toe </h2>
          {this.renderBoard()}
          {this.renderStatus()}
        </header>
      </div>
    );
  }
}

export default App;
