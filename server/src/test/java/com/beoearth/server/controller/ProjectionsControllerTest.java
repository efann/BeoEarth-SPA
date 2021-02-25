/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

package com.beoearth.server.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
@SpringBootTest
class ProjectionsControllerTest
{

  // ---------------------------------------------------------------------------------------------------------------------
  @Test
  void getProjectionsListAll()
  {
    // I can't test for this variable as it only exists in the container.
    // assertNotNull(System.getenv("REACT_APP_PROJECTION_UTM_VALUE"));

    ProjectionsController loProjections = new ProjectionsController();

    // By the way, JsonParser.parseString will throw a com.google.gson.JsonSyntaxException on error.
    // From https://stackoverflow.com/questions/36832289/how-to-make-a-junit-test-case-fail-if-there-is-any-exception-in-the-code
    // any exception will cause a test to fail. So below should work.

    JsonElement loElement = JsonParser.parseString(loProjections.getProjectionsListAll());
    assert (loElement instanceof JsonArray);
  }

  // ---------------------------------------------------------------------------------------------------------------------
  @Test
  void getProjectionsListFirst()
  {
    final ProjectionsController loProjections = new ProjectionsController();

    // By the way, JsonParser.parseString will throw a com.google.gson.JsonSyntaxException on error.
    // From https://stackoverflow.com/questions/36832289/how-to-make-a-junit-test-case-fail-if-there-is-any-exception-in-the-code
    // any exception will cause a test to fail. So below should work.

    final JsonElement loElement = JsonParser.parseString(loProjections.getProjectionsListFirst());
    assert (loElement instanceof JsonArray);
  }
  // ---------------------------------------------------------------------------------------------------------------------

}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
