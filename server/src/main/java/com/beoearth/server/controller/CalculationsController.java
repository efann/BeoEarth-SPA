/*
 * BeoEarth SPA
 * Copyright(c) 2009-2020, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

package com.beoearth.server.controller;

import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// Launch path for Swagger UI: http://localhost:8999/server/swagger-ui/
@RestController
@RequestMapping(value = {"/calculations"}, method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
public class CalculationsController
{
  // From https://stackoverflow.com/questions/43142703/get-a-reference-to-currently-active-datasource-in-spring-boot
  @Autowired
  private DataSource foDataSource;

  final private JdbcTemplate foJdbcTemplate = new JdbcTemplate();

  // ---------------------------------------------------------------------------------------------------------------------
  @RequestMapping(value = {"/UTM"}, method = RequestMethod.GET)
  public String getCalculationsGeoCode()
  {
    this.setDataSource();

    final String lcSQL = "SELECT data.\"UTMZoneSRID\"(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326)) As SRID, "
      + "data.\"UTMZone\"(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326)) As Zone, "
      + "st_x(ST_Transform(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326), "
      + "data.\"UTMZoneSRID\"(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326)))) As X, "
      + "st_y(ST_Transform(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326), "
      + "data.\"UTMZoneSRID\"(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326)))) As Y LIMIT 1;";

    final JsonObject loProjection = new JsonObject();

    try
    {
      // From https://mkyong.com/spring/spring-jdbctemplate-querying-examples/
      List<Map<String, Object>> laRows = this.foJdbcTemplate.queryForList(lcSQL);

      for (final Map loRow : laRows)
      {
        loProjection.addProperty("SRID", loRow.get("SRID").toString());
        loProjection.addProperty("X", (Double) loRow.get("X"));
        loProjection.addProperty("Y", (Double) loRow.get("Y"));
        loProjection.addProperty("Zone", loRow.get("Zone").toString());
      }

    }
    catch (Exception loErr)
    {
      loProjection.addProperty("Error", loErr.getMessage());
    }

    return (loProjection.toString());

//    SELECT data."UTMZoneSRID"(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326)) As SRID, data."UTMZone"(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326)) As Zone, st_x(ST_Transform(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326), data."UTMZoneSRID"(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326)))) As x, st_y(ST_Transform(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326), data."UTMZoneSRID"(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326)))) As y LIMIT 1;

  }

  // ---------------------------------------------------------------------------------------------------------------------
  private void setDataSource()
  {
    if (this.foJdbcTemplate.getDataSource() == null)
    {
      this.foJdbcTemplate.setDataSource(this.foDataSource);
    }
  }
  // ---------------------------------------------------------------------------------------------------------------------

}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
