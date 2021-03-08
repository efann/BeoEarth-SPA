/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react';

import '../style/components.css'
import Grid from '@material-ui/core/Grid';
import AjaxImage from '../blocks/ajaximage';
import {Utils} from '../common/utils';

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
      lines: [],
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------
  componentDidMount()
  {
    //this.calculateProjection(window.location.protocol + '//' + window.location.hostname + '/server/calculations/projection?latitudey=30.268735&longitudex=-97.745209&projectionnew=4326&projectionold=4326&sigfig=6');

    //let lcURL = Utils.buildFetchCalcURL();
    //this.calculateProjection(lcURL);
  }

  // ---------------------------------------------------------------------------------------------------------------------
  componentDidUpdate(toPrevProps, toPrevState)
  {
    console.log('===============================componentDidUpdate===================================')
    console.log(toPrevProps);
    console.log(toPrevState);
    console.log('====================================================================================')
    /*
        if (toPrevState.pokemons !== this.state.pokemons)
        {
          this.calculateProjection();
        }
    */
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // From https://medium.com/how-to-react/react-select-dropdown-tutorial-using-react-select-51664ab8b6f3
  async calculateProjection()
  {
    this.setState({
      isLoaded: false,
    });

    let lcURL = Utils.buildFetchCalcURL();

    fetch(lcURL)
      .then(res => res.json())
      .then(
        (toResult) =>
        {
          let loMap = toResult;
          //let sql = loMap.find(loRow => loRow.key === "SQL");

          this.setState({'ProjectionURL': loMap.ProjectionURL})
          this.setState({'ProjectionText': loMap.ProjectionText})
          this.setState({'Y': loMap.Y})
          this.setState({'X': loMap.X})
          this.setState({'YDirection': loMap.YDirection})
          this.setState({'XDirection': loMap.XDirection})
          this.setState({'YMinutes': loMap.YMinutes})
          this.setState({'XMinutes': loMap.XMinutes})

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
  // Pretty cool. options get reset after componentDidMount with react-select
  render()
  {
    if (this.state.isLoaded)
    {
      return (
        <div className={'FetchedData'}>
          <div className="App-intro">
            <Grid container>
              <Grid item xs={12}>
                <strong>Projection: </strong> <a href={this.state.ProjectionURL}
                                                 target='_blank'>{this.state.ProjectionText}</a>
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
        </div>
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

export default FetchCalcs
