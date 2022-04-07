import React from 'react';
import { IconButton, Snackbar, Tooltip } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CloseIcon from '@mui/icons-material/Close';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';

function Dice({ r }) {
  const [open, setOpen] = React.useState(false);
  const [results, setResults] = React.useState(null);
  const [log] = React.useState([]);

  const handleClick = () => {
    const roll = new DiceRoll(r);
    log.push(roll);
    setResults(roll);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      <Tooltip title={r}>
        <IconButton
          edge="end"
          aria-label="Roll Dice"
          onClick={handleClick}
        >
          <CasinoIcon />
        </IconButton>
      </Tooltip>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={results ? results.output : ''}
        action={action}
      />
    </>
  );
}

export default Dice;
