/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react';

import '../style/ajaxImage.css';

// ---------------------------------------------------------------------------------------------------------------------
function GenerateLinkForLists(toProps)
{
  return (
    <span>{toProps.TextPrefix}: <a href={toProps.URL} target={'_blank'} rel="noreferrer">{toProps.URL}</a></span>
  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default GenerateLinkForLists;
