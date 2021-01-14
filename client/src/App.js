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

  function ColumnFirst()
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

  function ColumnSecond()
  {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Projection2/>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className="App">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid container item sm={6} spacing={3}>
            <ColumnFirst/>
          </Grid>
          <Grid container item sm={6} spacing={3}>
            <ColumnSecond/>
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
