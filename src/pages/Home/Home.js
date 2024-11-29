import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [loginInputs, setLoginInputs] = useState({ username: "", password: "" });
  const [registerInputs, setRegisterInputs] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleModal = () => setShowModal((prev) => !prev);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const registerResponse = await axios.post("http://localhost:5000/register", registerInputs);
      const { message } = registerResponse.data;
      window.alert(message);
      setRegisterInputs({ username: "", email: "", password: "" });
      setShowModal(false); // Close the modal after successful registration
    } catch (error) {
      window.alert(error.response?.data?.message || "An error occurred");
    }
  };

  const handleLogin = async () => {
    try {
      const loginResponse = await axios.post("http://localhost:5000/login", loginInputs);
      localStorage.setItem("PRODUCT_VAULT_TKN", loginResponse.data.token);
      setLoginInputs({ username: "", password: "" });
      navigate('/dashboard');
    } catch (error) {
      window.alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="homepage">
      <div className="container-fluid">
        <div className="left-section"></div>
        <div className="right-section">
          <div className="signin-box">
            <h2>SIGN IN</h2>
            <form>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={loginInputs.username}
                  onChange={(e) =>
                    setLoginInputs((prevState) => ({
                      ...prevState,
                      username: e.target.value
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={loginInputs.password}
                  onChange={(e) =>
                    setLoginInputs((prevState) => ({
                      ...prevState,
                      password: e.target.value
                    }))
                  }
                />
              </div>
              <button type="button" onClick={handleLogin} className="submit-btn">
                LOGIN
              </button>
              <div className="register-section">
                <span>or</span>
                <button type="button" onClick={handleModal} className="outline-btn">
                  REGISTER
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal-overlay" onClick={handleModal}></div>
          <div className="modal">
            <div className="modal-header">
              <h5>Register</h5>
              <span className="close" onClick={handleModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    value={registerInputs.username}
                    onChange={(e) =>
                      setRegisterInputs((prevState) => ({
                        ...prevState,
                        username: e.target.value
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={registerInputs.email}
                    onChange={(e) =>
                      setRegisterInputs((prevState) => ({
                        ...prevState,
                        email: e.target.value
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={registerInputs.password}
                    onChange={(e) =>
                      setRegisterInputs((prevState) => ({
                        ...prevState,
                        password: e.target.value
                      }))
                    }
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Register
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
