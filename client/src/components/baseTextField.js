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
class BaseTextField extends React.Component
{

  // ---------------------------------------------------------------------------------------------------------------------
  handleBlur(toEvent)
  {
    Utils.GeoCodeValues.set(toEvent.target.id, toEvent.target.value);
    console.log('======================================');
    console.log(Utils.GeoCodeValues);
    console.log('======================================');
  }

  // ---------------------------------------------------------------------------------------------------------------------
  render()
  {
    return (
      <TextField
        id={this.props.id}
        label={this.props.label}
        defaultValue={this.props.value}
        required
        size="small"
        type={this.props.type}
        variant="outlined"
        // By binding, you can reference 'this' is handleBlur.
        onBlur={this.handleBlur.bind(this)}
        InputLabelProps={{
          shrink: true,
        }}
      />
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------

}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export default BaseTextField
