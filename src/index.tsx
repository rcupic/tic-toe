import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
        return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>);
}

function calculateRowAndCol(i: number): { row: number, col: number} {
  let row: number;
  if (i < 3) row = 1;
  else if (i < 6) row = 2;
  else row =3;

  const restOf = i % 3;

  let col: number;
  if (restOf === 0) col = 1;
  else if(restOf === 1) col = 2;
  else col = 3;

  return { row, col };
}

interface History {
  squares: string[],
  moveLocation: { col: number, row: number }
}

class Board extends React.Component<{ squares: string[], onClick(i: number): void}, { history: any[]}> {
    renderSquare(i: number): ReactElement<any, any> {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    render(): ReactElement<any, any> {
      const iterateArray = [0,1,2]
      
        return(
            <div>{iterateArray.map((el): ReactElement<any, any> => {
                return <div className="board-row">
                  {iterateArray.map(el2 => this.renderSquare(el*3 + el2))}
                </div>
            })}
            </div>
        )
    }
}

class Game extends React.Component<{}, { stepNumber: number, xIsNext: boolean, history: History[]}>{
    constructor(props) {
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

        const { row, col } = calculateRowAndCol(i);

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

            const className: string | boolean = move === this.state.stepNumber ? 'active' : undefined;

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

ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(squares: string[]): string | null {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) 
        return squares[a];
      
    }
    return null;
  }