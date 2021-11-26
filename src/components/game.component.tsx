import React, { useState , ReactElement } from "react";
import { calculatePosition } from "../utils/calculate-position.util";
import { calculateWinner } from "../utils/calculate-winner.util";
import { Board } from "./board.component";

export const Game = function(): JSX.Element {
    const [history, changeHistory] = useState([{ squares: Array(9).fill(null), moveLocation: { col: 0, row: 0}}]);
    const [stepNumber, setStepNumber] = useState(0);
    const [ xIsNext, changeNext] = useState(true);


    const handleClick = (i: number): void => {
        const newHistory = history.slice(0, stepNumber + 1);

        const current = newHistory[newHistory.length - 1];

        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) 
            return;

        squares[i] = xIsNext ? 'X' : 'O';

        const { row, col } = calculatePosition(i);

        changeHistory(newHistory.concat([{
          squares,
          moveLocation: { row, col }
        }]));
        setStepNumber(newHistory.length);
        changeNext(!xIsNext);
    }

    const jumpTo = (step: number): void => {
      setStepNumber(step);
      changeNext((step % 2) === 0);
    }


    const moves = history.map(({ moveLocation: { row, col } }, move): ReactElement<any,any> => {
        const desc: string = move ?
          `Go to move #${move}. Action: row: ${row}, column: ${col}`:
          'Go to game start';

        const className: string | undefined = move === stepNumber ? 'active' : undefined;

        return (
          // eslint-disable-next-line react/no-array-index-key
          <li key={move}>
            <button type='button' onClick={() => jumpTo(move)} className={className}>{desc}</button>
          </li>
        );
      });

    const current = history[stepNumber];

    const winner = calculateWinner(current.squares);

    const status: string =  winner ? `Winner: ${  winner}` : `Next player: ${  xIsNext ? 'X' : 'O'}`;
    
    return (
        <div className='game'>
            <div className='game-board'>
                <Board squares={current.squares} onClick={(i) => handleClick(i)}/>
            </div>
            <div className='game-info'>
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}