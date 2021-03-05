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
      lines: [],
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------
  componentDidMount()
  {
    this.getOptions(window.location.protocol + '//' + window.location.hostname + '/server/calculations/projection?latitudey=30.268735&longitudex=-97.745209&projectionnew=4326&projectionold=4326&sigfig=6');
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
          let loMap = toResult;
          //let sql = loMap.find(loRow => loRow.key === "SQL");

          console.log(loMap.SQL);
          console.log(loMap.YDirection);
          console.log(loMap.XDirection);

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
    return (
      <div className={'FetchedData'}>
        <div className="App-intro">
          <Grid container>
            <Grid item xs={12}>
              {this.state.Y}
            </Grid>
            <Grid item xs={12}>
              {this.state.X}
            </Grid>
            <Grid item xs={12}>
              {this.state.YDirection}
            </Grid>
            <Grid item xs={12}>
              {this.state.XDirection}
            </Grid>
            <Grid item xs={12}>
              {this.state.YMinutes}
            </Grid>
            <Grid item xs={12}>
              {this.state.XMinutes}
            </Grid>
          </Grid>

        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------

}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export default FetchCalcs
