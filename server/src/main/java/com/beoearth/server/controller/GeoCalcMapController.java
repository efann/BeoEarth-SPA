/*
 * BeoEarth
 * Copyright(c) 2009-2020, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

package com.beoearth.server.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
@RestController
@SpringBootApplication
public class GeoCalcMapController
{
  // ---------------------------------------------------------------------------------------------------------------------
  @RequestMapping(value = "/projections")
  public String getProjections()
  {
    final JsonArray laProjections = new JsonArray();

    JsonObject loProjection;

    loProjection = new JsonObject();
    loProjection.addProperty("key", "NAD27");
    loProjection.addProperty("projection", 4267);
    loProjection.addProperty("url", "https://en.wikipedia.org/wiki/North_American_Datum");
    laProjections.add(loProjection);

    loProjection = new JsonObject();
    loProjection.addProperty("key", "WGS84");
    loProjection.addProperty("projection", 4326);
    loProjection.addProperty("url", "https://en.wikipedia.org/wiki/World_Geodetic_System");
    laProjections.add(loProjection);

    loProjection = new JsonObject();
    loProjection.addProperty("key", "UTM");
    loProjection.addProperty("projection", -1);
    loProjection.addProperty("url", "https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system");
    laProjections.add(loProjection);

    return (laProjections.toString());
  }
  // ---------------------------------------------------------------------------------------------------------------------


}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
