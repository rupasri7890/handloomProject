import { FaServer } from "react-icons/fa6"
import { IoIosSearch } from "react-icons/io"
import { FaCirclePlus } from "react-icons/fa6"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiEdit2 } from "react-icons/fi"
import { GoBell } from "react-icons/go"
import Popup from "reactjs-popup"

import "../styles.css"
import AddDevice from "./AddDevice"

const WeaverPage = () => {
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
        <div className="device-card">
          <img src="https://picsum.photos/350/200" alt="device" />
          <div className="device-info">
            <div>
              <h4>Device name</h4>
              <div>
                <button>
                  <RiDeleteBin6Line />
                </button>
                <button>
                  <FiEdit2 />
                </button>
              </div>
            </div>
            <p className="status">• Inactive</p>
            <div>
              <p className="location">Location</p>
              <div>
                <button>
                  <GoBell />
                </button>
                <div className="cl-toggle-switch">
                  <label className="cl-switch">
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="device-card">
          <img src="https://picsum.photos/350/200" alt="device" />
          <div className="device-info">
            <div>
              <h4>Device name</h4>
              <div>
                <button>
                  <RiDeleteBin6Line />
                </button>
                <button>
                  <FiEdit2 />
                </button>
              </div>
            </div>
            <p className="status">• Inactive</p>
            <div>
              <p className="location">Location</p>
              <div>
                <button>
                  <GoBell />
                </button>
                <div className="cl-toggle-switch">
                  <label className="cl-switch">
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="device-card">
          <img src="https://picsum.photos/350/200" alt="device" />
          <div className="device-info">
            <div>
              <h4>Device name</h4>
              <div>
                <button>
                  <RiDeleteBin6Line />
                </button>
                <button>
                  <FiEdit2 />
                </button>
              </div>
            </div>
            <p className="status">• Inactive</p>
            <div>
              <p className="location">Location</p>
              <div>
                <button>
                  <GoBell />
                </button>
                <div className="cl-toggle-switch">
                  <label className="cl-switch">
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="device-card">
          <img src="https://picsum.photos/350/200" alt="device" />
          <div className="device-info">
            <div>
              <h4>Device name</h4>
              <div>
                <button>
                  <RiDeleteBin6Line />
                </button>
                <button>
                  <FiEdit2 />
                </button>
              </div>
            </div>
            <p className="status">• Inactive</p>
            <div>
              <p className="location">Location</p>
              <div>
                <button>
                  <GoBell />
                </button>
                <div className="cl-toggle-switch">
                  <label className="cl-switch">
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="device-card">
          <img src="https://picsum.photos/350/200" alt="device" />
          <div className="device-info">
            <div>
              <h4>Device name</h4>
              <div>
                <button>
                  <RiDeleteBin6Line />
                </button>
                <button>
                  <FiEdit2 />
                </button>
              </div>
            </div>
            <p className="status">• Inactive</p>
            <div>
              <p className="location">Location</p>
              <div>
                <button>
                  <GoBell />
                </button>
                <div className="cl-toggle-switch">
                  <label className="cl-switch">
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="device-card">
          <img src="https://picsum.photos/350/200" alt="device" />
          <div className="device-info">
            <div>
              <h4>Device name</h4>
              <div>
                <button>
                  <RiDeleteBin6Line />
                </button>
                <button>
                  <FiEdit2 />
                </button>
              </div>
            </div>
            <p className="status">• Inactive</p>
            <div>
              <p className="location">Location</p>
              <div>
                <button>
                  <GoBell />
                </button>
                <div className="cl-toggle-switch">
                  <label className="cl-switch">
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeaverPage