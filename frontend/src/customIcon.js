// src/customDivIcon.js
import L from 'leaflet';

const createCustomDivIcon = (name) => {
  return L.divIcon({
    html: `<div class="custom-marker">
             <span class="custom-marker-name">${name}</span>
             <img src="${require('./pointIcon.png').default}" alt="marker" class="custom-marker-icon" />
           </div>`,
    iconSize: [38, 50], // adjust as needed
    iconAnchor: [19, 50],
    popupAnchor: [0, -40]
  });
};

export default createCustomDivIcon;
