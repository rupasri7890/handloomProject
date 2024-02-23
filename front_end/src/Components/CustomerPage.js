import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaServer } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { toast } from 'react-hot-toast';
import { custometAddCart } from "../integration/authentication_apies";

const CustomerPage = () => {
  const [devices, setDevices] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff'); // Default color is white
  const [customColor, setCustomColor] = useState(''); // State to store custom color input

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/weaver/getAllProducts`);
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refresh]); 

  const handleAddToCart = async (device, color) => {
    try {
      const res = await custometAddCart(device, color);
      console.log(res)
      if (res.data.status_code === 201) {
        toast.success('Product added to cart');
      } else {
        toast.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart');
    }
  }

  return (
    <div className="weaver-page">
      <nav className="weaver-nav">
        <div>
          <FaServer className="weaver-icon" />
          <p className="weaver-title">Customer Page</p>
        </div>
        <div className="weaver-btns">
          <div>
            <label htmlFor="weaverInput">
              <IoIosSearch className="search-icon" />
            </label>
            <input
              id="weaverInput"
              type="search"
              className="weaver-input"
              placeholder="Search"
            />
          </div>
        </div>
      </nav>
      <div className="devices-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {devices.map((device, index) => (
          <div key={index} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            width: '200px', 
            boxSizing: 'border-box',
          }}>
            <img
              src={device.productImage}
              alt="device"
              style={{
                maxWidth: '100%',
                borderRadius: '8px',
              }}
            />
            <div className="device-info">
              <h4>{device.productName}</h4>
              <p>Price: {device.price}</p>
              <p>Description: {device.description}</p>
              <div className="add-device-input-container">
                <label htmlFor="color">Color:</label>
                <input
                  type="color"
                  id="color"
                  className="add-device-input"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                />
                <input
                  type="text"
                  id="customColor"
                  className="add-device-input"
                  placeholder="Custom Color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                />
              </div>
              <div className="addColor">
                <button onClick={() => handleAddToCart(device, customColor || selectedColor)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerPage;
