import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaServer } from "react-icons/fa6"
import { IoIosSearch } from "react-icons/io"
import { FaCirclePlus } from "react-icons/fa6"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiEdit2 } from "react-icons/fi"
import Popup from "reactjs-popup"
import AddDevice from './AddDevice';
import { toast } from 'react-hot-toast';

import { deletWeaverProductById } from '../integration/authentication_apies';
const handleDeleteProduct=async (id)=>{
  console.log(id)

   const response=await deletWeaverProductById(id)
  if (response.data.status_code === 201) {
    toast.success(response.data.message);
    

  } else {
    toast.error(response.data.message);
  }

}

const WeaverPage = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/weaver/getProductsByEmail/${localStorage.getItem("email")}`);
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // empty dependency array means this effect runs once after the initial render

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
          <Popup
            trigger={
              <button>
                <FaCirclePlus className="plus-icon" />
                Add Product{" "}
              </button>
            }
            modal
            nested
          >
            {() => (
              <div className="modal">
                <AddDevice />
                <div>
                 {/*  <button onClick={() => close()} className="close-btn">
                    Close{" "}
                  </button> */}
                </div>
              </div>
            )}
          </Popup>
        </div>
      </nav>
      <h3 className="active-heading">Active Devices</h3>
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
          <div>
            <button style={{
              backgroundColor: '#f0f0f0',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              marginRight: '5px',

            }}
            onClick={() => handleDeleteProduct(device.id)}
            >
              <RiDeleteBin6Line />
            </button>
            <button style={{
              backgroundColor: '#f0f0f0',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}>
              <FiEdit2 />
            </button>
          </div>
        </div>
        <p className="status" style={{ fontSize: '16px', margin: '5px 0' }}>color:{device.color}</p>
        <div>
          <p className="location" style={{ fontSize: '14px', margin: '5px 0' }}>price:{device.price}</p>
        </div>
        <p className="status" style={{ fontSize: '16px' }}>description:{device.description}</p>
      </div>
    </div>
  ))}
</div>

    </div>
  )

};

export default WeaverPage;
