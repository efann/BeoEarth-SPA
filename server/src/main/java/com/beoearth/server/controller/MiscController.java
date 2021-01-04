/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

package com.beoearth.server.controller;

import com.google.gson.JsonObject;
import org.apache.catalina.filters.RemoteIpFilter;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// Launch path for Swagger UI: http://localhost:8999/server/swagger-ui/
@RestController
@RequestMapping(value = {"/misc"}, method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
public class MiscController
{
  private final JsonObject foOriginalProjection = new JsonObject();

  // ---------------------------------------------------------------------------------------------------------------------
  // Doesn't work as the container masks the IP Address since the Java Server is getting the request from the container
  // then the client.
  @RequestMapping(value = {"/ipaddress"}, method = RequestMethod.GET)
  public String getIPAddress(final HttpServletRequest toRequest)
  {
    final JsonObject loProjection;
    loProjection = new JsonObject();
    loProjection.addProperty("IPAddress", toRequest.getRemoteAddr());

    Enumeration<String> laHeaderNames = toRequest.getHeaderNames();
    while (laHeaderNames.hasMoreElements())
    {
      final String lcKey = laHeaderNames.nextElement();
      final String lcValue = toRequest.getHeader(lcKey);
      loProjection.addProperty(lcKey, lcValue);
    }

    final RemoteIpFilter loFilter = new RemoteIpFilter();

    loProjection.addProperty("ZIPAddress", loFilter.getRemoteIpHeader());

    return (loProjection.toString());
  }

  // ---------------------------------------------------------------------------------------------------------------------


}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
