/*
 * BeoEarth SPA
 * Copyright(c) 2009-2020, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from "react";
import {NavLink} from "react-router-dom";

// ---------------------------------------------------------------------------------------------------------------------
function Header()
{
  return (
      <nav>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
        <NavLink activeClassName="active" to="/contact">
          Contact
        </NavLink>
      </nav>
  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default Header;