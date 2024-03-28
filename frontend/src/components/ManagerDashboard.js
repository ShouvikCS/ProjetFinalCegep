import React from 'react';
import { Link } from 'react-router-dom'; 

const ManagerDashboard = () => {

    return (
        <div>
            <h2>Manager Dashboard</h2>
            <Link to="/manager/inventory">
                    Inventory
                </Link>
        </div>
    );
};

export default ManagerDashboard;
