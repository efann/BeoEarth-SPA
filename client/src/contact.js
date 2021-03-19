/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Paper from '@material-ui/core/Paper';
import React from 'react'
import GenerateLink from './common/generateLink';
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
          <li><GenerateLink TextPrefix={'Beowurks'}
                            URL={'https://www.beowurks.com/'}
                            URL_Type={Utils.URL_TYPES.LIST}/>
          </li>
          <li><GenerateLink TextPrefix={'LinkedIn'}
                            URL={'https://www.linkedin.com/in/eddie-fann-17822011/'}
                            URL_Type={Utils.URL_TYPES.LIST}/>
          </li>
        </ul>
      </Paper>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default Contact
