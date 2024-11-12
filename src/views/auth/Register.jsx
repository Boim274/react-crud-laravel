import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory in React Router v6
import axios from 'axios';

function Register() {
  // Define state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [validation, setValidation] = useState([]);

  // Define navigate
  const navigate = useNavigate();

  // Register handler function
  const registerHandler = async (e) => {
    e.preventDefault();
    
    // Initialize formData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);

    // Send data to server
    try {
      await axios.post('http://127.0.0.1:8000/api/register', formData);
      navigate('/dashboard'); // Redirect to dashboard after successful registration
    } catch (error) {
      setValidation(error.response.data); // Assign error to validation state
    }
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="text-center text-primary mb-4">Create an Account</h3>
              <hr />
              <form onSubmit={registerHandler}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter your full name" 
                  />
                  {validation.name && (
                    <div className="alert alert-danger mt-2">
                      {validation.name[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email address" 
                  />
                  {validation.email && (
                    <div className="alert alert-danger mt-2">
                      {validation.email[0]}
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="Enter your password" 
                    />
                    {validation.password && (
                      <div className="alert alert-danger mt-2">
                        {validation.password[0]}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      value={passwordConfirmation} 
                      onChange={(e) => setPasswordConfirmation(e.target.value)} 
                      placeholder="Confirm your password" 
                    />
                  </div>
                </div>

                <div className="d-grid gap-2 mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">Register</button>
                </div>
              </form>

              <div className="mt-3 text-center">
                <small>Already have an account? <a href="/" className="text-decoration-none">Login here</a></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
