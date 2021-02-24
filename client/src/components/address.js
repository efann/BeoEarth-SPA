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
export default function AddressTextField(toProps)
{
  return (
    <TextField
      id={toProps.id}
      label={toProps.label}
      defaultValue={toProps.value}
      variant="outlined"
      size="small"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
// ---------------------------------------------------------------------------------------------------------------------
