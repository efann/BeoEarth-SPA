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
      this.setState({[this.INPUT_ERROR]: false});
      Utils.setGeoCodeMap(this.props.id, toEvent.target.value);
      this.state.updateFetchCalc();
    }
    else
    {
      this.setState({[this.INPUT_ERROR]: true});
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------
  render()
  {
    Utils.setGeoCodeMap(this.props.id, this.props.value);

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
