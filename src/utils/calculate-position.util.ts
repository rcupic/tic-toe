export const calculatePosition = (i: number): { row: number; col: number } => {
  let row: number;
  if (i < 3) row = 1;
  else if (i < 6) row = 2;
  else row = 3;

  const restOf = i % 3;

  let col: number;
  if (restOf === 0) col = 1;
  else if (restOf === 1) col = 2;
  else col = 3;

  return { row, col };
};
