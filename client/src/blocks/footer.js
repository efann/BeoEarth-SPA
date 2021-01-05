/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from "react";
import {Utils} from "../common/utils";

import '../style/footer.css';

// ---------------------------------------------------------------------------------------------------------------------
function Footer()
{
  return (
    <footer className="footer container" role="contentinfo">
      <div style={{
        clear: 'both',
        fontSize: '0.8em',
        paddingTop: '20px',
        lineHeight: '1.4em',
        overflow: 'hidden'
      }}>
        <div className="row">
          Copyright&copy;&nbsp;2009-{Utils.getYear()}&nbsp;BeoEarth. All rights
          reserved.
        </div>

        <div className="row currentdate">
          {Utils.getCurrentDate()}
        </div>

        <div className="row website">
          Website by&nbsp;<a href="https://www.beowurks.com/" target="_blank" rel="noreferrer">Beowurks</a>
        </div>

      </div>

    </footer>

  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default Footer;