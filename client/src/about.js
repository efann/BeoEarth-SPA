/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Paper from '@material-ui/core/Paper';
import React from 'react'
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
          <li>React: <a href={'https://reactjs.org/'} target={'_blank'} rel="noreferrer">https://reactjs.org/</a></li>
          <li>Spring Boot: <a href={'https://spring.io/projects/spring-boot'}
                              target={'_blank'} rel="noreferrer">https://spring.io/projects/spring-boot</a></li>
          <li>PostgreSQL: <a href={'https://www.postgresql.org/'} target={'_blank'}
                             rel="noreferrer">https://www.postgresql.org/</a></li>
          <li>PostGIS: <a href={'https://postgis.net/'} target={'_blank'} rel="noreferrer">https://postgis.net/</a></li>
          <li>Docker: <a href={'https://www.docker.com/'} target={'_blank'} rel="noreferrer">https://www.docker.com/</a>
          </li>
        </ul>
      </Paper>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default About
