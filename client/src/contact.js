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


// ---------------------------------------------------------------------------------------------------------------------

function Contact()
{
  const classes = useStyles();

  // ---------------------------------------------------------------------------------------------------------------------
  React.useEffect(() =>
  {
    Utils.setupResizing();
  }, []);
  // ---------------------------------------------------------------------------------------------------------------------

  return (
    <div id={Utils.ID_APP_CONTENT}>
      <Paper className={classes.paper}>
        <h2>Contact</h2>
        <p>You may reach me through the following links:</p>
        <ul>
          <li>Beowurks: <a href={'https://www.beowurks.com/'} target={'_blank'}
                           rel="noreferrer">https://www.beowurks.com/</a></li>
          <li>LinkedIn: <a href={'https://www.linkedin.com/in/eddie-fann-17822011/'}
                           target={'_blank'} rel="noreferrer">https://www.linkedin.com/in/eddie-fann-17822011/</a></li>
        </ul>
      </Paper>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default Contact
