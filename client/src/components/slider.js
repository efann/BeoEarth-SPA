/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

// ---------------------------------------------------------------------------------------------------------------------
const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

// ---------------------------------------------------------------------------------------------------------------------

function valuetext(value)
{
  return `${value}°C`;
}

// ---------------------------------------------------------------------------------------------------------------------
// From https://material-ui.com/components/slider/
export default function IntegerSlider()
{
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-small-steps" gutterBottom>
        <a href="http://en.wikipedia.org/wiki/Significant_figures" target="_blank" rel="noreferrer"><b>Sig Figs</b></a>
      </Typography>
      <Slider
        defaultValue={6}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-small-steps"
        step={1}
        marks
        min={0}
        max={12}
        valueLabelDisplay="auto"
      />
    </div>
  );
}
// ---------------------------------------------------------------------------------------------------------------------
