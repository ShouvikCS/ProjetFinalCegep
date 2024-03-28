import React from 'react';
import { Link } from 'react-router-dom'; 

const LoginForm = () => {
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Login</h2>
            <form style={styles.form}>
                <label style={styles.label}>
                    Username:
                    <input type="text" style={styles.input} />
                </label>
                <label style={styles.label}>
                    Password:
                    <input type="password" style={styles.input} />
                </label>
                <Link to="/manager/dashboard" style={styles.link}>
                    Login as Manager
                </Link>
                <Link to="/employee/dashboard" style={styles.link}>
                    Login as Employee
                </Link>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#4CAF50', 
    },
    heading: {
        color: '#FFF', 
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
    },
    label: {
        color: '#FFF',
        marginBottom: 10,
    },
    input: {
        padding: '8px 10px',
        marginBottom: 15,
        border: 'none',
        borderRadius: 4,
        backgroundColor: '#FFF', 
    },
    link: {
        padding: '10px 20px',
        backgroundColor: '#FFF', 
        color: '#4CAF50', 
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        fontWeight: 'bold',
        textDecoration: 'none',
    },
};

export default LoginForm;
