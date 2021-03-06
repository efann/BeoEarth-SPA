/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

package com.beoearth.server;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
public class Utils
{
  public static final Utils INSTANCE = new Utils();

  private final JsonObject foOriginalProjection = new JsonObject();
  private final JsonArray foAllProjections = new JsonArray();

  private boolean flJSONInitiated = false;

  // ---------------------------------------------------------------------------------------------------------------------
  private Utils()
  {
    this.foOriginalProjection.addProperty("key", this.getenv("REACT_APP_PROJECTION_DEFAULT_LABEL"));
    this.foOriginalProjection.addProperty("projection", this.getenv("REACT_APP_PROJECTION_DEFAULT_VALUE"));
    this.foOriginalProjection.addProperty("url", "https://en.wikipedia.org/wiki/World_Geodetic_System");
  }

  // ---------------------------------------------------------------------------------------------------------------------
  synchronized private void initializeJSON()
  {
    if (this.flJSONInitiated)
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

    int lnUTMValue;
    try
    {
      lnUTMValue = Integer.parseInt(this.getenv("REACT_APP_PROJECTION_UTM_VALUE"));
    }
    catch (final NumberFormatException loErr)
    {
      lnUTMValue = 0;

      loErr.printStackTrace();
    }

    loProjection.addProperty("projection", lnUTMValue);
    loProjection.addProperty("url", "https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system");
    this.foAllProjections.add(loProjection);

    this.flJSONInitiated = true;
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // Unfortunately, with testing, I can't query the environment variables. So this is a work-around.
  public String getenv(final String tcName)
  {
    String lcValue = System.getenv(tcName);
    if ((lcValue == null) || (lcValue.isEmpty()))
    {
      switch (tcName)
      {
        case "REACT_APP_PROJECTION_DEFAULT_LABEL":
          lcValue = "WGS84";
          break;

        case "REACT_APP_PROJECTION_DEFAULT_VALUE":
          lcValue = "4326";
          break;

        case "REACT_APP_PROJECTION_UTM_VALUE":
          lcValue = "-1";
          break;

        default:
          lcValue = String.format("%s is not recognized in Utils.getenv", tcName);
          break;
      }

    }

    return (lcValue);
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
