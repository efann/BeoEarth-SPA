/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react';
import Select from 'react-select'
import BaseSelect from './baseSelect'

import '../style/components.css'

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
class Projection2 extends BaseSelect
{

  // ---------------------------------------------------------------------------------------------------------------------
  componentDidMount()
  {
    this.getOptions(window.location.protocol + '//' + window.location.hostname + '/server/projections/list-all');
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // Pretty cool. options and value get reset after componentDidMount with react-select
  render()
  {
    return (
      <Select
        id="cboProjection2"
        options={this.state.selectOptions}
        value={this.state.selectOptions[0]}
        onChange={this.handleInputChange}
        style={{width: '45%', padding: '7px 0'}}
        inputProps={{
          style: {
            padding: '7px',
          },
        }}
      />
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------

}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export default Projection2
