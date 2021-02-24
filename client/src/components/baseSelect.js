/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react';

import '../style/components.css'
import Select from 'react-select';

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
class BaseSelect extends React.Component
{

  // ---------------------------------------------------------------------------------------------------------------------
  constructor(toProps)
  {
    super(toProps);

    this.foProjections = null;

    this.state = {
      selectOptions: [],
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------
  componentDidMount()
  {
    this.getOptions(window.location.protocol + '//' + window.location.hostname + this.props.url_frag);
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // From https://medium.com/how-to-react/react-select-dropdown-tutorial-using-react-select-51664ab8b6f3
  async getOptions(tcURL)
  {
    fetch(tcURL)
      .then(res => res.json())
      .then(
        (toResult) =>
        {
          this.foProjections = toResult;
          const loOptions = this.foProjections.map(loRow => ({
            'label': loRow.key,
            'value': loRow.projection
          }))

          this.setState({selectOptions: loOptions})

          this.setState({
            isLoaded: true,
          });
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
  handleChange(toSelected)
  {
    console.log(toSelected.label);
    console.log(toSelected.value);
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // Pretty cool. options get reset after componentDidMount with react-select
  render()
  {
    return (
      <Select
        id={this.props.id}
        options={this.state.selectOptions}
        defaultValue={{
          label: process.env.REACT_APP_PROJECTION_DEFAULT_LABEL,
          value: process.env.REACT_APP_PROJECTION_DEFAULT_VALUE
        }}
        onChange={this.handleChange.bind(this)}
      />
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------

}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export default BaseSelect
