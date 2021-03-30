/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

package com.beoearth.server.controller;

import com.beoearth.server.model.Projections;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// Launch path for Swagger UI: http://localhost:8999/server/swagger-ui/
@RestController
@RequestMapping(value = {"/calculations"}, method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
public class CalculationsController extends BaseDataController
{
  private enum Direction
  {
    DIRECTION_NONE,
    DIRECTION_NORTHSOUTH,
    DIRECTION_EASTWEST
  }

  private enum ProjectionValue
  {
    PROJECTION_VALUE_TEXT,
    PROJECTION_VALUE_URL
  }

  final private static int MAX_SIG_FIG = 12;

  // ---------------------------------------------------------------------------------------------------------------------
  // From https://www.baeldung.com/spring-requestmapping
  @RequestMapping(value = {"/UTM"}, method = RequestMethod.GET)
  public String getGISCalculationsUTM(
    @Validated
    @RequestParam("latitudey") double tnLatitudeY,
    @Validated
    @RequestParam("longitudex") double tnLongitudeX,
    @Validated
    @RequestParam("projection") int tnProjection,
    @Validated
    @RequestParam("sigfig") int tnSigFig
  )

  {
    this.setDataSource();

    // Ensure that lnSigFig is greater than or equal to 0 and less than or equal to CalculationsController.MAX_SIG_FIG.
    int lnSigFig = Integer.max(Integer.min(tnSigFig, CalculationsController.MAX_SIG_FIG), 0);

    // Finally found a way to correctly convert a double to a string without losing precision.
    // Gleaned from https://www.baeldung.com/java-separate-double-into-integer-decimal-parts
    final var lcGeometry = String.format("ST_SetSRID(ST_MakePoint(%s, %s), %d)", tnLongitudeX, tnLatitudeY, tnProjection);

    // From https://stackoverflow.com/questions/6891175/reuse-a-parameter-in-string-format
    // Reuse parameter
    final var lcSQL = String.format("SELECT data.\"UTMZoneSRID\"(%1$s) As SRID, data.\"UTMZone\"(%1$s) As Zone, st_x(ST_Transform(%1$s, data.\"UTMZoneSRID\"(%1$s))) As x, st_y(ST_Transform(%1$s, data.\"UTMZoneSRID\"(%1$s))) As y LIMIT 1;", lcGeometry);

    final var loProjection = new JsonObject();

    loProjection.addProperty("SQL", lcSQL);
    loProjection.addProperty("ProjectionURL", this.getProjectionValue(Projections.UTM_KEY, ProjectionValue.PROJECTION_VALUE_URL));
    loProjection.addProperty("ProjectionText", this.getProjectionValue(Projections.UTM_KEY, ProjectionValue.PROJECTION_VALUE_TEXT));
    loProjection.addProperty("SRID_URL", "https://en.wikipedia.org/wiki/Spatial_reference_system#Identifier");
    loProjection.addProperty("SRID_Text", "SRID");
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
        final double lnY = (Double) loRow.get("Y");
        final double lnX = (Double) loRow.get("X");
        loProjection.addProperty("Northing", this.convertToFormattedDouble(lnY, lnSigFig));
        loProjection.addProperty("Easting", this.convertToFormattedDouble(lnX, lnSigFig));
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
    @RequestParam("projectionnew") int tnProjectionNew,
    @Validated
    @RequestParam("sigfig") int tnSigFig
  )
  {
    this.setDataSource();

    // Ensure that lnSigFig is greater than or equal to 0 and less than or equal to CalculationsController.MAX_SIG_FIG.
    int lnSigFig = Integer.max(Integer.min(tnSigFig, CalculationsController.MAX_SIG_FIG), 0);

//    final var lcGeometry = String.format("ST_SetSRID(ST_MakePoint(" + CalculationsController.FORMAT_SQL_DECIMAL + ", "
//      + CalculationsController.FORMAT_SQL_DECIMAL + "), %d)", tnLongitudeX, tnLatitudeY, tnProjectionOld);

    // Finally found a way to correctly convert a double to a string without losing precision.
    // Gleaned from https://www.baeldung.com/java-separate-double-into-integer-decimal-parts
    final var lcGeometry = String.format("ST_SetSRID(ST_MakePoint(%s, %s), %d)", tnLongitudeX, tnLatitudeY, tnProjectionOld);

    // From https://stackoverflow.com/questions/6891175/reuse-a-parameter-in-string-format
    // Reuse parameter
    final var lcSQL = String.format("SELECT st_x(ST_Transform(%1$s, %2$d)) As X, st_y(ST_Transform(%1$s, %2$d)) As Y LIMIT 1;", lcGeometry, tnProjectionNew);

    final var loProjection = new JsonObject();

    loProjection.addProperty("SQL", lcSQL);
    loProjection.addProperty("ProjectionURL", this.getProjectionValue(tnProjectionNew, ProjectionValue.PROJECTION_VALUE_URL));
    loProjection.addProperty("ProjectionText", this.getProjectionValue(tnProjectionNew, ProjectionValue.PROJECTION_VALUE_TEXT));
    loProjection.addProperty("LatitudeY", tnLatitudeY);
    loProjection.addProperty("LongitudeX", tnLongitudeX);
    loProjection.addProperty("ProjectionOld", tnProjectionOld);
    loProjection.addProperty("ProjectionNew", tnProjectionNew);

    try
    {
      // From https://mkyong.com/spring/spring-jdbctemplate-querying-examples/
      List<Map<String, Object>> laRows = this.getJdbcTemplate().queryForList(lcSQL);

      laRows.forEach(loRow ->
      {
        final double lnY = (Double) loRow.get("Y");
        final double lnX = (Double) loRow.get("X");
        loProjection.addProperty("Y", this.convertToFormattedDouble(lnY, lnSigFig));
        loProjection.addProperty("X", this.convertToFormattedDouble(lnX, lnSigFig));
        loProjection.addProperty("YDirection", this.getDegreesMinutesSeconds(lnY, Direction.DIRECTION_NORTHSOUTH, lnSigFig));
        loProjection.addProperty("XDirection", this.getDegreesMinutesSeconds(lnX, Direction.DIRECTION_EASTWEST, lnSigFig));
        loProjection.addProperty("YMinutes", this.getDegreesMinutesSeconds(lnY, Direction.DIRECTION_NONE, lnSigFig));
        loProjection.addProperty("XMinutes", this.getDegreesMinutesSeconds(lnX, Direction.DIRECTION_NONE, lnSigFig));
      });

    }
    catch (Exception loErr)
    {
      loProjection.addProperty("Error", loErr.getMessage());
    }

    return (loProjection.toString());

  }

  // ---------------------------------------------------------------------------------------------------------------------
  private String convertToFormattedDouble(final double tnValue, final int tnSigFig)
  {
    final String lcFormat = "%." + tnSigFig + "f";

    return (String.format(lcFormat, tnValue));

  }

  // ---------------------------------------------------------------------------------------------------------------------
  private String getDegreesMinutesSeconds(final double tnMeasurement, final Direction tnDirection, final int tnSigFig)
  {
    final StringBuilder lcResults = new StringBuilder();

    double lnMeasurement = tnMeasurement;
    boolean llPositive = (lnMeasurement >= 0.0);

    lnMeasurement = Math.abs(lnMeasurement);

    String lcDirection = "";
    switch (tnDirection)
    {
      case DIRECTION_NONE:
        if (!llPositive)
        {
          lcResults.append("-");
        }
        break;

      case DIRECTION_NORTHSOUTH:
        lcDirection = (llPositive) ? "N" : "S";
        break;

      case DIRECTION_EASTWEST:
        lcDirection = (llPositive) ? "E" : "W";
        break;
    }

    // From https://www.baeldung.com/java-separate-double-into-integer-decimal-parts
    BigDecimal lnBigDecimal = new BigDecimal(lnMeasurement);
    final int lnDegrees = lnBigDecimal.intValue();
    final double lnFraction = lnBigDecimal.subtract(new BigDecimal(lnDegrees)).doubleValue();

    // The degree symbol causes XML to complain. So this is the HTML entity.
    // However, we're using JSON now, and Google recommends using the actual code
    // From https://google.github.io/styleguide/htmlcssguide.html#Entity_References
    lcResults.append(String.format("%d° ", lnDegrees));

    final int lnMinutes = (int) Math.floor(lnFraction * 60.0);

    double lnSecondsFraction;
    if (tnDirection == Direction.DIRECTION_NONE)
    {
      // You have to convert seconds to minutes; hence the times 60.
      lnSecondsFraction = (lnFraction - (lnMinutes / 60.0)) * 60.0;

      lcResults.append(this.convertToFormattedDouble(lnMinutes + lnSecondsFraction, tnSigFig));
    }
    else
    {
      lcResults.append(String.format("%d' ", lnMinutes));

      lnSecondsFraction = (lnFraction - (lnMinutes / 60.0)) * 3600.0;

      lcResults.append(this.convertToFormattedDouble(lnSecondsFraction, tnSigFig));
      lcResults.append("\" ").append(lcDirection);
    }

    return (lcResults.toString());
  }

  // ---------------------------------------------------------------------------------------------------------------------
  private String getProjectionValue(final int tnProjection, final ProjectionValue tnValue)
  {
    final JsonArray laProjections = Projections.INSTANCE.getAllProjections();

    String lcValue = "";
    final int lnSize = laProjections.size();
    for (int i = 0; i < lnSize; ++i)
    {
      final JsonObject loRow = (JsonObject) laProjections.get(i);
      final int lnProjection = loRow.get("projection").getAsInt();
      if (lnProjection == tnProjection)
      {
        switch (tnValue)
        {
          case PROJECTION_VALUE_TEXT:
            lcValue = loRow.get("key").toString().replaceAll("\"", "");
            break;
          case PROJECTION_VALUE_URL:
            lcValue = loRow.get("url").toString().replaceAll("\"", "");
            break;
        }

        break;
      }
    }

    return (lcValue);
  }
  // ---------------------------------------------------------------------------------------------------------------------

}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
