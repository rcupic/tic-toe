import React, { ReactElement } from "react"

function Square(props: { onClick: React.MouseEventHandler<HTMLButtonElement>, value: string}) {
    return (
    <button className='square' onClick={props.onClick}>
        {props.value}
    </button>);
}

export class Board extends React.Component<{ squares: string[], onClick(i: number): void}, { history: any[]}> {
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