/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react'
import GoogleMapReact from 'google-map-react'
import {Icon} from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

import '../style/map.css'

// ---------------------------------------------------------------------------------------------------------------------

const LocationPin = ({text}) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon"/>
    <p className="pin-text">{text}</p>
  </div>
)
// ---------------------------------------------------------------------------------------------------------------------

const Map = ({toLocation, tnZoomLevel}) => (
  <div className="map">
    <h2 className="map-h2">Come Visit Us At Our Campus</h2>

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyB-pdbBGLEr5DlPsvfL3C1Pz8seb3d2gEQ'
        }}
        defaultCenter={toLocation}
        defaultZoom={tnZoomLevel}
      >
        <LocationPin
          lat={toLocation.lat}
          lng={toLocation.lng}
          text={toLocation.address}
        />
      </GoogleMapReact>
    </div>
  </div>
)
// ---------------------------------------------------------------------------------------------------------------------

export default Map