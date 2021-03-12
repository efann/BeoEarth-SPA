/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Grid from '@material-ui/core/Grid';
import React from 'react';

import '../style/errorMessage.css';

// ---------------------------------------------------------------------------------------------------------------------
function ErrorMessage(toProps)
{
  return (
    <Grid container>
      <Grid item xs={12}>
        <div id="errorMessage">
          <h4>An Error Has Been Detected</h4>
          <p>{toProps.Message}</p>
        </div>
      </Grid>
    </Grid>

  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default ErrorMessage;
