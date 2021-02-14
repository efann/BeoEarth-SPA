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
class Projection1 extends BaseSelect
{

  // ---------------------------------------------------------------------------------------------------------------------
  componentDidMount()
  {
    this.getOptions(window.location.protocol + '//' + window.location.hostname + '/server/projections/list-first');
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // Pretty cool. options and value get reset after componentDidMount with react-select
  render()
  {
    return (
      <Select
        id="cboProjection1"
        options={this.state.selectOptions}
        defaultValue={{label: process.env.REACT_APP_PROJECTION_LABEL_DEFAULT, value: process.env.REACT_APP_PROJECTION_VALUE_DEFAULT}}
        onChange={this.handleChange.bind(this)}
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

export default Projection1
