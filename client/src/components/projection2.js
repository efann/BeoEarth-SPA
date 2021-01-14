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

import '../style/components.css'

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
class Projection2 extends React.Component
{

  // ---------------------------------------------------------------------------------------------------------------------
  constructor(toProps)
  {
    super(toProps);

    this.foFirstProjections = null;

    this.state = {
      selectOptions: [],
      id: '',
      name: '',
      isLoaded: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // ---------------------------------------------------------------------------------------------------------------------
  async getOptions()
  {
    fetch('http://localhost:8787/server/projections/list-all')
      .then(res => res.json())
      .then(
        (toResult) =>
        {
          const loOptions = toResult.map(loRow => ({
            'label': loRow.key,
            'value': loRow.projection
          }))
          this.setState({selectOptions: loOptions})
          console.log(loOptions);

          this.setState({
            isLoaded: true,
          });
          console.log(toResult);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (toError) =>
        {
          this.setState({
            isLoaded: true,
            error: toError
          });
          console.log('There was a problem:\n', toError);
        }
      )
  }

  // ---------------------------------------------------------------------------------------------------------------------
  componentDidMount()
  {
    this.getOptions()
  }

  // ---------------------------------------------------------------------------------------------------------------------
  handleInputChange(toEvent)
  {
    const loTarget = toEvent.target;
    const loValue = loTarget.type === 'checkbox' ? loTarget.checked : loTarget.value;
    const loName = loTarget.name;

    this.setState({
      [loName]: loValue
    });
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