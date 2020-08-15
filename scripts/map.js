am4core.ready(function () {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create map instance
  var chart = am4core.create("chartdiv", am4maps.MapChart);

  // Set map definition
  chart.geodata = am4geodata_worldLow;

  // Set projection
  chart.projection = new am4maps.projections.Miller();

  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

  // Exclude Antartica
  polygonSeries.exclude = ["AQ"];

  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true;

  // Configure series
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}";
  polygonTemplate.fill = chart.colors.getIndex(0).lighten(0.5);

  // Create hover state and set alternative fill color
  var hs = polygonTemplate.states.create("hover");
  hs.properties.fill = chart.colors.getIndex(0);

  // Add image series
  var imageSeries = chart.series.push(new am4maps.MapImageSeries());
  imageSeries.mapImages.template.propertyFields.longitude = "longitude";
  imageSeries.mapImages.template.propertyFields.latitude = "latitude";
  imageSeries.data = [
    {
      title: "Lebanon",
      latitude: 33.88863,
      longitude: 35.49548,
    },
    {
      title: "Britain",
      latitude: 51.5002,
      longitude: -0.1262,
      url: "http://www.google.co.uk",
    },

    {
      title: "Spain",
      latitude: 40.2085,
      longitude: -3.713,
    },

    {
      title: "Germany",
      latitude: 51.5167,
      longitude: 9.9167,
    },
    {
      title: "Pakistan",
      latitude: 30.3753,
      longitude: 69.3451,
    },
    {
      title: "Bangladesh",
      latitude: 23.777176,
      longitude: 90.399452,
    },
    {
      title: "Brazil",
      latitude: -10,
      longitude: -55,
    },
    {
      title: "Poland",
      latitude: 51.9194,
      longitude: 19.1451,
    },
    {
      title: "Oman",
      latitude: 20.726467,
      longitude: 58.527332,
    },
    {
      title: "Jordan",
      latitude: 31.963158,
      longitude: 35.930359,
    },
    {
      title: "Nebal",
      latitude: 27.700769,
      longitude: 85.30014,
    },
    {
      title: "Uzbekistan",
      latitude: 41.311081,
      longitude: 69.240562,
    },
    {
      title: "Tunisia",
      latitude: 36.806389,
      longitude: 10.181667,
    },
    {
      title: "India",
      latitude: 21.295132,
      longitude: 78.387451,
    },
  ];

  // add events to recalculate map position when the map is moved or zoomed
  chart.events.on("ready", updateCustomMarkers);
  chart.events.on("mappositionchanged", updateCustomMarkers);

  // this function will take current images on the map and create HTML elements for them
  function updateCustomMarkers(event) {
    // go through all of the images
    imageSeries.mapImages.each(function (image) {
      // check if it has corresponding HTML element
      if (!image.dummyData || !image.dummyData.externalElement) {
        // create onex
        image.dummyData = {
          externalElement: createCustomMarker(image),
        };
      }

      // reposition the element accoridng to coordinates
      var xy = chart.geoPointToSVG({
        longitude: image.longitude,
        latitude: image.latitude,
      });
      image.dummyData.externalElement.style.top = xy.y + "px";
      image.dummyData.externalElement.style.left = xy.x + "px";
    });
  }

  // this function creates and returns a new marker element
  function createCustomMarker(image) {
    var chart = image.dataItem.component.chart;

    // create holder
    var holder = document.createElement("div");
    holder.className = "map-marker";
    holder.title = image.dataItem.dataContext.title;
    holder.style.position = "absolute";

    // maybe add a link to it?
    if (undefined != image.url) {
      holder.onclick = function () {
        window.location.href = image.url;
      };
      holder.className += " map-clickable";
    }

    // create dot
    var dot = document.createElement("div");
    dot.className = "dot";
    holder.appendChild(dot);

    // create pulse
    var pulse = document.createElement("div");
    pulse.className = "pulse";
    holder.appendChild(pulse);

    // append the marker to the map container
    chart.svgContainer.htmlElement.appendChild(holder);

    return holder;
  }
}); // end am4core.ready()
