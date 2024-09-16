import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import { useSelector } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';
import Spinner from './Spinner';

const Signup = () => {
    // svgs
    const { logo } = useSelector(selectIcons);
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        const { name, email, password, cpassword } = credentials;

        if (password !== cpassword) {
            setErrorMessage('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                navigate("/");  // Redirect to home after successful signup
            } else {
                setErrorMessage('Invalid Details');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setErrorMessage('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="signup-container">
            {loading && <Spinner />} {/* Show spinner when loading */}

            <div className="signup-box">
                <h1 className="signup-title"><img src={logo} alt="" /></h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input
                            type="text"
                            name="name"
                            value={credentials.name}
                            onChange={onChange}
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="cpassword"
                            value={credentials.cpassword}
                            onChange={onChange}
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                    <button type="submit" className="signup-btn" disabled={loading}>
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
                <div className="login-box">
                    <p>
                        Already have an account?{' '}
                        <button onClick={() => navigate('/login')} className="login-btn">
                            Log in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
