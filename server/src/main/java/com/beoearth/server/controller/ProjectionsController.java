/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

package com.beoearth.server.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// Launch path for Swagger UI: http://localhost:8999/server/swagger-ui/
@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = {"/projections"}, method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
public class ProjectionsController
{
  private final JsonObject foOriginalProjection = new JsonObject();

  // ---------------------------------------------------------------------------------------------------------------------
  public ProjectionsController()
  {
    this.foOriginalProjection.addProperty("key", System.getenv("REACT_APP_PROJECTION_DEFAULT_LABEL"));
    this.foOriginalProjection.addProperty("projection", System.getenv("REACT_APP_PROJECTION_DEFAULT_VALUE"));
    this.foOriginalProjection.addProperty("url", "https://en.wikipedia.org/wiki/World_Geodetic_System");
  }

  // ---------------------------------------------------------------------------------------------------------------------
  @RequestMapping(value = {"/list-all"}, method = RequestMethod.GET)
  public String getProjectionsListAll()
  {
    final JsonArray laProjections = new JsonArray();

    JsonObject loProjection;

    loProjection = new JsonObject();
    loProjection.addProperty("key", "NAD27");
    loProjection.addProperty("projection", 4267);
    loProjection.addProperty("url", "https://en.wikipedia.org/wiki/North_American_Datum");
    laProjections.add(loProjection);

    laProjections.add(this.foOriginalProjection);

    loProjection = new JsonObject();
    loProjection.addProperty("key", "UTM");

    int lnUTMValue;
    try
    {
      lnUTMValue = Integer.parseInt(System.getenv("REACT_APP_PROJECTION_UTM_VALUE"));
    }
    catch (final NumberFormatException loErr)
    {
      lnUTMValue = 0;

      loErr.printStackTrace();
    }

    loProjection.addProperty("projection", lnUTMValue);
    loProjection.addProperty("url", "https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system");
    laProjections.add(loProjection);

    return (laProjections.toString());
  }

  // ---------------------------------------------------------------------------------------------------------------------
  @RequestMapping(value = {"/list-first"}, method = RequestMethod.GET)
  public String getProjectionsListFirst()
  {
    final JsonArray laProjections = new JsonArray();

    laProjections.add(this.foOriginalProjection);

    return (laProjections.toString());
  }
  // ---------------------------------------------------------------------------------------------------------------------


}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
