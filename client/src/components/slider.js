/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import GenerateLink from '../common/generateLink';

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

  // ---------------------------------------------------------------------------------------------------------------------
  function handleChange(toEvent, tnValue)
  {
    Utils.setGeoCodeMap(toProps.id, tnValue);
    toProps.updateFetchCalc();
  }

  // ---------------------------------------------------------------------------------------------------------------------

  Utils.setGeoCodeMap(toProps.id, toProps.value);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <GenerateLink TextPrefix={'Sig Figs'}
                        URL={'https://en.wikipedia.org/wiki/Significant_figures'}
                        URL_Type={Utils.URL_TYPES.REGULAR}/>
        </Grid>
        <Grid item xs={12}>
          <Slider
            id={toProps.id}
            defaultValue={toProps.value}
            step={1}
            marks
            min={toProps.min}
            max={toProps.max}
            valueLabelDisplay="auto"
            onChangeCommitted={handleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}
// ---------------------------------------------------------------------------------------------------------------------
