import { FaServer } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { GoBell } from "react-icons/go";

import "../styles.css";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
import toast from "react-hot-toast";

const CustomerPage = () => {
  const [devices, setDevices] = useState([
    {
      image: "https://picsum.photos/350/200",
      name: "Device 1",
      status: "Active",
      location: "Room 101",
    },
    {
      image: "https://picsum.photos/350/200",
      name: "Device 2",
      status: "Inactive",
      location: "Room 202",
    },
    {
      image: "https://picsum.photos/350/200",
      name: "Device 3",
      status: "Inactive",
      location: "Room 303",
    },
    {
      image: "https://picsum.photos/350/200",
      name: "Device 4",
      status: "Active",
      location: "Room 404",
    },
    {
      image: "https://picsum.photos/350/200",
      name: "Device 5",
      status: "Active",
      location: "Room 505",
    },
  ]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (value) => {
    setSearchInput(value);

    if (value === "") {
      return setDevices([
        {
          image: "https://picsum.photos/350/200",
          name: "Device 1",
          status: "Active",
          location: "Room 101",
        },
        {
          image: "https://picsum.photos/350/200",
          name: "Device 2",
          status: "Inactive",
          location: "Room 202",
        },
        {
          image: "https://picsum.photos/350/200",
          name: "Device 3",
          status: "Inactive",
          location: "Room 303",
        },
        {
          image: "https://picsum.photos/350/200",
          name: "Device 4",
          status: "Active",
          location: "Room 404",
        },
        {
          image: "https://picsum.photos/350/200",
          name: "Device 5",
          status: "Active",
          location: "Room 505",
        },
      ]);
    }

    const newDevices = [
      {
        image: "https://picsum.photos/350/200",
        name: "Device 1",
        status: "Active",
        location: "Room 101",
      },
      {
        image: "https://picsum.photos/350/200",
        name: "Device 2",
        status: "Inactive",
        location: "Room 202",
      },
      {
        image: "https://picsum.photos/350/200",
        name: "Device 3",
        status: "Inactive",
        location: "Room 303",
      },
      {
        image: "https://picsum.photos/350/200",
        name: "Device 4",
        status: "Active",
        location: "Room 404",
      },
      {
        image: "https://picsum.photos/350/200",
        name: "Device 5",
        status: "Active",
        location: "Room 505",
      },
    ].filter((device) =>
      device.name.toLowerCase().includes(value.toLowerCase())
    );

    setDevices(newDevices);
  };

  const handleDelete = (i) => {
    toast.custom(
      (t) => (
        <div className='modal-container'>
          <div className='modal-content'>
            <h1 className='modal-title'>Are you sure to delete this item?</h1>

            <div className='button-container'>
              <button
                onClick={() => {
                  handleDeviceDelete(i);
                  toast.remove(t.id);
                }}
                className='yes-button'
              >
                Yes
              </button>
              <button onClick={() => toast.remove(t.id)} className='no-button'>
                No
              </button>
            </div>
          </div>
        </div>
      ),
      {
        duration: 50000,
      }
    );
  };
  const handleDeviceDelete = (index) => {
    const newDevices = devices.filter((device, i) => i !== index);
    setDevices(newDevices);
  };

  return (
    <div className='weaver-page'>
      <nav className='weaver-nav'>
        <div>
          <FaServer className='weaver-icon' />
          <p className='weaver-title'>IOT Sensor Management</p>
        </div>
        <div className='weaver-btns'>
          <div>
            <label htmlFor='weaverInput'>
              <IoIosSearch className='search-icon' />
            </label>
            <input
              id='weaverInput'
              type='search'
              className='weaver-input'
              placeholder='Search'
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </nav>
      <h3 className='active-heading'>Active Devices (25)</h3>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div className='devices-container'>
          {devices.map((device, i) => (
            <div className='device-card' key={i}>
              <img src={device.image} alt='device' />
              <div className='device-info'>
                <div>
                  <h4>{device.name}</h4>
                  <div>
                    <button onClick={() => handleDelete(i)}>
                      <RiDeleteBin6Line />
                    </button>
                    <button>
                      <FiEdit2 />
                    </button>
                  </div>
                </div>
                <p className='status'>• {device.status}</p>
                <div>
                  <p className='location'>{device.location}</p>
                  <div>
                    <button>
                      <GoBell />
                    </button>
                    <div className='cl-toggle-switch'>
                      <label className='cl-switch'>
                        <input type='checkbox' />
                        <span></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;