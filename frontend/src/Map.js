// src/Map.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';
import createCustomDivIcon from './customIcon';
import './customMarker.css'; // Import the custom marker CSS

const socket = io('https://realtime-location-react.onrender.com');

const MyMap = () => {
  const [locations, setLocations] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = prompt('Please enter your name:');
    setUserName(name);

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            name,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          socket.emit('sendLocation', location);
        },
        (error) => {
          console.error('Error getting geolocation', error);
        },
        geoOptions
      );
    }

    socket.on('newLocation', (location) => {
      setLocations((prevLocations) => [...prevLocations, location]);
    });

    return () => {
      socket.off('newLocation');
    };
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.lat, location.lng]}
          icon={createCustomDivIcon(location.name)} // Use custom div icon
        >
          <Popup>
            {location.name}: {location.lat}, {location.lng}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MyMap;
