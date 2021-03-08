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
  // ---------------------------------------------------------------------------------------------------------------------
  @RequestMapping(value = {"/list-all"}, method = RequestMethod.GET)
  public String getProjectionsListAll()
  {
    return (Projections.INSTANCE.getAllProjections().toString());
  }

  // ---------------------------------------------------------------------------------------------------------------------
  @RequestMapping(value = {"/list-first"}, method = RequestMethod.GET)
  public String getProjectionsListFirst()
  {
    final JsonArray laProjections = new JsonArray();

    laProjections.add(Projections.INSTANCE.getOriginalProjection());

    return (laProjections.toString());
  }
  // ---------------------------------------------------------------------------------------------------------------------


}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
