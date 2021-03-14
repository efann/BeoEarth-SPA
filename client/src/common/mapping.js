/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import {Utils} from './utils';

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

// From https://stackoverflow.com/questions/43714895/google-is-not-defined-in-react-app-using-create-react-app
/* global google */
const google = window.google;

export const Mapping =
  {
    DEFAULT_ZOOM: 14,
    DEFAULT_LAT: 30.268735,
    DEFAULT_LNG: -97.745209,
    DEFAULT_ADDR: '298 Pecan St, Austin, TX 78701',
    DEFAULT_SIGFIG: 6,

    foGoogleMap: null,
    foInfoWindow: null,
    foPushPin: null,
    foGeocoder: null,
    foAutoComplete: null,

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
      let loLatLng = new google.maps.LatLng(Mapping.DEFAULT_LAT, Mapping.DEFAULT_LNG);

      let loOptionsMap =
        {
          zoom: 14,
          center: loLatLng,
          mapTypeId: google.maps.MapTypeId.TERRAIN,
          streetViewControl: true
        }

      Mapping.foGoogleMap = new google.maps.Map(document.getElementById(Utils.ID_MAP), loOptionsMap);

      Mapping.foPushPin = Mapping.createPushPin(Mapping.foGoogleMap);

      // From https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete#maps_places_autocomplete-javascript
      let loInput = document.getElementById(Utils.ID_ADDRESS);

      // From https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete
      Mapping.foAutoComplete = new google.maps.places.Autocomplete(loInput, {});
    },
    // ---------------------------------------------------------------------------------------------------------------------
    // toMap is the actual map
    createPushPin: function (toMap)
    {
      let loLatLng = new google.maps.LatLng(Mapping.DEFAULT_LAT, Mapping.DEFAULT_LNG);

      let loPushPin = new google.maps.Marker({
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

      return (loPushPin);
    },
    //----------------------------------------------------------------------------------------------------
    setupListeners: function ()
    {
      google.maps.event.addListener(Mapping.foPushPin, 'dragend', function ()
      {
        let loPostion = Mapping.foPushPin.getPosition();
        let lnLat = loPostion.lat();
        let lnLng = loPostion.lng();

        let loLat = document.getElementById(Utils.ID_LAT);
        let loLng = document.getElementById(Utils.ID_LNG);

        loLat.value = lnLat;
        loLng.value = lnLng;

        Utils.setGeoCodeMap(Utils.ID_LAT, lnLat);
        Utils.setGeoCodeMap(Utils.ID_LNG, lnLng);

        Utils.foState.updateFetchCalc();
      });

    },
    // ---------------------------------------------------------------------------------------------------------------------
    // toMap is the actual map
    initializeGoogleMaps: function (toState)
    {
      Utils.foState = toState;

      Mapping.setupGoogleMaps();
      Mapping.setupListeners();

    }
    // ---------------------------------------------------------------------------------------------------------------------
  }
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
