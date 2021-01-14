/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react';

import '../style/components.css'

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
      id: '',
      name: '',
      isLoaded: false
    }

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
  handleInputChange(toSelected)
  {
    console.log(toSelected.label);
    console.log(toSelected.value);

  }

  // ---------------------------------------------------------------------------------------------------------------------

}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------


export default BaseSelect