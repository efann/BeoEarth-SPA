/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import TextField from '@material-ui/core/TextField';
import React from 'react';
import {Utils} from '../common/utils';

import '../style/components.css'

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
class BaseTextField extends React.Component
{

  // ---------------------------------------------------------------------------------------------------------------------
  constructor(toProps)
  {
    super(toProps);

    this.INPUT_ERROR = 'inputError';

    this.state = {
      [this.INPUT_ERROR]: false,
      updateFetchCalc: toProps.updateFetchCalc
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------
  handleBlur(toEvent)
  {
    let lnValue = toEvent.target.value;
    if (Boolean(lnValue))
    {
      Utils.setGeoCodeMap(this.props.id, lnValue);
      this.state.updateFetchCalc();

      this.setState({[this.INPUT_ERROR]: false});
    }
    else
    {
      this.setState({[this.INPUT_ERROR]: true});
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------
  render()
  {
    // Only set if value is empty.
    if (!Boolean(Utils.GeoCodeValues.get(this.props.id)))
    {
      Utils.setGeoCodeMap(this.props.id, this.props.value);
    }

    return (
      <TextField
        id={this.props.id}
        error={this.state[this.INPUT_ERROR]}
        label={this.props.label}
        defaultValue={this.props.value}
        style={{width: this.props.width, borderColor: 'red'}}
        required
        size="small"
        type={this.props.type}
        variant="outlined"
        // By binding, you can reference 'this' is handleBlur.
        onBlur={this.handleBlur.bind(this)}
        InputLabelProps={{
          shrink: true
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
