import { Button, ListItemButton } from '@mui/material';
import { useState, ReactElement } from 'react';
import { calculatePosition } from '../utils/calculate-position.util';
import { calculateWinner } from '../utils/calculate-winner.util';
import { Board } from './Board';
import { Player } from './Player';

export const Game = function (): JSX.Element {
  const [history, changeHistory] = useState([{ squares: Array(9).fill(null), moveLocation: { col: 0, row: 0 } }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [playerOneIsNext, changeNext] = useState(true);
  const [playerOne, changePlayerOne] = useState('');
  const [playerTwo, changePlayerTwo] = useState('');
  const [isGameStarted, changeGameStatus] = useState(false);

  const handleClick = (i: number): void => {
    const newHistory = history.slice(0, stepNumber + 1);

    const current = newHistory[newHistory.length - 1];

    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = playerOneIsNext ? 'X' : 'O';

    const { row, col } = calculatePosition(i);

    changeHistory(
      newHistory.concat([
        {
          squares,
          moveLocation: { row, col },
        },
      ])
    );
    setStepNumber(newHistory.length);
    changeNext(!playerOneIsNext);
  };

  const handleStart = () => {
    if (playerOne && playerTwo) changeGameStatus(true);
  };

  const jumpTo = (step: number): void => {
    setStepNumber(step);
    changeNext(step % 2 === 0);
  };

  const moves = history.map(({ moveLocation: { row, col } }, move): ReactElement<unknown, string> => {
    const desc: string = move ? `#${move}. Action: row: ${row}, column: ${col}` : 'Game start';

    const selected: boolean = move === stepNumber;

    return (
      // eslint-disable-next-line react/no-array-index-key
      <ListItemButton key={move} onClick={() => jumpTo(move)} selected={selected}>
        {desc}
      </ListItemButton>
    );
  });

  const current = history[stepNumber];

  const winnerSymbol = calculateWinner(current.squares);

  const status: string = winnerSymbol
    ? `Winner: ${winnerSymbol === 'X' ? playerOne : playerTwo}`
    : `Next player: ${playerOneIsNext ? playerOne : playerTwo}`;

  if (playerOne && playerTwo && isGameStarted) {
    return (
      <div className="game">
        <div className="game-board">
          <div>{status}</div>
          <Board squares={current.squares} onClick={handleClick} />
        </div>
        <div className="game-info">
          <h1>History</h1>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  return (
    <div className="start">
      <div className="player-row">
        <Player changePlayer={changePlayerOne} />
        <Player changePlayer={changePlayerTwo} />
      </div>
      <div className="player-row">
        <Button
          sx={{ height: '3rem', width: '3rem', maxWidth: '3rem', display: 'flex', flex: '1' }}
          type="button"
          variant="contained"
          onClick={handleStart}
        >
          Start
        </Button>
      </div>
    </div>
  );
};
