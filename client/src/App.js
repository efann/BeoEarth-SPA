/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Map from './blocks/map';
import Projection1 from './components/projection1';
import Projection2 from './components/projection2';

import './style/App.css';

function App()
{
  return (
    <div className="App">
      <Projection1/>
      <Projection2/>
      <Map/>
    </div>
  );
}

export default App;
