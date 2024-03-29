/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Paper from '@material-ui/core/Paper';
import React from 'react'
import useStyles from './common/useStyles';
import {Utils} from './common/utils';

const NotFound = () =>
{
  const classes = useStyles();

  // ---------------------------------------------------------------------------------------------------------------------
  React.useEffect(() =>
  {
    Utils.setupResizing();

  }, []);
  // ---------------------------------------------------------------------------------------------------------------------
  return (
    <Paper className={classes.paper}>
      <div id={Utils.ID_APP_CONTENT}>
        <h2>We apologize, but we could not find the requested page.</h2>
      </div>
    </Paper>
  );
}

export default NotFound
