import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PickzonePage = () => {
  const [pickzones, setPickzones] = useState([]);
  const [pickzone, setPickzone] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://putting-app.onrender.com/api/inventory')
      .then(response => {
        const pickzoneSet = new Set();
        response.data.forEach(item => {
          const pickzone = item.id.split('-')[1];
          pickzoneSet.add(pickzone);
        });
        setPickzones(Array.from(pickzoneSet));
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
      });
  }, []);

  const handlePickzoneChange = (event) => {
    setPickzone(event.target.value);
  };

  const goToAislePage = () => {
    if (pickzone) {
      navigate(`/select-aisle/${pickzone}`);
    } else {
      alert('Please select a pickzone');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-8 lg:p-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center font-mulish">Select Pickzone</h2>
        <select
          value={pickzone}
          onChange={handlePickzoneChange}
          className="w-full p-4 mb-6 font-mulish border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        >
          <option value="" disabled>Select Pickzone</option>
          {pickzones.map(pz => (
            <option key={pz} value={pz}>{pz}</option>
          ))}
        </select>
        <button
          onClick={goToAislePage}
          className="w-full p-4 font-mulish bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 ease-in-out"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PickzonePage;
