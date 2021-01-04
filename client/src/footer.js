/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from "react";

// ---------------------------------------------------------------------------------------------------------------------
function Footer()
{
  const getYear = () => new Date().getFullYear();

  const getCurrentDate = () =>
  {
    let loDate = new Date();
    // Not quite sure why the below format is working correctly displays in that order.
    // Monday, January 4, 2021
    return (loDate.toLocaleString('default', {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'}));
  }

  return (
      <footer className="footer container" role="contentinfo">
        <div className="region region-footer">
          <section id="block-footercopyright"
                   className="block block-block-content block-block-content13d21cfb-84f6-401a-b206-451affe7d50d clearfix">

            <div className="field field--name-body field--type-text-with-summary field--label-hidden field--item">
              <div>
                <div style={{
                  clear: 'both',
                  fontSize: '0.8em',
                  paddingTop: '20px',
                  lineHeight: '1.4em',
                  overflow: 'hidden'
                }}>
                  <div className="col-xs-12" style={{textAlign: 'center'}}>
                    Copyright&copy;&nbsp;2009-{getYear()}&nbsp;BeoEarth. All rights
                    reserved.
                  </div>

                  <div className="col-xs-12" style={{textAlign: 'center', fontStyle: 'italic'}}>
                    {getCurrentDate()}
                  </div>

                  <div className="col-xs-12" style={{textAlign: 'center', fontStyle: 'italic', paddingTop: '10px'}}>
                    Website by&nbsp;<a href="https://www.beowurks.com/" target="_blank">Beowurks</a>
                  </div>

                </div>

              </div>
            </div>

          </section>

        </div>

      </footer>

  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default Footer;