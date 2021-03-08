/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import ajaxgif from '../images/ajax-loader.gif'

import '../style/ajaximage.css';

// ---------------------------------------------------------------------------------------------------------------------
function AjaxImage()
{
  return (
    <Grid container>
      <Grid item xs={12}>

        <div id="ajax-loading">
          <img src={ajaxgif} alt={'Ajax gif not found'}/>
        </div>

      </Grid>
    </Grid>

  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default AjaxImage;
