import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaServer } from "react-icons/fa6"
import { IoIosSearch } from "react-icons/io"
import { toast } from 'react-hot-toast';
import { deletWeaverProductById } from '../integration/authentication_apies';
import {custometAddCart} from "../integration/authentication_apies"

const CustomerPage = () => {
  const [devices, setDevices] = useState([]);
  const [refresh, setRefresh] = useState(false);


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
  }, [refresh]); // empty dependency array means this effect runs once after the initial render

  const handleDeleteProduct = async (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this item?');
  
    if (!shouldDelete) {
      return;
    }
    const response = await deletWeaverProductById(id);
    if (response.data.status_code === 201) {
      toast.success(response.data.message);
      setRefresh((prevRefresh) => !prevRefresh);
    } else {
      toast.error(response.data.message);
    }
  }

  const handleAddToCart = async (id) => {
    // Implement your add to cart logic here
    // Optionally, you can show a toast or perform any other action to indicate the item has been added to cart
    const res= await custometAddCart(id)
    toast.success('Product added to cart');
  }

  return (
    <div className="weaver-page">
      <nav className="weaver-nav">
        <div>
          <FaServer className="weaver-icon" />
          <p className="weaver-title">Weaver Page</p>
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
      <div className="devices-container">
        {devices.map((device, index) => (
          <div key={index} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            margin: '10px',
            padding: '10px',
            width: '300px',
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
            <div className="device-info" style={{ marginTop: '10px' }}>
              <div>
                <h4 style={{ margin: '0', fontSize: '18px' }}>{device.productName}</h4>
                
              </div>
              <p className="status" style={{ fontSize: '16px', margin: '5px 0' }}>color:{device.color}</p>
              <div>
                <p className="location" style={{ fontSize: '14px', margin: '5px 0' }}>price:{device.price}</p>
              </div>
              <p className="status" style={{ fontSize: '16px' }}>description:{device.description}</p>
              <div>
      
                
                  {/* Add to Cart button */}
                  <button
                    style={{
                      backgroundColor: 'blue',
                      border: 'none',
                      marginLeft:'40px',
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                    onClick={() => handleAddToCart(device)}
                  >
                    Add to Cart
                  </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

};

export default CustomerPage;
