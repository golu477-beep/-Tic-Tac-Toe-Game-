import React, { useState } from 'react'
import "./CheckBox.css"

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const calculateWinner = (squares) => {
  for (const [a, b, c] of winningLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return

    const nextBoard = board.slice()
    nextBoard[index] = xIsNext ? 'X' : 'O'
    setBoard(nextBoard)
    setXIsNext(!xIsNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
  }

  const winner = calculateWinner(board)
  const isDraw = !winner && board.every(Boolean)
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? 'Draw'
    : `Next player: ${xIsNext ? 'X' : 'O'}`

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            className={`cell ${value ? 'filled' : ''}`}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  )
}

export default TicTacToe
