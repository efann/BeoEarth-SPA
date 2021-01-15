/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react';
import TextField from '@material-ui/core/TextField';

// ---------------------------------------------------------------------------------------------------------------------
export default function AddressTextField()
{
  return (
    <TextField
      id="Address"
      label="Address"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      style = {{width: '90%', padding: '7px 0'}}
      inputProps={{
        style: {
          padding: '7px',
        },
      }}
    />
  );
}
// ---------------------------------------------------------------------------------------------------------------------
