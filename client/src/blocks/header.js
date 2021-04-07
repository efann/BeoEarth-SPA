/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Grid from '@material-ui/core/Grid';
import React from 'react';
import AppMenu from '../components/appMenu';

import '../style/header.css';
import LogoImage from './logoImage';

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
class Header extends React.Component
{

  HEADER_ID = 'app-header';

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
  handleClose()
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
      <header id={this.HEADER_ID} className="fixed-top">
        <AppMenu pageWrapId={'page-wrap'} outerContainerId={this.HEADER_ID} right={true}/>
        <div id={'page-wrap'}>
          <Grid container>
            <Grid item xs={8}>
              <div id="block-header">
                <div>
                  <a href="/" onClick={this.handleClick}>BeoEarth</a>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
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
