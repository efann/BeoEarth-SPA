/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import Paper from '@material-ui/core/Paper';
import React from 'react'
import GenerateLinkForLists from './blocks/generateLinkForLists';
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
          <li><GenerateLinkForLists TextPrefix={'React'} URL={'https://reactjs.org/'}/></li>
          <ul>
            <li><GenerateLinkForLists TextPrefix={'Material-Ui'} URL={'https://material-ui.com/'}/></li>
            <li><GenerateLinkForLists TextPrefix={'React Awesome Lightbox'}
                                      URL={'https://www.npmjs.com/package/react-awesome-lightbox'}/>
            </li>
            <li><GenerateLinkForLists TextPrefix={'React Select'} URL={'https://react-select.com/home'}/></li>
          </ul>
          <li><GenerateLinkForLists TextPrefix={'Spring Boot'} URL={'https://spring.io/projects/spring-boot'}/></li>
          <li><GenerateLinkForLists TextPrefix={'PostgreSQL'} URL={'https://www.postgresql.org/'}/></li>
          <li><GenerateLinkForLists TextPrefix={'PostGIS'} URL={'https://postgis.net/'}/></li>
          <li><GenerateLinkForLists TextPrefix={'Docker'} URL={'https://www.docker.com/'}/></li>
        </ul>
      </Paper>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------------------------------

export default About
