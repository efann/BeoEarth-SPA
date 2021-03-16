/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import TextField from '@material-ui/core/TextField';
import React from 'react';
import {Mapping} from '../common/mapping';
import {Utils} from '../common/utils';

import '../style/components.css'

// From https://stackoverflow.com/questions/43714895/google-is-not-defined-in-react-app-using-create-react-app
/* global google */

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
  componentDidMount()
  {
    Utils.setGeoCodeMap(this.props.id, this.props.value);
  }

  // ---------------------------------------------------------------------------------------------------------------------
  handleBlur(toEvent)
  {
    // lcValue is always a string.
    let lcValue = toEvent.target.value;
    if (Boolean(lcValue))
    {
      // Sometimes Utils.GeoCodeValues.get(this.props.id) returns a number, sometimes a string.
      // So just always return a string.
      if (lcValue !== Utils.GeoCodeValues.get(this.props.id).toString())
      {
        Utils.setGeoCodeMap(this.props.id, lcValue);

        if (this.props.id === Utils.ID_ADDRESS)
        {
          Mapping.geoCodeByAddressThread();
        }
        else
        {
          Mapping.updatePushPin();
          Mapping.geoCodeByLatLngThread();
        }
        this.setState({[this.INPUT_ERROR]: false});
      }

      return;
    }

    this.setState({[this.INPUT_ERROR]: true});
  }

  // ---------------------------------------------------------------------------------------------------------------------
  render()
  {
    return (
      <TextField
        id={this.props.id}
        error={this.state[this.INPUT_ERROR]}
        label={this.props.label}
        defaultValue={this.props.value}
        style={{width: this.props.width}}
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
