import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaServer } from "react-icons/fa6"
import { IoIosSearch } from "react-icons/io"
import { FaCirclePlus } from "react-icons/fa6"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiEdit2 } from "react-icons/fi"
import Popup from "reactjs-popup"
import AddDevice from './AddDevice';

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

        <div className="device-card">
          <img src={device.productImage} alt="device" />
          <div className="device-info">
            <div>
              <h4>{device.productName}</h4>
              <div>
                <button>
                  <RiDeleteBin6Line />
                </button>
                <button>
                  <FiEdit2 />
                </button>
              </div>
            </div>
            <p className="status">{device.color}</p>
            <div>
              <p className="location">{device.price}</p>
    
            </div>
            <p className="status">{device.description}</p>
          </div>
        </div>
          ))}

      </div>
    </div>
  )

};

export default WeaverPage;
