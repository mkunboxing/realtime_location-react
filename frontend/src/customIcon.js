// src/customIcon.js
import L from 'leaflet';
import customMarker from "./pointIcon.png";

const customIcon = L.icon({
  iconUrl: customMarker, // Replace with your custom icon URL
  iconSize: [38, 38], // size of the icon
  iconAnchor: [22, 38], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -38] // point from which the popup should open relative to the iconAnchor
});

export default customIcon;
