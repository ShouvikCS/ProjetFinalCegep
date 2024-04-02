import React from 'react';
import { Link } from 'react-router-dom'; 

const EmployeeDashboard = () => {
    return (
        <div>
            <h2>Employee Dashboard</h2>
            <br></br>
                <Link to={"/login"}>
            <button>{"back to login"}</button>
        </Link>
        </div>
    );
};

export default EmployeeDashboard;