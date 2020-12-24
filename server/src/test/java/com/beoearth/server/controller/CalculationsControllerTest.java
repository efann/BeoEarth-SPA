/*
 * BeoEarth SPA
 * Copyright(c) 2009-2020, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

package com.beoearth.server.controller;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.junit.jupiter.api.Test;

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
class CalculationsControllerTest
{

  // ---------------------------------------------------------------------------------------------------------------------
  @Test
  void getCalculationsUTM()
  {
    final var loCalc = new CalculationsController();

    // At the moment, I can't connect to the database to test.
    final JsonElement loElement = JsonParser.parseString(loCalc.getGISCalculationsUTM(30.26, -97.746, 4326));
    assert (loElement instanceof JsonObject);

    JsonObject loJson = (JsonObject) loElement;

    System.out.println("======================================");
    System.out.println(loJson.toString());
    System.out.println("======================================");

//    final int lnSRID = Integer.parseInt(loJson.get("SRID").getAsString());

//    final String lcZone = loJson.get("Zone").getAsString();
//    assert ((lnSRID != 0) && (lcZone != null) && (!lcZone.isEmpty()));
  }
  // ---------------------------------------------------------------------------------------------------------------------
  @Test
  void getCalculationsProject()
  {
    final var loCalc = new CalculationsController();

    // At the moment, I can't connect to the database to test.
    final JsonElement loElement = JsonParser.parseString(loCalc.getGISCalculationsProjection(30.26, -97.746, 4326, 4267));
    assert (loElement instanceof JsonObject);

    JsonObject loJson = (JsonObject) loElement;

    System.out.println("======================================");
    System.out.println(loJson.toString());
    System.out.println("======================================");

//    final int lnSRID = Integer.parseInt(loJson.get("SRID").getAsString());

//    final String lcZone = loJson.get("Zone").getAsString();
//    assert ((lnSRID != 0) && (lcZone != null) && (!lcZone.isEmpty()));
  }
  // ---------------------------------------------------------------------------------------------------------------------

}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
