/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react';
import Select from 'react-select'
import FormControl from '@material-ui/core/FormControl';
import BaseSelect from './baseselect'

import '../style/components.css'

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
class Projection1 extends BaseSelect
{

  // ---------------------------------------------------------------------------------------------------------------------
  componentDidMount()
  {
    this.getOptions('http://localhost:8787/server/projections/list-first');
  }

  // ---------------------------------------------------------------------------------------------------------------------
  render()
  {
    return (
      <div>
        <FormControl>
          <Select
            id="cboProjection1"
            options={this.state.selectOptions}
            onChange={this.handleInputChange}
          >
          </Select>
        </FormControl>
      </div>
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------

}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------


export default Projection1