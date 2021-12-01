import Button from '@mui/material/Button';

export const Square = function ({
  onClick,
  value,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  value: string;
}) {
  return (
    <Button
      sx={{ height: '3rem', width: '3rem', maxWidth: '3rem', display: 'flex', flex: '1' }}
      type="button"
      variant="contained"
      className="square"
      onClick={onClick}
    >
      {value}
    </Button>
  );
};
