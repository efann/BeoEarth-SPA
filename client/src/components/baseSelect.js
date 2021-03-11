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
import {Utils} from '../common/utils';
import AjaxImage from '../blocks/ajaximage';

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
      isLoaded: false,
      selectOptions: [],
      updateFetchCalc: toProps.updateFetchCalc
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
    this.setState({
      isLoaded: false,
    });

    fetch(tcURL)
      .then(res => res.json())
      .then(
        (toResult) =>
        {
          this.foProjections = toResult;
          const loOptions = this.foProjections.map(loRow => ({
            'label': loRow.key,
            'value': loRow.projection
          }));

          this.setState({selectOptions: loOptions});
          this.setState({value: loOptions[0]});

          Utils.setGeoCodeMap(this.props.id, this.state.value);

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
    this.setState({value: toSelected});
    Utils.setGeoCodeMap(this.props.id, toSelected);

    this.state.updateFetchCalc();
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // Pretty cool. options get reset after componentDidMount with react-select
  render()
  {
    if (this.state.isLoaded)
    {
      return (
        <Select
          id={this.props.id}
          value={this.state.value}
          options={this.state.selectOptions}
          onChange={this.handleChange.bind(this)}
          isSearchable={false}
        />
      );
    }

    return (
      <AjaxImage/>
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------

}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export default BaseSelect
