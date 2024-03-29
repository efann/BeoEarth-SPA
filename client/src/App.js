/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import {Mapping} from './common/mapping';
import useStyles from './common/useStyles';

import {Utils} from './common/utils';

import BaseSelect from './components/baseSelect';
import BaseTextField from './components/baseTextField';
import FetchCalcs from './components/fetchCalcs';
import Map from './components/map';
import IntegerSlider from './components/slider';

import './style/App.css';


// ---------------------------------------------------------------------------------------------------------------------
function App()
{
  const classes = useStyles();

  var refFetchCalc = React.createRef();

  const updateFetchCalc = () =>
  {
    if (refFetchCalc === undefined)
    {
      console.log('===> refFetchCalc is undefined in updateFetchCalc');
      return;
    }

    // Will cause a re-render of fetchCalc
    refFetchCalc.current.setState({[Utils.STATUS_FETCHCALC]: true});
  };

  const GoogleMapProps = {
    center: {
      lat: Mapping.DEFAULT_LAT,
      lng: Mapping.DEFAULT_LNG
    },
    zoom: Mapping.DEFAULT_ZOOM,
    updateFetchCalc: updateFetchCalc
  };

  const AddressProps = {
    id: Utils.ID_ADDRESS,
    label: 'Address',
    value: Mapping.DEFAULT_ADDR,
    type: 'text',
    width: '90%',
    updateFetchCalc: updateFetchCalc
  }

  const LatitudeProps = {
    id: Utils.ID_LAT,
    label: 'Latitude (Y)',
    value: Mapping.DEFAULT_LAT,
    type: 'number',
    width: '50%',
    updateFetchCalc: updateFetchCalc
  }

  const LongitudeProps = {
    id: Utils.ID_LNG,
    label: 'Longitude (X)',
    value: Mapping.DEFAULT_LNG,
    type: 'number',
    width: '50%',
    updateFetchCalc: updateFetchCalc
  }

  const Projection1Props = {
    id: Utils.ID_PROJ1,
    url_frag: 'projections/list-first',
    updateFetchCalc: updateFetchCalc
  }

  const Projection2Props = {
    id: Utils.ID_PROJ2,
    url_frag: 'projections/list-all',
    updateFetchCalc: updateFetchCalc
  }

  const SliderProps = {
    id: Utils.ID_SIGFIG,
    value: Mapping.DEFAULT_SIGFIG,
    min: 0,
    max: 12,
    updateFetchCalc: updateFetchCalc
  };

  // ---------------------------------------------------------------------------------------------------------------------
  React.useEffect(() =>
  {
    Utils.fixInputNumberIssue();

    Utils.setupResizing();

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
              <BaseTextField {...AddressProps} item xs={12}/>
            </Grid>
            <Grid item xs={12}>
              <BaseTextField {...LatitudeProps} item xs={9}/>
            </Grid>
            <Grid item xs={12}>
              <BaseTextField  {...LongitudeProps} item xs={9}/>
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
              <IntegerSlider {...SliderProps} item xs={12}/>
            </Grid>
            <Grid item xs={12}>
              <FetchCalcs ref={refFetchCalc} item xs={12}/>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------

  return (
    <div id={Utils.ID_APP_CONTENT}>
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
