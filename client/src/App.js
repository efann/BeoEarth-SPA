/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Projection1 from './components/projection1';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {Utils} from './common/utils';
import AddressTextField from './components/address';
import Projection2 from './components/projection2';
import IntegerSlider from './components/slider';
import Map from './components/map';

import './style/App.css';
import BaseNumberTextField from './components/baseNumberTextField';

// ---------------------------------------------------------------------------------------------------------------------
const useStyles = makeStyles((toTheme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: toTheme.spacing(2),
    textAlign: 'left',
    color: toTheme.palette.text.secondary,
  },
}));

const GoogleMapProps = {
  center: {
    lat: Utils.DEFAULT_LAT,
    lng: Utils.DEFAULT_LNG
  },
  zoom: Utils.DEFAULT_ZOOM,
  googlekey: 'AIzaSyB-pdbBGLEr5DlPsvfL3C1Pz8seb3d2gEQ'
};

// ---------------------------------------------------------------------------------------------------------------------
function App()
{
  const classes = useStyles();

  // ---------------------------------------------------------------------------------------------------------------------
  React.useEffect(() =>
  {
    Utils.fixInputNumberIssue();
  }, []);

  // ---------------------------------------------------------------------------------------------------------------------
  function FormFirst()
  {
    return (
      <Paper className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12}>
              <Projection1/>
            </Grid>
            <Grid item xs={12}>
              <AddressTextField item xs={12}/>
            </Grid>
            <Grid item xs={12}>
              <BaseNumberTextField id={'latitude'} label={'Latitude (Y)'} item xs={9}/>
            </Grid>
            <Grid item xs={12}>
              <BaseNumberTextField id={'longitude'} label={'Longitude (X)'} item xs={9}/>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------

  function FormSecond()
  {
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Projection2 item xs={12}/>
            <IntegerSlider item xs={12}/>
          </Paper>
        </Grid>
      </form>
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------
  return (
    <div className="App">
      <div className={classes.root}>
        <Grid container>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item sm={6}>
                <FormFirst/>
              </Grid>
              <Grid item sm={6}>
                <FormSecond/>
              </Grid>
            </Grid>
          </Paper>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Map {...GoogleMapProps}/>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default App;
