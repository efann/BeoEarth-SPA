/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Map from "./blocks/map";

import './style/App.css';

const location = {
  address: '298 Pecan St, Austin, TX 78701, USA',
  lat: 30.268735,
  lng: -97.745209,
} // our location object from earlier

function App()
{
  return (
    <div className="App">
      <Map toLocation={location} tnZoomLevel={17} />
    </div>
  );
}

export default App;
