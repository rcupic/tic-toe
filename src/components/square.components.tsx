import Button from '@mui/material/Button';

export const Square = function ({ onClick, value }: { onClick: React.MouseEventHandler<HTMLButtonElement>, value: string }) {
  return <Button sx={{ minHeight: '15rem', minWidth: '15rem' }} type='button' variant='contained' className="square" onClick={onClick}>
        {value}
    </Button>
}