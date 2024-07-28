import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUpload, FaSortUp, FaSortDown } from 'react-icons/fa';

const AdminPage = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [file, setFile] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://putting-app.onrender.com/api/inventory')
      .then(response => {
        if (Array.isArray(response.data)) {
          setLocations(response.data);
          setFilteredLocations(response.data);
        } else {
          console.error('Error: Data fetched is not an array', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('https://putting-app.onrender.com/upload', formData)
      .then(response => {
        if (Array.isArray(response.data)) {
          alert('File uploaded successfully');
          setLocations(response.data); // Update locations with new data
          setFilteredLocations(response.data);
        } else {
          console.error('Error: Data uploaded is not an array', response.data);
        }
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  };

  const handleSort = () => {
    const sortedLocations = [...filteredLocations].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.spacesAvailable - b.spacesAvailable;
      }
      return b.spacesAvailable - a.spacesAvailable;
    });
    setFilteredLocations(sortedLocations);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = locations.filter(location => location.id.toLowerCase().includes(term.toLowerCase()));
    setFilteredLocations(filtered);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 sm:p-8 lg:p-12">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800 font-mulish">G1 Locations</h1>
          <div className="flex items-center">
            <input type="file" id="fileUpload" className="hidden" onChange={handleFileChange} />
            <label htmlFor="fileUpload" className="cursor-pointer">
              <FaUpload className="text-blue-500 text-lg sm:text-2xl" />
            </label>
            <button 
              onClick={handleFileUpload} 
              className="ml-2 p-2 bg-blue-500 text-white font-mulish rounded shadow-md hover:bg-blue-600 transition-colors duration-300"
            >
              Upload
            </button>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by Location ID"
            className="w-full text-sm sm:text-base p-2 font-mulish border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left text-sm sm:text-base font-mulish border-b border-gray-300">Location ID</th>
                <th
                  className="p-3 text-right text-sm sm:text-base font-mulish border-b border-gray-300 cursor-pointer"
                  onClick={handleSort}
                >
                  Spaces Available
                  {sortOrder === 'asc' ? <FaSortUp className="inline ml-2" /> : <FaSortDown className="inline ml-2" />}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLocations.map(location => (
                <tr key={location.id} className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="p-3 text-sm sm:text-base border-b border-gray-300">{location.id}</td>
                  <td className="p-3 text-sm sm:text-base text-right border-b border-gray-300">{location.spacesAvailable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
