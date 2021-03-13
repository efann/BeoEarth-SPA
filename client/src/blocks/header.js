/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import {Box} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import {NavLink} from 'react-router-dom';

import '../style/header.css';

// ---------------------------------------------------------------------------------------------------------------------
function Header()
{
  return (
    <header className="fixed-top">
      <Grid container>
        <Grid item sm={8} xs={12}>
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
        </Grid>
        <Grid item sm={4} xs={12}>
          <Box display="flex" justifyContent="flex-end" m={1} p={1} bgcolor="background.paper">
            <Box p={1}>
              <NavLink exact activeClassName="active" to="/">
                Home
              </NavLink>
            </Box>
            <Box p={1}>
              <NavLink activeClassName="active" to="/contact">
                Contact
              </NavLink>
            </Box>
          </Box>
        </Grid>

      </Grid>
    </header>
  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default Header;
