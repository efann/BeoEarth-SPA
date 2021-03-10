/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import {Utils} from '../common/utils';

// ---------------------------------------------------------------------------------------------------------------------
const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

// ---------------------------------------------------------------------------------------------------------------------
// From https://material-ui.com/components/slider/
export default function IntegerSlider(toProps)
{
  const classes = useStyles();

  const [fetchCalc, setFetchCalc] = toProps.functions;
  const [value, setValue] = useState(toProps.value);

  // ---------------------------------------------------------------------------------------------------------------------
  function handleChange(toEvent, tnValue)
  {
    Utils.GeoCodeValues.set(toProps.id, tnValue);
    console.log('=============Slider=========================');
    console.log('=>tnValue ' + tnValue);
    console.log(Utils.GeoCodeValues);
    console.log('============================================');

    setValue(tnValue);
    setFetchCalc(tnValue);
  }

  // ---------------------------------------------------------------------------------------------------------------------

  return (
    <div className={classes.root}>
      <Slider
        id={toProps.id}
        value={value}
        defaultValue={toProps.value}
        step={1}
        marks
        min={toProps.min}
        max={toProps.max}
        valueLabelDisplay="auto"
        onChange={handleChange}
      />
    </div>
  );
}
// ---------------------------------------------------------------------------------------------------------------------
