/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react';

import '../style/components.css'
import TextField from '@material-ui/core/TextField';
import {Utils} from '../common/utils';

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
class BaseNumberTextField extends React.Component
{
  // ---------------------------------------------------------------------------------------------------------------------
  constructor(toProps)
  {
    super(toProps);

    this.state = {};
    this.state.id = toProps.id;
    this.state.label = toProps.label;
  }

  // ---------------------------------------------------------------------------------------------------------------------
  handleInputChange(toEvent)
  {
    Utils.GeoCodeValues[toEvent.target.id] = toEvent.target.value;
  }

  // ---------------------------------------------------------------------------------------------------------------------
  render()
  {
    return (
      <TextField
        id={this.state.id}
        label={this.state.label}
        required
        type="number"
        variant="outlined"
        onChange={this.handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
        style={{width: '45%', padding: '7px 0'}}
        inputProps={{
          style: {
            padding: '7px',
          },
        }}
      />
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------

}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------


export default BaseNumberTextField