/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react';
import Select from 'react-select';
import AjaxImage from '../blocks/ajaxImage';
import ErrorMessage from '../blocks/errorMessage';
import {Utils} from '../common/utils';

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
      isLoaded: false,
      error: false,
      errorMessage: '<none>',
      selectOptions: [],
      updateFetchCalc: toProps.updateFetchCalc
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------
  componentDidMount()
  {
    this.getOptions(Utils.getURLPrefix() + this.props.url_frag);
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // From https://medium.com/how-to-react/react-select-dropdown-tutorial-using-react-select-51664ab8b6f3
  async getOptions(tcURL)
  {
    this.setState({
      isLoaded: false,
    });

    fetch(tcURL)
      .then(function (toResponse)
      {
        if (!toResponse.ok)
        {
          throw Error(toResponse.statusText);
        }
        return (toResponse.json());
      })
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

          this.state.updateFetchCalc();
        })
      .catch(function (toError)
      {
        // I'm finding that setting the state in the catch or error sections
        // causes odd problems. Plus, apparently, 'this' is undefined.
        console.log('There was a problem in baseSelect.getOptions():\n', toError.message);
      });
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
      if (this.state.error)
      {
        return (
          <ErrorMessage Message={this.state.errorMessage}/>
        );
      }
      else
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
    }

    return (
      <div id={this.props.id}>
        <AjaxImage/>
      </div>
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------

}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export default BaseSelect
