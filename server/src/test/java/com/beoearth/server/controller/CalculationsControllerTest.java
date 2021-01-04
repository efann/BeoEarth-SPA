/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

package com.beoearth.server.controller;

import com.beoearth.server.ServerApplication;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.sql.DataSource;

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ServerApplication.class)
class CalculationsControllerTest
{
  @Autowired
  private DataSource foDataSource;

  final private Gson foGson = new GsonBuilder().setPrettyPrinting().create();

  // ---------------------------------------------------------------------------------------------------------------------
  @Test
  void getCalculationsUTM()
  {
    final var loCalc = new CalculationsController();

    // At the moment, I can't connect to the database to test.
    JsonElement loElement;
    loElement = JsonParser.parseString(loCalc.getGISCalculationsUTM(30.26, -97.746, 4326));
    assert (loElement instanceof JsonObject);

    JsonObject loJson;
    loJson = (JsonObject) loElement;

    System.out.println("======================================");
    System.out.println(this.foGson.toJson(loJson));
    System.out.println("======================================");

    assert (loJson.get("Error").toString().length() > 0);

    // Now set the datasource
    loCalc.setDataSource(this.foDataSource);

    loElement = JsonParser.parseString(loCalc.getGISCalculationsUTM(30.26, -97.746, 4326));
    assert (loElement instanceof JsonObject);

    loJson = (JsonObject) loElement;

    System.out.println("======================================");
    System.out.println(this.foGson.toJson(loJson));
    System.out.println("======================================");

    final int lnSRID = Integer.parseInt(loJson.get("SRID").getAsString());

    final String lcZone = loJson.get("Zone").getAsString();
    assert ((lnSRID != 0) && (lcZone != null) && (!lcZone.isEmpty()));
  }

  // ---------------------------------------------------------------------------------------------------------------------
  @Test
  void getCalculationsProject()
  {
    final var loCalc = new CalculationsController();

    JsonElement loElement;
    loElement = JsonParser.parseString(loCalc.getGISCalculationsProjection(30.26, -97.746, 4326, 4267));
    assert (loElement instanceof JsonObject);

    JsonObject loJson;
    loJson = (JsonObject) loElement;
    System.out.println("======================================");
    System.out.println(this.foGson.toJson(loJson));
    System.out.println("======================================");

    assert (loJson.get("Error").toString().length() > 0);

    // Now set the datasource
    loCalc.setDataSource(this.foDataSource);

    loElement = JsonParser.parseString(loCalc.getGISCalculationsProjection(30.26, -97.746, 4326, 4267));
    assert (loElement instanceof JsonObject);

    loJson = (JsonObject) loElement;
    System.out.println("======================================");
    System.out.println(this.foGson.toJson(loJson));
    System.out.println("======================================");

    final double lnY = loJson.get("Y").getAsDouble();
    final double lnX = loJson.get("X").getAsDouble();
    assert ((lnY != 0.0) & (lnX != 0.0));
  }

  // ---------------------------------------------------------------------------------------------------------------------

}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
