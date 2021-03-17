/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react'
import {Utils} from './common/utils';


const Notfound = () =>
{
  // ---------------------------------------------------------------------------------------------------------------------
  React.useEffect(() =>
  {
    Utils.setupResizing();

  }, []);
  // ---------------------------------------------------------------------------------------------------------------------

  <div id={Utils.ID_APP_CONTENT}>
    <h1>We apologize, but we could not find the requested page</h1>
  </div>
}
export default Notfound
