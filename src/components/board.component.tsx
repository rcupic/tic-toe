import React, { ReactElement } from "react"

const Square = function({ onClick, value }: { onClick: React.MouseEventHandler<HTMLButtonElement>, value: string}) {
  return <button type='button' className='square' onClick={onClick}>
        {value}
    </button>
}

export const Board = function({squares, onClick }: {squares: string[], onClick: (i: number) => void}): JSX.Element {
    const iterateArray = [0,1,2]
      
    return(
        <div>{iterateArray.map((el): ReactElement => <div className="board-row">
              {iterateArray.map(el2 => <Square value={squares[el * 3 + el2]} onClick={() => onClick(el * 3 + el2)} />)}
            </div>)}
        </div>
    )
}