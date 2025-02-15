import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ForestFireDetection: React.FC = () => {
  useEffect(() => {
    const map = L.map('map').setView([20.5937, 78.9629], 6); // Set view to India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add Bhuvan WMS Layer for Fire Monitoring
    const fireLayer = L.tileLayer.wms('https://bhuvan.nrsc.gov.in/wms/bhuvan', {
      layers: 'FirePoints', // Layer for fire points
      format: 'image/png',
      transparent: true,
      attribution: 'Bhuvan Fire Data'
    }).addTo(map);

    return () => {
      map.remove(); // Clean up map on component unmount
    };
  }, []);

  return <div id="map" style={{ height: '600px' }} />;
};

export default ForestFireDetection;
