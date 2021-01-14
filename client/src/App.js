/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Map from './blocks/map';
import Projection1 from './components/projection1';
import Projection2 from './components/projection2';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


import './style/App.css';
import IntegerSlider from './components/slider';

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


// ---------------------------------------------------------------------------------------------------------------------
function App()
{
  const classes = useStyles();


  // ---------------------------------------------------------------------------------------------------------------------
  function FormFirst()
  {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Projection1/>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------

  function FormSecond()
  {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Projection2 item xs={12}/>
            <IntegerSlider item xs={12}/>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------

  return (
    <div className="App">
      <div className={classes.root}>
        <Grid container xs={12}>
          <Grid container item sm={6} spacing={3}>
            <FormFirst/>
          </Grid>
          <Grid container item sm={6} spacing={3}>
            <FormSecond/>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Map/>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default App;
