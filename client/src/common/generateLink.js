/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react';

import '../style/ajaxImage.css';
import {Utils} from './utils';

// ---------------------------------------------------------------------------------------------------------------------
// Generates a link for external URLs.
function GenerateLink(toProps)
{
  // You don't need break for this switch statement
  // as each one has a return.
  switch (toProps.URL_Type)
  {
    case Utils.URL_TYPES.LIST:
      return (
        <span>{toProps.TextPrefix}:&nbsp;<a href={toProps.URL}
                                            target={'_blank'}
                                            rel={'noreferrer'}>{toProps.URL}</a></span>
      );

    case Utils.URL_TYPES.REGULAR:
      return (
        <a href={toProps.URL}
           target={'_blank'}
           rel={'noreferrer'}>{toProps.TextPrefix}</a>
      );

    default:
      return (
        <div style={{color: 'red'}}>{'Un-determined values for GenerateLink'}</div>
      );
  }
}

// ---------------------------------------------------------------------------------------------------------------------

export default GenerateLink;
