/*
 * BeoEarth SPA
 * Copyright(c) 2009-2020, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

package com.beoearth.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
public class BaseController
{
  // From https://stackoverflow.com/questions/43142703/get-a-reference-to-currently-active-datasource-in-spring-boot
  @Autowired
  private DataSource foDataSource;

  final private JdbcTemplate foJdbcTemplate = new JdbcTemplate();

  // ---------------------------------------------------------------------------------------------------------------------
  public JdbcTemplate getJdbcTemplate()
  {
    return (this.foJdbcTemplate);
  }

  // ---------------------------------------------------------------------------------------------------------------------
  public DataSource getDataSource()
  {
    return (this.foDataSource);
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // Used by testing as Autowire is not run for the actual controller due to the ServerApplication not being
  // initialized.
  public void setDataSource(final DataSource toDataSource)
  {
    this.foDataSource = toDataSource;
  }
  // ---------------------------------------------------------------------------------------------------------------------
}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
