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

// From https://stackoverflow.com/questions/43714895/google-is-not-defined-in-react-app-using-create-react-app
/* global google */
const google = window.google;

export const Utils =
  {
    ID_MAP: 'geocalc-map',
    ID_ADDRESS: 'txtAddress',
    ID_LAT: 'txtLatitude',
    ID_LONG: 'txtLongitude',
    ID_PROJ1: 'cboProjection1',
    ID_PROJ2: 'cboProjection2',
    ID_SIGFIG: 'sliderSigFigs',
    DEFAULT_ZOOM: 14,
    DEFAULT_LAT: 30.268735,
    DEFAULT_LNG: -97.745209,
    DEFAULT_ADDR: '298 Pecan St, Austin, TX 78701',
    GeoCodeValues: new Map(),

    foGoogleMap: null,
    foInfoWindow: null,
    foGeoCalcPushPin: null,
    foGeocoder: null,
    foAutoComplete: null,

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
    createMapOptions: function ()
    {
      return {
        streetViewControl: true,
        scrollwheel: false,
        mapTypeId: 'terrain',
        mapTypeControl: true,
        fullscreenControl: false,
        mapTypeControlOptions: {mapTypeIds: ['terrain', 'satellite', 'hybrid', 'roadmap']},
      }
    },

    // ---------------------------------------------------------------------------------------------------------------------
    // toMap is the actual map
    // toGoogleMaps is a reference to google.maps.*
    setupGoogleMaps: function ()
    {
      let loLatLng = new google.maps.LatLng(Utils.DEFAULT_LAT, Utils.DEFAULT_LNG);

      let loOptionsMap =
        {
          zoom: 14,
          center: loLatLng,
          mapTypeId: google.maps.MapTypeId.TERRAIN,
          streetViewControl: true
        }

      Utils.foGoogleMap = new google.maps.Map(document.getElementById(Utils.ID_MAP), loOptionsMap);

      let loMarker = Utils.setupMarker(Utils.foGoogleMap);

      // From https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete#maps_places_autocomplete-javascript
      const loInput = document.getElementById(Utils.ID_ADDRESS);

      const laOptionsAuto = {
        componentRestrictions: {country: 'us'},
        fields: ['formatted_address', 'geometry', 'name'],
        strictBounds: false,
        types: ['establishment'],
      };

      const loAutoComplete = new google.maps.places.Autocomplete(loInput, laOptionsAuto);
    },
    // ---------------------------------------------------------------------------------------------------------------------
    // toMap is the actual map
    setupMarker: function (toMap)
    {
      let loLatLng = new google.maps.LatLng(Utils.DEFAULT_LAT, Utils.DEFAULT_LNG);

      let loMarker = new google.maps.Marker({
        position: loLatLng,
        map: toMap,
        draggable: true,
        visible: true,
        icon: {
          path: 'm46.9118,147.461c-3.466,-16.571 -9.5772,-30.36 -16.9792,-43.141c-5.4904,-9.4809 -11.8507,-18.2311 -17.7357,-27.4242c-1.9645,-3.0687 -3.6599,-6.3114 -5.54763,-9.49599c-3.77455,-6.3686 -6.83486,-13.7525 -6.6404,-23.3307c0.18999,-9.3584 2.96912,-16.8654 6.97667,-23.0032c6.59126,-10.0953 17.63176,-18.37228 32.44546,-20.54746c12.112,-1.77846 23.4679,1.2262 31.5212,5.81221c6.5802,3.74755 11.6766,8.75355 15.5499,14.65325c4.0428,6.1577 6.8275,13.4325 7.0608,22.9214c0.11971,4.8615 -0.6978,9.3636 -1.84949,13.0979c-1.165,3.7799 -3.0396,6.9396 -4.7069,10.3146c-3.2554,6.58839 -7.3361,12.62469 -11.4314,18.6645c-12.1991,17.9907 -23.6488,36.3387 -28.6633,61.4787l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0z',
          fillColor: 'teal',
          fillOpacity: 0.9,
          scale: 0.25,
          strokeColor: 'black',
          anchor: new google.maps.Point(46, 148)
        },
        title: 'Drag & Drop Marker'
      });

      return (loMarker);
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
  }
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
