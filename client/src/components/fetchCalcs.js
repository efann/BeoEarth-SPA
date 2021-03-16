/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Grid from '@material-ui/core/Grid';
import React from 'react';
import {CSSTransition} from 'react-transition-group';

import AjaxImage from '../blocks/ajaxImage';
import ErrorMessage from '../blocks/errorMessage';
import {Utils} from '../common/utils';

import '../style/components.css'

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
class FetchCalcs extends React.Component
{

  // ---------------------------------------------------------------------------------------------------------------------
  constructor(toProps)
  {
    super(toProps);

    this.state = {
      isLoaded: false,
      error: false,
      errorMessage: '<none>',
      [Utils.STATUS_FETCHCALC]: false,
      id: toProps.id,
      lines: [],
    }

  }

  // ---------------------------------------------------------------------------------------------------------------------
  // Called when state changes. If you leave out checking STATUS_FETCHCALC, you will get an infinite
  // loop of state changes as calculateProjection changes state.
  componentDidUpdate(toPrevProps, toPrevState)
  {
    if (this.state[Utils.STATUS_FETCHCALC])
    {
      this.setState({[Utils.STATUS_FETCHCALC]: false});

      this.calculateProjection();
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // From https://medium.com/how-to-react/react-select-dropdown-tutorial-using-react-select-51664ab8b6f3
  async calculateProjection()
  {
    this.setState({
      isLoaded: false,
    });

    let lcURL = Utils.buildFetchCalcURL();
    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
    // Boolean checks for all sorts of conditions.
    // If the value is omitted or is 0, -0, null, false, NaN, undefined, or the empty string (""),
    // then Boolean will return false.
    if (!Boolean(lcURL))
    {
      // Do NOT setState here: otherwise, state will always update with an error message.
      console.log('There was an issue with the URL query parameters.')
      return;
    }

    // From https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
    // Handling errors
    fetch(lcURL)
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
          let loMap = toResult;

          if (!Utils.isUTM())
          {
            this.setState({'ProjectionURL': loMap.ProjectionURL})
            this.setState({'ProjectionText': loMap.ProjectionText})
            this.setState({'Y': loMap.Y})
            this.setState({'X': loMap.X})
            this.setState({'YDirection': loMap.YDirection})
            this.setState({'XDirection': loMap.XDirection})
            this.setState({'YMinutes': loMap.YMinutes})
            this.setState({'XMinutes': loMap.XMinutes})
          }
          else
          {
            this.setState({'ProjectionURL': loMap.ProjectionURL})
            this.setState({'ProjectionText': loMap.ProjectionText})
            this.setState({'SRID_URL': loMap.SRID_URL})
            this.setState({'SRID_Text': loMap.SRID_Text})
            this.setState({'SRID': loMap.SRID})
            this.setState({'Zone': loMap.Zone})
            this.setState({'Easting': loMap.Easting})
            this.setState({'Northing': loMap.Northing})
          }

          this.setState({
            isLoaded: true,
          });
        })
      .catch(function (toError)
      {
        // I'm finding that setting the state in the catch or error sections
        // causes odd problems. Plus, apparently, 'this' is undefined.
        console.log('There was a problem in fetchCalc.calculateProjection():\n', toError.message);
      });
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
        if (!Utils.isUTM())
        {
          return (
            <div id='FetchedData'>
              <CSSTransition
                in={true}
                timeout={100}
                classNames="fetchcalc-list-transition"
                unmountOnExit
                appear
              >
                <div className="App-intro">
                  <Grid container>
                    <Grid item xs={12}>
                      <strong>Projection: </strong> <a href={this.state.ProjectionURL}
                                                       target='_blank' rel="noreferrer">{this.state.ProjectionText}</a>
                    </Grid>
                    <Grid item xs={6}>
                      <strong>Latitude (Y)</strong>
                    </Grid>
                    <Grid item xs={6}>
                      <strong>Longitude (X)</strong>
                    </Grid>
                    <Grid item xs={6}>
                      {this.state.Y}
                    </Grid>
                    <Grid item xs={6}>
                      {this.state.X}
                    </Grid>
                    <Grid item xs={6}>
                      {this.state.YDirection}
                    </Grid>
                    <Grid item xs={6}>
                      {this.state.XDirection}
                    </Grid>
                    <Grid item xs={6}>
                      {this.state.YMinutes}
                    </Grid>
                    <Grid item xs={6}>
                      {this.state.XMinutes}
                    </Grid>
                  </Grid>

                </div>
              </CSSTransition>
            </div>
          );
        }
        else
        {
          return (
            <div id='FetchedData'>
              <CSSTransition
                in={true}
                timeout={100}
                classNames="fetchcalc-list-transition"
                unmountOnExit
                appear
              >
                <div className="App-intro">
                  <Grid container>
                    <Grid item xs={3}>
                      <strong>Projection:</strong>
                    </Grid>
                    <Grid item xs={9}>
                      <a href={this.state.ProjectionURL} target='_blank'
                         rel="noreferrer">{this.state.ProjectionText}</a>
                    </Grid>
                    <Grid item xs={3}>
                      <a href={this.state.SRID_URL} target='_blank'
                         rel="noreferrer">{this.state.SRID_Text}</a>
                    </Grid>
                    <Grid item xs={9}>
                      {this.state.SRID}
                    </Grid>
                    <Grid item xs={3}>
                      <strong>Zone:</strong>
                    </Grid>
                    <Grid item xs={9}>
                      {this.state.Zone}
                    </Grid>
                    <Grid item xs={3}>
                      <strong>Easting:</strong>
                    </Grid>
                    <Grid item xs={9}>
                      {this.state.Easting}
                    </Grid>
                    <Grid item xs={3}>
                      <strong>Northing:</strong>
                    </Grid>
                    <Grid item xs={9}>
                      {this.state.Northing}
                    </Grid>
                  </Grid>

                </div>
              </CSSTransition>
            </div>
          );
        }

      }
    }

    return (
      <div id='FetchedData'>
        <AjaxImage/>
      </div>
    );

  }

  // ---------------------------------------------------------------------------------------------------------------------

}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export default FetchCalcs
