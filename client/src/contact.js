/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Paper from '@material-ui/core/Paper';
import React from 'react'
import reCaptcha from './blocks/reCaptcha';
import useStyles from './common/useStyles';
import {Utils} from './common/utils';


// ---------------------------------------------------------------------------------------------------------------------

function Contact()
{
  const classes = useStyles();

  // ---------------------------------------------------------------------------------------------------------------------
  React.useEffect(() =>
  {
    Utils.setupResizing();
    Utils.loadScript('https://www.google.com/recaptcha/api.js', true);
  }, []);
  // ---------------------------------------------------------------------------------------------------------------------

  return (

    <Paper className={classes.paper}>
      <div id={Utils.ID_APP_CONTENT}>
        <h1>Contact</h1>
        <reCaptcha/>
      </div>
    </Paper>

  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default Contact
