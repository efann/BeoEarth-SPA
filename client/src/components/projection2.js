/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react';
import Select from 'react-select'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import BaseSelect from './baseselect'

import '../style/components.css'

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
class Projection2 extends BaseSelect
{

  // ---------------------------------------------------------------------------------------------------------------------
  componentDidMount()
  {
    this.getOptions('http://localhost:8787/server/projections/list-all');
  }

  // ---------------------------------------------------------------------------------------------------------------------
  render()
  {
    return (
      <div>
        <FormControl>
          <InputLabel id="lblProjection2">GIS</InputLabel>
          <Select
            labelId="lblProjection2"
            id="cboProjection2"
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


export default Projection2