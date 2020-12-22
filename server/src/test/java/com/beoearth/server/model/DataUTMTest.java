/*
 * BeoEarth SPA
 * Copyright(c) 2009-2020, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

package com.beoearth.server.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertSame;

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
class DataUTMTest
{
  // ---------------------------------------------------------------------------------------------------------------------
  @Test
  void verifyProperties()
  {
    final double lnX = 9.3342e2;
    final double lnY = -12e-10;
    final int lnSRID = 23123;
    final String lcZone = "This is a zone";

    final DataUTM loData = new DataUTM();
    loData.setX(lnX);
    loData.setY(lnY);
    loData.setSRID(lnSRID);
    loData.setZone(lcZone);

    assert (loData.getX() == lnX);
    assert (loData.getY() == lnY);
    assert (loData.getSRID() == lnSRID);
    assertSame(loData.getZone(), lcZone);
  }
  // ---------------------------------------------------------------------------------------------------------------------

}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
