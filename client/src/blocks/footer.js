/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Grid from '@material-ui/core/Grid';
import React from 'react';
import GenerateLink from '../common/generateLink';
import {Utils} from '../common/utils';

import '../style/footer.css';

// ---------------------------------------------------------------------------------------------------------------------
function Footer()
{
  return (
    <footer>
      <Grid container>
        <Grid item xs={12}>
          Copyright&copy;&nbsp;2009-{Utils.getYear()}&nbsp;BeoEarth. All rights
          reserved.
        </Grid>

        <Grid item xs={12}>
          <div className="currentdate">
            {Utils.getCurrentDate()}
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className="website">
            Website by&nbsp;
            <GenerateLink TextPrefix={'Beowurks'}
                          URL={'https://www.beowurks.com/'}
                          URL_Type={Utils.URL_TYPES.REGULAR}/>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="version">
            Version&nbsp;{process.env.REACT_APP_VERSION}
          </div>
        </Grid>

      </Grid>
    </footer>

  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default Footer;
