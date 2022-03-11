const regionMap = document.getElementById("region-map");
const regionMapW = document.getElementById("region-map_W");
const regionMapM = document.getElementById("region-map_M");
const regionMapY = document.getElementById("region-map_Y");
const s_regionMapT = document.getElementById("s_region-map_T");
const s_regionMapW = document.getElementById("s_region-map_W");
const s_regionMapM = document.getElementById("s_region-map_M");
const s_regionMapY = document.getElementById("s_region-map_Y");
const worldMap = document.getElementById("world-map");

$('#sb_location-month-tab').on("shown.bs.tab",function(){
  $(regionMapM).vectorMap({
    map: "world_mill_en",
    backgroundColor: "transparent",
    normalizeFunction: "polynomial",
    hoverOpacity: 0.8,
    regionStyle: {
      initial: { fill: "#E3E6EF" },
      hover: {
        fill: "#5F63F2",
        "fill-opacity": 1,
      },
    },
    markerStyle: {
      initial: {
        fill: "#5F63F215",
        stroke: "#5F63F2",
        "stroke-width": 4,
      },
    },
    markers: [
      { latLng: [-4.61, 55.45], name: "Seychelles" },
      { latLng: [42.5, 1.51], name: "Andorra" },
      { latLng: [14.01, -60.98], name: "Saint Lucia" },
      { latLng: [1.3, 103.8], name: "Singapore" },
      { latLng: [0.33, 6.73], name: "SÃƒÂ£o TomÃƒÂ© and PrÃƒÂ­ncipe" },
    ],
    series: {
      regions: [
        {
          scale: ["#C8EEFF", "#0071A4"],
        },
      ],
    },
  });
  $('#sb_location-month-tab').off();
});

$('#sb_location-week-tab').on("shown.bs.tab",function(){
  $(regionMapW).vectorMap({
    map: "world_mill_en",
    backgroundColor: "transparent",
    normalizeFunction: "polynomial",
    hoverOpacity: 0.8,
    regionStyle: {
      initial: { fill: "#E3E6EF" },
      hover: {
        fill: "#5F63F2",
        "fill-opacity": 1,
      },
    },
    markerStyle: {
      initial: {
        fill: "#5F63F215",
        stroke: "#5F63F2",
        "stroke-width": 4,
      },
    },
    markers: [
      { latLng: [-4.61, 55.45], name: "Seychelles" },
      { latLng: [42.5, 1.51], name: "Andorra" },
      { latLng: [14.01, -60.98], name: "Saint Lucia" },
      { latLng: [1.3, 103.8], name: "Singapore" },
      { latLng: [0.33, 6.73], name: "SÃƒÂ£o TomÃƒÂ© and PrÃƒÂ­ncipe" },
    ],
    series: {
      regions: [
        {
          scale: ["#C8EEFF", "#0071A4"],
        },
      ],
    },
  });
  $('#sb_location-week-tab').off();
});

$('#sb_location-year-tab').on("shown.bs.tab",function(){
  $(regionMapY).vectorMap({
    map: "world_mill_en",
    backgroundColor: "transparent",
    normalizeFunction: "polynomial",
    hoverOpacity: 0.8,
    regionStyle: {
      initial: { fill: "#E3E6EF" },
      hover: {
        fill: "#5F63F2",
        "fill-opacity": 1,
      },
    },
    markerStyle: {
      initial: {
        fill: "#5F63F215",
        stroke: "#5F63F2",
        "stroke-width": 4,
      },
    },
    markers: [
      { latLng: [-4.61, 55.45], name: "Seychelles" },
      { latLng: [42.5, 1.51], name: "Andorra" },
      { latLng: [14.01, -60.98], name: "Saint Lucia" },
      { latLng: [1.3, 103.8], name: "Singapore" },
      { latLng: [0.33, 6.73], name: "SÃƒÂ£o TomÃƒÂ© and PrÃƒÂ­ncipe" },
    ],
    series: {
      regions: [
        {
          scale: ["#C8EEFF", "#0071A4"],
        },
      ],
    },
  });
  $('#sb_location-year-tab').off();
});


if(s_regionMapT){
  $(s_regionMapT).vectorMap({
    map: "world_mill_en",
    backgroundColor: "transparent",
    normalizeFunction: "polynomial",
    hoverOpacity: 0.8,
    regionStyle: {
      initial: { fill: "#E3E6EF" },
      hover: {
        fill: "#5F63F2",
        "fill-opacity": 1,
      },
    },
    markerStyle: {
      initial: {
        fill: "#5F63F215",
        stroke: "#5F63F2",
        "stroke-width": 4,
      },
    },
    markers: [
      { latLng: [-4.61, 55.45], name: "Seychelles" },
      { latLng: [42.5, 1.51], name: "Andorra" },
      { latLng: [14.01, -60.98], name: "Saint Lucia" },
      { latLng: [1.3, 103.8], name: "Singapore" },
      { latLng: [0.33, 6.73], name: "SÃƒÂ£o TomÃƒÂ© and PrÃƒÂ­ncipe" },
    ],
    series: {
      regions: [
        {
          scale: ["#C8EEFF", "#0071A4"],
        },
      ],
    },
  });
}
 
