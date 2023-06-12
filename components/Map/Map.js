import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Marker from "./Marker";
import axios from "axios";
import { parseCookies } from "nookies";

mapboxgl.accessToken = process.env.mapbox_key;

mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  true // Lazy load the plugin
);

const Map = ({ stores,coords}) => {

  const cookies = parseCookies();
  const imgURL = cookies.imgURL ;

  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(() => {
    return coords.length > 0 ? coords[0] : 36.720798;
  });
  const [lat, setLat] = useState(() => {
    return coords.length > 0 ? coords[1] : 34.725587;
  });
  const [zoom, setZoom] = useState(12);

  //! to change the coordinates of the personal marker without the need to remove it
  const [marker,setMarker]=useState(null);

  //! to make sure the map initialize just once
  const [map,setMap]=useState();
  useEffect(()=>{

    //* initialize
    const tempMap= new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
      scrollZoom: true,
    });

    //* movment on the map
    tempMap.on("move", () => {
      setLng(tempMap.getCenter().lng.toFixed(4));
      setLat(tempMap.getCenter().lat.toFixed(4));
      setZoom(tempMap.getZoom().toFixed(2));
    });

    //* Add FullScreen control
    tempMap.addControl(new mapboxgl.FullscreenControl(), "top-right");

    //* Add navigation control (the +/- zoom buttons)
    tempMap.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    setMap(tempMap);

    return () => tempMap.remove();

  },[])

  //! execute when the person coordinates changes or when th map state changes
  useEffect(()=>{

    if ( ( map != undefined ) && ( coords.length > 0 ) ){
            
            if(!marker){

                const el = document.createElement("div");
                el.className = "marker";
                el.className = "removablePerson"
                ReactDOM.render(
                  <Marker
                  image={ imgURL !== undefined ? imgURL : "/default.jpg" }
                  color= "#3fb37f"
                  />
                ,el)
                const newMarker = new mapboxgl.Marker(el, { offset: [0, -10] })
                .setLngLat(coords)
                .addTo(map);
            
                setMarker(newMarker);

            }else{

                // If marker is already set, update its position
                marker.setLngLat(coords);
                
            }
  
    }  

  },[map,coords])

  //! execute when the stores on map changes or when th map state changes
  useEffect(() => {

    if ( map != undefined ) {

      //* removing existing marker and every thing related to except the personal one
      removeMarkers();

      //* calling the new Markers
      addMarkers(stores, "#258A25");

    }

  }, [map,stores]);

  //**************adding Markers *******************
  function addMarkers(marker, markerColor) {

    for (const x of marker) {
      const el = document.createElement("div");
      el.className = "marker";
      el.className = "removableMarker";

      ReactDOM.render(
        <Marker image={x.storeImgURL} color={markerColor} />
      ,el)

      new mapboxgl.Marker(el, { offset: [0, -10] })
      .setLngLat(x.coo)
      .addTo(map);  

      el.addEventListener("click", (e) => {
        //! important i put it so i can create a popup when clicking on the marker despite setting the closeOnClick to true in popup
        e.stopPropagation();
        /* make thw direction */
        if (coords.length > 0) {
          getRoute(coords, x.coo, "#3fb37f");
        }
        /* Fly to the point */
        flyToStore(x.coo);
        /* Close all other popups and display popup for clicked store */
        createPopUp(x, markerColor);
      });

    }
  }

  //**************removing Markers **************
  function removeMarkers(){
    // to remove the markers
    const m=document.querySelectorAll('.removableMarker');
    m.forEach( i => i.remove() )
    
    // to remove the dist-time dialog when removing the markers 
    document.getElementById('dist-time').innerHTML="";

    // to close opened popup
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();

    // to remove the route when removing the marker 
    if (map.getSource("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }
  }

  // ************ Directions ********************
  async function getRoute(start, end, routeColor) {
    const res = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
    );

    //res.data contains an object with three values( code , waypoints , routes)

    //routes contains an array of every single route in our condition we have just one route

    const data = res.data.routes[0];
    //every single route is an ((object)) contains

    //an ((object)) ((legs)) for the ((instructions)),
    //weight_name,
    //weight
    //distance
    //duration
    //an ((object)) ((geometry)) which contains an ((array)) for the ((coordinates)) all the route

    const route = data.geometry.coordinates;

    //putting the array of coordinates in geojson object
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };

    //if the route already exists on the map , we will reset it using setData

    if (map.getSource("route")) {
      map.getSource("route").setData(geojson);
    }
    //otherwise we will make a new request
    else {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": `${routeColor}`,
          "line-width": 4,
          "line-opacity": 1,
        },
      });
    }

    //putting the time and the distance on the map
    const dT = document.getElementById("dist-time");

    dT.innerHTML = `
    <h4> 
    : المسافة المقدرة للوصول 
    </h4>
    <h5>
      ${Math.floor(data.distance / 1000)} K.m
    <h5/>

    <h4>
    : الوقت المقدر للوصول  
    </h4>
    <h5>
      ${Math.floor(data.duration / 60)} M
    </h5>

    `;
  }

  // ************ fly to store ******************
  function flyToStore(coords) {
    map.flyTo({
      center: coords,
      zoom: 14,
    });
  }

  // ************ popup ******************
  function createPopUp(marker, markerColor) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");

    // to close opened popup
    if (popUps[0]) popUps[0].remove();

    const seller_popup = (
      <>
        <h4
          style={{
            backgroundColor: "white",
            color: markerColor,
            minWidth: "125px",
            minHeight: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            borderColor: `${markerColor}`,
          }}
          className="border-x-4"
        >
          {marker.storeName}
        </h4>
      </>
    );
    
  const my_popup_container = document.createElement("div");

  ReactDOM.render(seller_popup,my_popup_container)


  const popup = new mapboxgl.Popup({ closeOnClick: true }) //! ***** the close on click
      .setLngLat(marker.coo)
      .setDOMContent(my_popup_container)
      .addTo(map);
  }

  return (
    <div
      ref={mapContainerRef}
      className="relative z-0 w-full h-full rounded-lg"
    >

      <div
        id="dist-time"
        className="absolute left-2 top-2 z-10 text-[#3fb37f] w-[120px] bg-white rounded-lg shadow-cardShadow text-[10px] md:text-[12px] font-bold text-center space-y-[3px]"
      ></div>

    </div>
  );
};

export default Map;
