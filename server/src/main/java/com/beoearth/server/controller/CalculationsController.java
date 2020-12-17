/*
 * BeoEarth SPA
 * Copyright(c) 2009-2020, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

package com.beoearth.server.controller;

import com.beoearth.server.model.DataUTM;
import com.google.gson.JsonArray;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// Launch path for Swagger UI: http://localhost:8999/server/swagger-ui/
@RestController
@RequestMapping(value = {"/calculations"}, method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
public class CalculationsController
{
  // ---------------------------------------------------------------------------------------------------------------------
  @RequestMapping(value = {"/calc"}, method = RequestMethod.GET)
  public String getCalculationsGeoCode()
  {
    DataUTM loData = new DataUTM();
    //    @Query("SELECT b FROM study.Board b WHERE b.title like %?1% ORDER BY b.seq DESC", nativeQuery = true);

    final JsonArray laProjections = new JsonArray();

    return (laProjections.toString());

//    SELECT data."UTMZoneSRID"(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326)) As SRID, data."UTMZone"(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326)) As Zone, st_x(ST_Transform(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326), data."UTMZoneSRID"(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326)))) As x, st_y(ST_Transform(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326), data."UTMZoneSRID"(ST_SetSRID(ST_MakePoint(-97.74520899999999, 30.268735), 4326)))) As y LIMIT 1;

  }
// ---------------------------------------------------------------------------------------------------------------------

}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
