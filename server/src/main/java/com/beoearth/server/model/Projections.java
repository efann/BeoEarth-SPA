/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

package com.beoearth.server.model;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
public class Projections
{
  public static final Projections INSTANCE = new Projections();

  private final JsonObject foOriginalProjection = new JsonObject();
  private final JsonArray foAllProjections = new JsonArray();

  // ---------------------------------------------------------------------------------------------------------------------
  private Projections()
  {
    this.foOriginalProjection.addProperty("key", "WGS84");
    this.foOriginalProjection.addProperty("projection", "4326");
    this.foOriginalProjection.addProperty("url", "https://en.wikipedia.org/wiki/World_Geodetic_System");
  }

  // ---------------------------------------------------------------------------------------------------------------------
  synchronized private void initializeJSON()
  {
    if (this.foAllProjections.size() > 0)
    {
      return;
    }

    JsonObject loProjection;

    loProjection = new JsonObject();
    loProjection.addProperty("key", "NAD27");
    loProjection.addProperty("projection", 4267);
    loProjection.addProperty("url", "https://en.wikipedia.org/wiki/North_American_Datum");
    this.foAllProjections.add(loProjection);

    this.foAllProjections.add(this.getOriginalProjection());

    loProjection = new JsonObject();
    loProjection.addProperty("key", "UTM");
    loProjection.addProperty("projection", -1);
    loProjection.addProperty("url", "https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system");

    this.foAllProjections.add(loProjection);
  }

  // ---------------------------------------------------------------------------------------------------------------------
  public JsonObject getOriginalProjection()
  {
    return (this.foOriginalProjection);
  }

  // ---------------------------------------------------------------------------------------------------------------------
  public JsonArray getAllProjections()
  {
    this.initializeJSON();

    return (this.foAllProjections);
  }
  // ---------------------------------------------------------------------------------------------------------------------

}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
