/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import {Box} from '@material-ui/core';
import React from 'react';
import {HamburgerSpring} from 'react-animated-burgers';
import {NavLink} from 'react-router-dom';

import '../style/appMenu.css';

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
class AppMenu extends React.Component
{
  buttonStyles = {
    position: 'absolute',
    right: '18px',
    top: '9px',
    zIndex: '10'    // One more than the menu block so that it will slide up & down behind the button.
  }

  // ---------------------------------------------------------------------------------------------------------------------
  constructor(toProps)
  {
    super(toProps);

    this.state = {
      isActive: false
    }

  }

  // ---------------------------------------------------------------------------------------------------------------------
  toggleButton = () =>
  {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  // ---------------------------------------------------------------------------------------------------------------------

  render()
  {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <div>
        <HamburgerSpring isActive={this.state.isActive} toggleButton={this.toggleButton} buttonColor="teal"
                         barColor="whitesmoke" buttonWidth={24} buttonStyle={this.buttonStyles}/>

        <Box id={'appMenu'} className={this.state.isActive ? 'isActive' : ''} display="flex" flexDirection={'column'}
             m={1} p={1} bgcolor="background.paper">
          <Box p={1}>
            <NavLink exact activeClassName="activeLink" to="/" onClick={this.toggleButton}>
              Home
            </NavLink>
          </Box>
          <Box p={1}>
            <NavLink activeClassName="activeLink" to="/about" exact onClick={this.toggleButton}>
              About
            </NavLink>
          </Box>
          <Box p={1}>
            <NavLink activeClassName="activeLink" to="/contact" onClick={this.toggleButton}>
              Contact
            </NavLink>
          </Box>
        </Box>
      </div>
    )
      ;
  }

  // ---------------------------------------------------------------------------------------------------------------------

}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export default AppMenu
