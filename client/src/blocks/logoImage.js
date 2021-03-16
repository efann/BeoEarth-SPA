/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react';

import Lightbox from 'react-awesome-lightbox';
// You need to import the CSS only once
import 'react-awesome-lightbox/build/style.css';

// ---------------------------------------------------------------------------------------------------------------------
function LogoImage(toProps)
{
  let lcImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/North_America_from_low_orbiting_satellite_Suomi_NPP.jpg/1024px-North_America_from_low_orbiting_satellite_Suomi_NPP.jpg';
  let lcTitle = 'The Blue Marble from https://en.wikipedia.org/wiki/The_Blue_Marble';

  return (
    <Lightbox {...toProps} image={lcImage} title={lcTitle}/>
  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default LogoImage;
