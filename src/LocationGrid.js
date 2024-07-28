// src/components/LocationGrid.js
import React, { useState } from 'react';
import warehouseLocations from './warehouseLocations';

const LocationGrid = () => {
  const [locations, setLocations] = useState(warehouseLocations.map(loc => ({ id: loc, isEmpty: true })));

  const toggleLocationStatus = (id) => {
    setLocations(locations.map(loc => loc.id === id ? { ...loc, isEmpty: !loc.isEmpty } : loc));
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {locations.map(location => (
        <div
          key={location.id}
          className={`p-4 border ${location.isEmpty ? 'bg-green-200' : 'bg-red-200'}`}
          onClick={() => toggleLocationStatus(location.id)}
        >
          {location.id}
        </div>
      ))}
    </div>
  );
};

export default LocationGrid;
