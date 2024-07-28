// src/data/warehouseLocations.js
const generateLocations = (pickzones, aisles, racks) => {
    const locations = [];
    for (let p = 1; p <= pickzones; p++) {
      for (let a = 1; a <= aisles; a++) {
        for (let r = 1; r <= racks; r++) {
          locations.push(`G1-P${String(p).padStart(3, '0')}-A${String(a).padStart(3, '0')}-R${r}`);
        }
      }
    }
    return locations;
  };
  
  const warehouseLocations = generateLocations(24, 50, 24); // 8 pickzones, 3 aisles, 4 racks
  
  export default warehouseLocations;
  