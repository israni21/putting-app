import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AislePage = () => {
  const { pickzone } = useParams();
  const [selectedAisle, setSelectedAisle] = useState('');
  const [aisles, setAisles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://putting-app.onrender.com/api/inventory')
      .then(response => {
        console.log('Inventory data:', response.data);
        const aisleData = response.data
          .filter(item => item.id.includes(pickzone))
          .reduce((acc, curr) => {
            const aisle = curr.id.split('-')[2];
            if (!acc[aisle]) {
              acc[aisle] = 0;
            }
            console.log(`Adding ${curr.spacesAvailable} spaces to aisle ${aisle}`);
            acc[aisle] += parseInt(curr.spacesAvailable, 10); // Ensure spacesAvailable is treated as a number
            return acc;
          }, {});

        const sortedAisles = Object.keys(aisleData)
          .map(aisle => ({ aisle, totalSpaces: aisleData[aisle] }))
          .sort((a, b) => b.totalSpaces - a.totalSpaces)
          .slice(0, 9);
        setAisles(sortedAisles);
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
      });
  }, [pickzone]);


  const handleAisleChange = (event) => {
    setSelectedAisle(event.target.value);
  };

  const handleAisleClick = (aisle) => {
    setSelectedAisle(aisle);
  };

  const goToRackPage = () => {
    if (selectedAisle) {
      navigate(`/select-rack/${pickzone}/${selectedAisle}`);
    } else {
      alert('Please select an aisle');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 sm:p-8 lg:p-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-mulish sm:text-3xl font-bold text-gray-800 mb-6 text-center">Select Aisle</h2>
        <div className="mb-6 flex flex-col items-center">
          <select
            value={selectedAisle}
            onChange={handleAisleChange}
            className="w-full md:w-1/2 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-2"
          >
            <option value="" disabled>Select Aisle</option>
            {aisles.map(({ aisle }) => (
              <option key={aisle} value={aisle}>{aisle}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {aisles.map(({ aisle, totalSpaces }) => (
            <div
              key={aisle}
              className={`p-4 font-mulish bg-white border rounded-lg shadow-md hover:bg-gray-100 cursor-pointer transition-all duration-100 ease-in-out ${selectedAisle === aisle ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
              onClick={() => handleAisleClick(aisle)}
            >
              <h3 className="text-lg font-mulish sm:text-xl font-semibold text-gray-800">Aisle {aisle}</h3>
              <p className="text-gray-600">Availability: <span className="font-semibold text-gray-900">{totalSpaces}</span></p>
            </div>
          ))}
        </div>
        <button
          onClick={goToRackPage}
          className="w-full mt-6 p-4 font-mulish bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 ease-in-out"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AislePage;
