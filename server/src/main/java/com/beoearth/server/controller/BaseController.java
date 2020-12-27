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
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
@RestController
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
  // From https://technology.amis.nl/2018/02/22/java-how-to-fix-spring-autowired-annotation-not-working-issues/
  // Autowire only works in the initializing Application.
  // When a new instance is created not by Spring but by for example manually calling a constructor,
  // the instance of the class will not be registered in the Spring context and thus not available for dependency injection.
  public void setDataSource(final DataSource toDataSource)
  {
    if (toDataSource == null)
    {
      System.err.println("Datasource is null. This should not be null.");
      return;
    }

    System.out.println("Setting the datasource.");
    this.foDataSource = toDataSource;
    this.getJdbcTemplate().setDataSource(this.foDataSource);
  }

  // ---------------------------------------------------------------------------------------------------------------------
  public void setDataSource()
  {
    final JdbcTemplate loTemplate = this.getJdbcTemplate();
    if (this.foDataSource == null)
    {
      System.err.println("Datasource is null.");
      return;
    }

    if (this.foDataSource.equals(loTemplate.getDataSource()))
    {
      System.err.println("Datasource is the same so skipping.");
      return;
    }

    loTemplate.setDataSource(this.getDataSource());

  }

  // ---------------------------------------------------------------------------------------------------------------------
}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
