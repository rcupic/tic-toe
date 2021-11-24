import React from "react";
import { ReactElement } from "react";
import { calculatePosition } from "../utils/calculate-position.util";
import { calculateWinner } from "../utils/calculate-winner.util";
import { History } from '../interfaces/history.interface';
import { Board } from "./board.component";

export class Game extends React.Component<{}, { stepNumber: number, xIsNext: boolean, history: History[]}>{
    constructor(props: any) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                moveLocation: {
                  col: 0,
                  row: 0,
                }
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i: number): void {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);

        const current = history[history.length - 1];

        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) 
            return;

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        const { row, col } = calculatePosition(i);

        this.setState({ history: history.concat([{
            squares,
            moveLocation: { row, col }
          }]), stepNumber: history.length, xIsNext: !this.state.xIsNext });
    }

    jumpTo(step: number): void {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }

    render(): ReactElement<any, any> {
        const history = this.state.history;

        const current = history[this.state.stepNumber];

        const winner = calculateWinner(current.squares);

        const moves = history.map(({ moveLocation: { row, col } }, move): ReactElement<any,any> => {
            const desc: string = move ?
              `Go to move #${move}. Action: row: ${row}, column: ${col}`:
              'Go to game start';

            const className: string | undefined = move === this.state.stepNumber ? 'active' : undefined;

            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)} className={className}>{desc}</button>
              </li>
            );
          });

        const status: string =  winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}