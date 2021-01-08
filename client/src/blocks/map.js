/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react'
import GoogleMapReact from 'google-map-react'

import '../style/map.css'
import {Utils} from "../common/utils";

// ---------------------------------------------------------------------------------------------------------------------

const Map = ({toLocation, tnZoomLevel}) => (
  <div className="map">
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyB-pdbBGLEr5DlPsvfL3C1Pz8seb3d2gEQ'
        }}
        defaultCenter={toLocation}
        defaultZoom={tnZoomLevel}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map, maps}) => Utils.setupMarker(map, maps)}
      >
      </GoogleMapReact>
    </div>
  </div>
)
// ---------------------------------------------------------------------------------------------------------------------

export default Map