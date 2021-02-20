/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'

import '../style/map.css'
import {Utils} from '../common/utils';

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
class DefaultMap extends Component
{
  // ---------------------------------------------------------------------------------------------------------------------
  render()
  {
    return (
      <div className="map">
        <div className="google-map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: this.props.googlekey
            }}
            options={Utils.createMapOptions()}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({map, maps}) => Utils.setupGoogleMaps(map, maps)}
          >
          </GoogleMapReact>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------

}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export default DefaultMap
