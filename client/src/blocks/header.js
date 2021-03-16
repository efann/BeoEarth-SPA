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
import LogoImage from './logoImage';

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
class Header extends React.Component
{

  // ---------------------------------------------------------------------------------------------------------------------
  constructor(toProps)
  {
    super(toProps);

    this.SHOWLOGO = 'showLogo';

    this.state = {
      showLogo: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // ---------------------------------------------------------------------------------------------------------------------
  handleClose(toEvent)
  {
    this.setState({[this.SHOWLOGO]: false});
  }

  // ---------------------------------------------------------------------------------------------------------------------
  handleClick(toEvent)
  {
    if (window.location.pathname === '/')
    {
      this.setState({[this.SHOWLOGO]: true});

      toEvent.preventDefault();
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------
  render()
  {
    return (
      <header className="fixed-top">
        <Grid container>
          <Grid item xs={8}>
            <div id="block-header">
              <div>
                <a href="/" onClick={this.handleClick}>BeoEarth</a>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
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
        {this.state[this.SHOWLOGO] ? <LogoImage onClose={this.handleClose}/> : null}
      </header>
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------

}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export default Header;
