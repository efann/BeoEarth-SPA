/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export const Utils =
  {
    ID_MAP: 'geocalc-map',
    ID_ADDRESS: 'txtAddress',
    ID_LAT: 'txtLatitude',
    ID_LNG: 'txtLongitude',
    ID_PROJ1: 'cboProjection1',
    ID_PROJ2: 'cboProjection2',
    ID_SIGFIG: 'sliderSigFigs',
    ID_FETCHCALC: 'fetchCalc',
    ID_APP_CONTENT: 'beoearth-app-content',

    DEFAULT_ZOOM: 14,
    DEFAULT_LAT: 30.268735,
    DEFAULT_LNG: -97.745209,
    DEFAULT_ADDR: '298 Pecan St, Austin, TX 78701',
    DEFAULT_SIGFIG: 6,

    STATUS_FETCHCALC: 'status_fetchcalc',

    URL_TYPES: {
      REGULAR: 1,
      LIST: 2,
    },

    GeoCodeValues: new Map(),
    foState: null,

    foHeaderTag: null,
    foAppContentID: null,

    // ---------------------------------------------------------------------------------------------------------------------
    getYear: () => new Date().getFullYear(),
    // ---------------------------------------------------------------------------------------------------------------------
    getCurrentDate: () =>
    {
      let loDate = new Date();
      // Not quite sure why the below format is working correctly displays in that order.
      // Monday, January 4, 2021
      return (loDate.toLocaleString('default', {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'}));
    },

    // ---------------------------------------------------------------------------------------------------------------------
    setupResizing: function ()
    {
      Utils.foHeaderTag = document.getElementsByTagName('header').item(0);
      Utils.foAppContentID = document.getElementById(Utils.ID_APP_CONTENT);

      Utils.onResizeActions();
      window.addEventListener('resize', Utils.onResizeActions);
    },

    // ---------------------------------------------------------------------------------------------------------------------
    // From https://gitmemory.com/issue/mui-org/material-ui/18923/567494104,
    // https://github.com/mui-org/material-ui/issues/18923
    onResizeActions: function ()
    {
      let lnHeight = Utils.foHeaderTag.offsetHeight + 1;
      Utils.foAppContentID.style.paddingTop = `${lnHeight}px`;
    },
    // ---------------------------------------------------------------------------------------------------------------------
    // From https://gitmemory.com/issue/mui-org/material-ui/18923/567494104,
    // https://github.com/mui-org/material-ui/issues/18923
    fixInputNumberIssue: function ()
    {
      const loInputs = document.querySelectorAll('input[type=\'number\']')
      const lcAllowedChars = '0123456789.-';

      loInputs.forEach(loInput =>
        {
          loInput.addEventListener('keypress', toEvent =>
          {
            if (toEvent.which === 8)
            {
              return;
            }

            let lcKey = toEvent.key;
            if (lcAllowedChars.indexOf(lcKey) > -1)
            {
              return;
            }

            toEvent.preventDefault();
          });
        }
      );

    },
    // ---------------------------------------------------------------------------------------------------------------------
    // toMap is the actual map
    getURLPrefix: function ()
    {
      return (window.location.protocol + '//' + window.location.hostname + '/server/');
    },
    // ---------------------------------------------------------------------------------------------------------------------
    setGeoCodeMap: function (tcKey, toValue)
    {
      Utils.GeoCodeValues.set(tcKey, toValue);
    },
    // ---------------------------------------------------------------------------------------------------------------------
    // toMap is the actual map
    isUTM: function ()
    {
      let loProjection = Utils.GeoCodeValues.get(Utils.ID_PROJ2);
      if (Boolean(loProjection))
      {
        return (loProjection.value === -1);
      }

      return (false);
    },
    // ---------------------------------------------------------------------------------------------------------------------
    // toMap is the actual map
    buildFetchCalcURL: function ()
    {
      let lcURL = '';

      let loProj1 = Utils.GeoCodeValues.get(Utils.ID_PROJ1);
      let loProj2 = Utils.GeoCodeValues.get(Utils.ID_PROJ2);
      let lnY = Utils.GeoCodeValues.get(Utils.ID_LAT);
      let lnX = Utils.GeoCodeValues.get(Utils.ID_LNG);
      let lnSigFig = Utils.GeoCodeValues.get(Utils.ID_SIGFIG);

      if (Boolean(loProj1) && Boolean(loProj2) && Boolean(lnY) && Boolean(lnX) && (Boolean(lnSigFig) || lnSigFig === 0))
      {
        lcURL = Utils.getURLPrefix() + 'calculations/';
        // From https://www.freecodecamp.org/news/javascript-string-format-how-to-use-string-interpolation-in-js/
        // Note the use of backticks (`).
        if (!Utils.isUTM())
        {
          lcURL += `projection?latitudey=${lnY}&longitudex=${lnX}&projectionnew=${loProj2.value}&projectionold=${loProj1.value}&sigfig=${lnSigFig}`;
        }
        else
        {
          lcURL += `UTM?latitudey=${lnY}&longitudex=${lnX}&projection=${loProj1.value}&sigfig=${lnSigFig}`;
        }
      }

      return (lcURL);
    },
    // ---------------------------------------------------------------------------------------------------------------------
    loadScript: function (tcSrc, tlAsync)
    {
      let loTag = document.createElement('script');
      loTag.async = tlAsync;
      loTag.src = tcSrc;
      document.getElementsByTagName('body')[0].appendChild(loTag);
    }

    // ---------------------------------------------------------------------------------------------------------------------
  }
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