$('#se_region-week-tab').on("shown.bs.tab",function(){
  $(s_regionMapW).vectorMap({
    map: "world_mill_en",
    backgroundColor: "transparent",
    normalizeFunction: "polynomial",
    hoverOpacity: 0.8,
    regionStyle: {
      initial: { fill: "#E3E6EF" },
      hover: {
        fill: "#5F63F2",
        "fill-opacity": 1,
      },
    },
    markerStyle: {
      initial: {
        fill: "#5F63F215",
        stroke: "#5F63F2",
        "stroke-width": 4,
      },
    },
    markers: [
      { latLng: [-4.61, 55.45], name: "Seychelles" },
      { latLng: [42.5, 1.51], name: "Andorra" },
      { latLng: [14.01, -60.98], name: "Saint Lucia" },
      { latLng: [1.3, 103.8], name: "Singapore" },
      { latLng: [0.33, 6.73], name: "SÃƒÂ£o TomÃƒÂ© and PrÃƒÂ­ncipe" },
    ],
    series: {
      regions: [
        {
          scale: ["#C8EEFF", "#0071A4"],
        },
      ],
    },
  });
  $('#se_region-week-tab').off();
});
$('#se_region-month-tab').on("shown.bs.tab",function(){
  $(s_regionMapM).vectorMap({
    map: "world_mill_en",
    backgroundColor: "transparent",
    normalizeFunction: "polynomial",
    hoverOpacity: 0.8,
    regionStyle: {
      initial: { fill: "#E3E6EF" },
      hover: {
        fill: "#5F63F2",
        "fill-opacity": 1,
      },
    },
    markerStyle: {
      initial: {
        fill: "#5F63F215",
        stroke: "#5F63F2",
        "stroke-width": 4,
      },
    },
    markers: [
      { latLng: [-4.61, 55.45], name: "Seychelles" },
      { latLng: [42.5, 1.51], name: "Andorra" },
      { latLng: [14.01, -60.98], name: "Saint Lucia" },
      { latLng: [1.3, 103.8], name: "Singapore" },
      { latLng: [0.33, 6.73], name: "SÃƒÂ£o TomÃƒÂ© and PrÃƒÂ­ncipe" },
    ],
    series: {
      regions: [
        {
          scale: ["#C8EEFF", "#0071A4"],
        },
      ],
    },
  });
  $('#se_region-month-tab').off();
});
$('#se_region-year-tab').on("shown.bs.tab",function(){
  $(s_regionMapY).vectorMap({
    map: "world_mill_en",
    backgroundColor: "transparent",
    normalizeFunction: "polynomial",
    hoverOpacity: 0.8,
    regionStyle: {
      initial: { fill: "#E3E6EF" },
      hover: {
        fill: "#5F63F2",
        "fill-opacity": 1,
      },
    },
    markerStyle: {
      initial: {
        fill: "#5F63F215",
        stroke: "#5F63F2",
        "stroke-width": 4,
      },
    },
    markers: [
      { latLng: [-4.61, 55.45], name: "Seychelles" },
      { latLng: [42.5, 1.51], name: "Andorra" },
      { latLng: [14.01, -60.98], name: "Saint Lucia" },
      { latLng: [1.3, 103.8], name: "Singapore" },
      { latLng: [0.33, 6.73], name: "SÃƒÂ£o TomÃƒÂ© and PrÃƒÂ­ncipe" },
    ],
    series: {
      regions: [
        {
          scale: ["#C8EEFF", "#0071A4"],
        },
      ],
    },
  });
  $('#se_region-year-tab').off();
});

if (regionMap) {
  $(regionMap).vectorMap({
    map: "world_mill_en",
    backgroundColor: "transparent",
    normalizeFunction: "polynomial",
    hoverOpacity: 0.8,
    regionStyle: {
      initial: { fill: "#E3E6EF" },
      hover: {
        fill: "#5F63F2",
        "fill-opacity": 1,
      },
    },
    markerStyle: {
      initial: {
        fill: "#5F63F215",
        stroke: "#5F63F2",
        "stroke-width": 4,
      },
    },
    markers: [
      { latLng: [-4.61, 55.45], name: "Seychelles" },
      { latLng: [42.5, 1.51], name: "Andorra" },
      { latLng: [14.01, -60.98], name: "Saint Lucia" },
      { latLng: [1.3, 103.8], name: "Singapore" },
      { latLng: [0.33, 6.73], name: "SÃƒÂ£o TomÃƒÂ© and PrÃƒÂ­ncipe" },
    ],
    series: {
      regions: [
        {
          scale: ["#C8EEFF", "#0071A4"],
        },
      ],
    },
  });
}

if (worldMap) {
  $(worldMap).vectorMap({
    map: "world_mill_en",
    backgroundColor: "transparent",
    normalizeFunction: "polynomial",
    hoverOpacity: 0.8,
    regionStyle: { initial: { fill: "#E3E6EF" } },
    markerStyle: {
      initial: {
        fill: "#5F63F215",
        stroke: "#5F63F2",
        "stroke-width": 4,
      },
    },
    markers: [
      { latLng: [47.14, 9.52], name: "Liechtenstein" },
      { latLng: [3.2, 73.22], name: "Maldives" },
      { latLng: [-4.61, 55.45], name: "Seychelles" },
      { latLng: [42.5, 1.51], name: "Andorra" },
      { latLng: [14.01, -60.98], name: "Saint Lucia" },
      { latLng: [1.3, 103.8], name: "Singapore" },
      { latLng: [0.33, 6.73], name: "SÃƒÂ£o TomÃƒÂ© and PrÃƒÂ­ncipe" },
    ],
    series: {
      regions: [
        {
          scale: ["#C8EEFF", "#0071A4"],
        },
      ],
    },
  });
}
