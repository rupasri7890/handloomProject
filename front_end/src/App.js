import './App.css';
import profile from "./image/image.jpg";
import email from "./image/email logo.png";
import password from "./image/lock logo.png";
function App() {
  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" classNameo="profile"/>
            </div>

          </div>
          <div>
            <h1>Login Page</h1>
            <div>
              <img src={email} alt="email" className="email"/>
              <input type="text" placeholder="user name" className="name"/>
            </div>
            <div className="second-input">
              <img src={password} alt="password" className="email"/>
              <input type="text" placeholder="user name" className="name"/>
            </div>
            <div className="loginbutton">
            <button>Login</button>
            </div>
            
              <p className="links">
                <a href="#">Forgot password? </a> Or <a href="#"> Sign Up</a> 
              </p>
            
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
