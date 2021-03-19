/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Paper from '@material-ui/core/Paper';
import React from 'react'
import GenerateLink from './common/generateLink';
import useStyles from './common/useStyles';
import {Utils} from './common/utils';

function About()
{
  const classes = useStyles();


  // ---------------------------------------------------------------------------------------------------------------------
  React.useEffect(() =>
  {
    Utils.setupResizing();

  }, []);
  // ---------------------------------------------------------------------------------------------------------------------

  return (
    <div id={Utils.ID_APP_CONTENT}>
      <Paper className={classes.paper}>
        <h2>About</h2>
        <p>This application was written with the following frameworks / tools.</p>
        <ul>
          <li><GenerateLink
            TextPrefix={'React'}
            URL={'https://reactjs.org/'}
            URL_Type={Utils.URL_TYPES.LIST}/>
          </li>
          <ul>
            <li><GenerateLink TextPrefix={'Material-Ui'}
                              URL={'https://material-ui.com/'}
                              URL_Type={Utils.URL_TYPES.LIST}/>
            </li>
            <li><GenerateLink TextPrefix={'React Awesome Lightbox'}
                              URL={'https://www.npmjs.com/package/react-awesome-lightbox'}
                              URL_Type={Utils.URL_TYPES.LIST}/>
            </li>
            <li><GenerateLink TextPrefix={'React Select'}
                              URL={'https://react-select.com/home'}
                              URL_Type={Utils.URL_TYPES.LIST}/>
            </li>
          </ul>
          <li><GenerateLink TextPrefix={'Spring Boot'}
                            URL={'https://spring.io/projects/spring-boot'}
                            URL_Type={Utils.URL_TYPES.LIST}/>
          </li>
          <li><GenerateLink TextPrefix={'PostgreSQL'}
                            URL={'https://www.postgresql.org/'}
                            URL_Type={Utils.URL_TYPES.LIST}/>
          </li>
          <li><GenerateLink TextPrefix={'PostGIS'}
                            URL={'https://postgis.net/'}
                            URL_Type={Utils.URL_TYPES.LIST}/>
          </li>
          <li><GenerateLink TextPrefix={'Docker'}
                            URL={'https://www.docker.com/'}
                            URL_Type={Utils.URL_TYPES.LIST}/>
          </li>
        </ul>
      </Paper>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default About
