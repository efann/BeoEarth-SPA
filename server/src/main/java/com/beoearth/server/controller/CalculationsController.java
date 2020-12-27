/*
 * BeoEarth SPA
 * Copyright(c) 2009-2020, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

package com.beoearth.server.controller;

import com.google.gson.JsonObject;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// Launch path for Swagger UI: http://localhost:8999/server/swagger-ui/
@RestController
@RequestMapping(value = {"/calculations"}, method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
public class CalculationsController extends BaseController
{

  // ---------------------------------------------------------------------------------------------------------------------
  // From https://www.baeldung.com/spring-requestmapping
  @RequestMapping(value = {"/UTM"}, method = RequestMethod.GET)
  public String getGISCalculationsUTM(
    @Validated
    @RequestParam("latitudey") double tnLatitudeY,
    @Validated
    @RequestParam("longitudex") double tnLongitudeX,
    @Validated
    @RequestParam("projection") int tnProjection
  )
  {
    this.setDataSource();

    final var lcGeometry = String.format("ST_SetSRID(ST_MakePoint(%f, %f), %d)", tnLongitudeX, tnLatitudeY, tnProjection);
    // From https://stackoverflow.com/questions/6891175/reuse-a-parameter-in-string-format
    // Reuse parameter
    final var lcSQL = String.format("SELECT data.\"UTMZoneSRID\"(%1$s) As SRID, data.\"UTMZone\"(%1$s) As Zone, st_x(ST_Transform(%1$s, data.\"UTMZoneSRID\"(%1$s))) As x, st_y(ST_Transform(%1$s, data.\"UTMZoneSRID\"(%1$s))) As y LIMIT 1;", lcGeometry);

    final var loProjection = new JsonObject();

    loProjection.addProperty("SQL", lcSQL);
    loProjection.addProperty("LongitudeX", tnLongitudeX);
    loProjection.addProperty("LatitudeY", tnLatitudeY);
    loProjection.addProperty("Projection", tnProjection);

    try
    {
      // From https://mkyong.com/spring/spring-jdbctemplate-querying-examples/
      List<Map<String, Object>> laRows = this.getJdbcTemplate().queryForList(lcSQL);

      laRows.forEach(loRow ->
      {
        loProjection.addProperty("SRID", loRow.get("SRID").toString());
        loProjection.addProperty("X", (Double) loRow.get("X"));
        loProjection.addProperty("Y", (Double) loRow.get("Y"));
        loProjection.addProperty("Zone", loRow.get("Zone").toString());
      });

    }
    catch (Exception loErr)
    {
      loProjection.addProperty("Error", loErr.getMessage());
    }

    return (loProjection.toString());

  }

  // ---------------------------------------------------------------------------------------------------------------------
  // From https://www.baeldung.com/spring-requestmapping
  @RequestMapping(value = {"/projection"}, method = RequestMethod.GET)
  public String getGISCalculationsProjection(
    @Validated
    @RequestParam("latitudey") double tnLatitudeY,
    @Validated
    @RequestParam("longitudex") double tnLongitudeX,
    @Validated
    @RequestParam("projectionold") int tnProjectionOld,
    @Validated
    @RequestParam("projectionnew") int tnProjectionNew
  )
  {
    this.setDataSource();

    final var lcGeometry = String.format("ST_SetSRID(ST_MakePoint(%f, %f), %d)", tnLongitudeX, tnLatitudeY, tnProjectionOld);

    // From https://stackoverflow.com/questions/6891175/reuse-a-parameter-in-string-format
    // Reuse parameter
    final var lcSQL = String.format("SELECT st_x(ST_Transform(%1$s, %2$d)) As X, st_y(ST_Transform(%1$s, %2$d)) As Y LIMIT 1;", lcGeometry, tnProjectionNew);

    final var loProjection = new JsonObject();

    loProjection.addProperty("SQL", lcSQL);
    loProjection.addProperty("LongitudeX", tnLongitudeX);
    loProjection.addProperty("LatitudeY", tnLatitudeY);
    loProjection.addProperty("ProjectionOld", tnProjectionOld);
    loProjection.addProperty("ProjectionNew", tnProjectionNew);

    try
    {
      // From https://mkyong.com/spring/spring-jdbctemplate-querying-examples/
      List<Map<String, Object>> laRows = this.getJdbcTemplate().queryForList(lcSQL);

      laRows.forEach(loRow ->
      {
        loProjection.addProperty("X", (Double) loRow.get("X"));
        loProjection.addProperty("Y", (Double) loRow.get("Y"));
      });

    }
    catch (Exception loErr)
    {
      loProjection.addProperty("Error", loErr.getMessage());
    }

    return (loProjection.toString());

  }

  // ---------------------------------------------------------------------------------------------------------------------

}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
