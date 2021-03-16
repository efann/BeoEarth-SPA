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
    let lcValue = toEvent.target.value;
    if (Boolean(lcValue))
    {
      Utils.setGeoCodeMap(this.props.id, lcValue);
      if (this.props.id === Utils.ID_ADDRESS)
      {
        // This is not accessible in Mapping.foGeocoder.geocode
        var loThat = this;

        Mapping.foGeocoder.geocode(
          {
            'address': Utils.GeoCodeValues.get(Utils.ID_ADDRESS)
          }, function (taResults, tnStatus)
          {
            var lcInfo = '';
            if (tnStatus == google.maps.GeocoderStatus.OK)
            {
              if (taResults[0])
              {
                let lcAddress = taResults[0].formatted_address;

                let loAddress = document.getElementById(Utils.ID_ADDRESS);
                let loLat = document.getElementById(Utils.ID_LAT);
                let loLng = document.getElementById(Utils.ID_LNG);

                let lnLat = taResults[0].geometry.location.lat();
                let lnLng = taResults[0].geometry.location.lng();

                loAddress.value = lcAddress;
                loLat.value = lnLat;
                loLng.value = lnLng;

                Utils.setGeoCodeMap(Utils.ID_LAT, lnLat);
                Utils.setGeoCodeMap(Utils.ID_LNG, lnLng);

                loThat.updatePushPin();
                loThat.state.updateFetchCalc();
              }
              else
              {
                lcInfo = 'No results found';
              }
            }
            else
            {
              lcInfo = 'Geocoder failed due to: ' + tnStatus;
            }
          });

      }
      else
      {
        this.updatePushPin();
        this.state.updateFetchCalc();
      }


      this.setState({[this.INPUT_ERROR]: false});
    }
    else
    {
      this.setState({[this.INPUT_ERROR]: true});
    }
  }

  //----------------------------------------------------------------------------------------------------
  updatePushPin()
  {
    let lnLat = Utils.GeoCodeValues.get(Utils.ID_LAT);
    let lnLng = Utils.GeoCodeValues.get(Utils.ID_LNG);

    var loLatLng = new google.maps.LatLng(parseFloat(lnLat), parseFloat(lnLng));

    Mapping.foPushPin.setPosition(loLatLng);
    Mapping.foGoogleMap.setCenter(loLatLng);
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
