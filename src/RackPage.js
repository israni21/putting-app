import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RackPage = () => {
  const { pickzone, aisle } = useParams();
  const [selectedRack, setSelectedRack] = useState('');
  const [racks, setRacks] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://putting-app.onrender.com/api/inventory')
      .then(response => {
        const rackData = response.data
          .filter(item => item.id.includes(pickzone) && item.id.includes(aisle))
          .sort((a, b) => b.spacesAvailable - a.spacesAvailable) // Sort by spacesAvailable
          .slice(0, 9);
        setRacks(rackData);
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
      });
  }, [pickzone, aisle]);

  const handleRackChange = (event) => {
    const rackId = event.target.value;
    setSelectedRack(rackId);
    setSelectedLocation(rackId);
  };

  const handleRackClick = (rackId) => {
    setSelectedRack(rackId);
    setSelectedLocation(rackId);
  };

  const handleSubmit = () => {
    if (selectedRack) {
      alert(`Final Location: ${selectedLocation}`);
      // Update space availability (decrement space count)
      axios.patch(`https://putting-app.onrender.com/api/inventory/${selectedRack}`, { spacesAvailable: -1 })
        .then(response => {
          console.log('Updated Data:', response.data);
          navigate('/select-pickzone'); // Redirect to a confirmation or other page
        })
        .catch(error => {
          console.error('Error updating inventory:', error);
        });
    } else {
      alert('Please select a rack');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8 lg:p-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center font-mulish">Select Rack</h2>
        <div className="mb-6 flex flex-col items-center">
          <select
            value={selectedRack}
            onChange={handleRackChange}
            className="w-full font-mulish md:w-1/2 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-2"
          >
            <option value="" disabled>Select Rack</option>
            {racks.map(({ id, spacesAvailable }) => (
              <option key={id} value={id}>
                Rack {id.split('-')[3]}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {racks.map(({ id, spacesAvailable }) => (
            <div
              key={id}
              className={`p-4 font-mulish bg-white border rounded-lg shadow-md hover:bg-gray-50 cursor-pointer transition-all duration-300 ease-in-out ${selectedRack === id ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
              onClick={() => handleRackClick(id)}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Rack {id.split('-')[3]}</h3>
              <p className="text-gray-600">Availability: <span className="font-semibold text-gray-900">{spacesAvailable}</span></p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center mb-6">
          <p className="text-lg font-mulish font-semibold text-gray-800 mb-2">Selected Location:</p>
          <p className="text-lg font-mulish font-bold text-gray-900">{selectedLocation}</p>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full font-mulish p-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 ease-in-out"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RackPage;
