import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  // Define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);

  // Define navigate
  const navigate = useNavigate();

  // useEffect hook
  useEffect(() => {
    // Check token
    if (localStorage.getItem('token')) {
      // Redirect to dashboard
      navigate('/dashboard');
    }
  }, [navigate]);

  // loginHandler function
  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);

      // Set token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setValidation(error.response.data); // Assign error to validation state
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="text-center text-primary mb-4">Login</h3>
              <hr />
              {validation.message && (
                <div className="alert alert-danger">
                  {validation.message}
                </div>
              )}
              <form onSubmit={loginHandler}>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                {validation.email && (
                  <div className="alert alert-danger">
                    {validation.email[0]}
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                {validation.password && (
                  <div className="alert alert-danger">
                    {validation.password[0]}
                  </div>
                )}
                <div className="d-grid gap-2 mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">Login</button>
                </div>
              </form>
              <div className="mt-3 text-center">
                <small>Don't have an account? <a href="/register" className="text-decoration-none">Register here</a></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
