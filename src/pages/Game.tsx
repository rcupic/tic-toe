import { Button, ListItemButton } from '@mui/material';
import { useState, ReactElement, useMemo } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';
import { calculatePosition } from '../utils/calculate-position.util';
import { calculateWinner } from '../utils/calculate-winner.util';
import { Board } from '../components/Board';
import { Player } from '../components/Player';

export const Game = function (): JSX.Element {
  const [history, changeHistory] = useState([{ squares: Array(9).fill(null), moveLocation: { col: 0, row: 0 } }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [playerOneIsNext, changeNext] = useState(true);
  const [players, changePlayers] = useState([
    { placeholder: 'Player One', name: 'playerOne', uniqueName: '', error: '' },
    { placeholder: 'Player Two', name: 'playerTwo', uniqueName: '', error: '' },
  ]);
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
    if (players.every(el => !!el.uniqueName && !el.error)) changeGameStatus(true);
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
    ? `Winner: ${winnerSymbol === 'X' ? players[0].uniqueName : players[1].uniqueName}`
    : `Next player: ${playerOneIsNext ? players[0].uniqueName : players[1].uniqueName}`;

  const value = useMemo(
    () => ({
      players,
      handleChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const newName = event.target.value;
        const changedPlayerIndex = players.findIndex(el => el.name === event.target.name);

        const newPlayers = [...players];

        const playerWithSameName = players.find(el => el.uniqueName === newName);

        newPlayers[changedPlayerIndex].uniqueName = newName;

        if (playerWithSameName) newPlayers[changedPlayerIndex].error = 'Name is already taken.';
        else if (newPlayers[changedPlayerIndex].error) newPlayers[changedPlayerIndex].error = '';

        changePlayers(newPlayers);
      },
    }),
    [players]
  );

  if (players.every(el => !!el.uniqueName) && isGameStarted) {
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
      <PlayerContext.Provider value={value}>
        <Player />
      </PlayerContext.Provider>
      <div className="player-row">
        <Button
          disabled={!players.every(el => !!el.uniqueName && !el.error)}
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
