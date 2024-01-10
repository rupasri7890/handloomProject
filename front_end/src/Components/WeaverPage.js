import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeaverPage = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000//weaver/getProductsByEmail?email="+localStorage.getItem("email"))
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="weaver-page">
      <h1>Weaver Page</h1>
      <div className="devices-container">
        {devices.length > 0 ? (
          devices.map((device, index) => (
            <div key={index}>
              {/* Display device information */}
              <p>Device Name: {device.name}</p>
              {/* Add other device information as needed */}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default WeaverPage;
