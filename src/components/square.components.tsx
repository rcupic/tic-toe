export const Square = function({ onClick, value }: { onClick: React.MouseEventHandler<HTMLButtonElement>, value: string}) {
  return <button type='button' className='square' onClick={onClick}>
        {value}
    </button>
}