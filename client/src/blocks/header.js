/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from "react";
import {NavLink} from "react-router-dom";

import '../style/header.css';

// ---------------------------------------------------------------------------------------------------------------------
function Header()
{
  return (
    <header>
      <div id="block-header">
        <div>
          <a href="/">BeoEarth</a>
        </div>
        <div id="wiki-image">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/North_America_from_low_orbiting_satellite_Suomi_NPP.jpg/1024px-North_America_from_low_orbiting_satellite_Suomi_NPP.jpg"
            title="The Blue Marble from https://en.wikipedia.org/wiki/The_Blue_Marble"
            alt="The Blue Marble from https://en.wikipedia.org/wiki/The_Blue_Marble"/>
        </div>
      </div>

      <nav>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
        <NavLink activeClassName="active" to="/contact">
          Contact
        </NavLink>
      </nav>
    </header>
  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default Header;