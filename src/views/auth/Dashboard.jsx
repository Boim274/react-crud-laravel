import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error("Failed to fetch user data", error);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                navigate('/');
            }
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            fetchData();
        }
    }, [token, navigate]);

    const logoutHandler = async () => {
        try {
            await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem("token");
            navigate('/');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h3>Welcome, <strong className="text-uppercase">{user.name}</strong></h3>
                            <hr />
                            <button onClick={logoutHandler} className="btn btn-md btn-danger">LOGOUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
