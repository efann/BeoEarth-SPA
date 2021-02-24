/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Paper from '@material-ui/core/Paper';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {Utils} from './common/utils';
import AddressTextField from './components/address';
import IntegerSlider from './components/slider';
import Map from './components/map';
import BaseNumberTextField from './components/baseNumberTextField';

import './style/App.css';
import BaseSelect from './components/baseSelect';

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

const AddressProps = {
  id: 'txtAddress',
  label: 'Address',
  value: Utils.DEFAULT_ADDR
}

const LatitudeProps = {
  id: 'txtLatitude',
  label: 'Latitude (Y)',
  value: Utils.DEFAULT_LAT
}

const LongitudeProps = {
  id: 'txtLongitude',
  label: 'Longitude (X)',
  value: Utils.DEFAULT_LNG
}

const Projection1Props = {
  id: 'cboProjection1',
  url_frag: '/server/projections/list-first'
}

const Projection2Props = {
  id: 'cboProjection2',
  url_frag: '/server/projections/list-all'
}

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
              <BaseSelect {...Projection1Props}/>
            </Grid>
            <Grid item xs={12}>
              <AddressTextField {...AddressProps} item xs={12}/>
            </Grid>
            <Grid item xs={12}>
              <BaseNumberTextField {...LatitudeProps} item xs={9}/>
            </Grid>
            <Grid item xs={12}>
              <BaseNumberTextField  {...LongitudeProps} item xs={9}/>
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
      <Paper className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12}>
              <BaseSelect {...Projection2Props}/>
            </Grid>
            <Grid item xs={12}>
              <IntegerSlider item xs={12}/>
            </Grid>
          </Grid>
        </form>
      </Paper>
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
          <Grid id={'MapGrid'} item xs={12}>
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
