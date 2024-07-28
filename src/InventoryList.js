// Example of fetching inventory data
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios.get('https://putting-app.onrender.com/api/inventory')
      .then(response => {
        setInventory(response.data);
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
      });
  }, []);

  return (
    <div>
      {inventory.map(item => (
        <div key={item.id}>
          <p>{item.id}: {item.spacesAvailable} spaces available</p>
        </div>
      ))}
    </div>
  );
};

export default InventoryList;
