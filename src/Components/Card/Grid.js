import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Custombtn from './CustomBtn.js';

const styles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 5rem 0 5rem',
  },
  item: {
    paddingTop: '1rem',
  },
});

const Grid = (props) => {
  const { icon, title, btnTitle } = props;
  const classes = styles();
  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.item}>{icon}</div>
        <Typography className={classes.item} variant="h5">
          {title}
        </Typography>
        <div className={classes.item}>
          <Custombtn content={btnTitle} />
        </div>
      </div>
    </div>
  );
};

export default Grid;
