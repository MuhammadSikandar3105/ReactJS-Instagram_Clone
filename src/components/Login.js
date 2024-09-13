import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { useSelector } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';
import '../styles/loginpage.css';

const Login = () => {
    // svgs
    const { instalogin, logo } = useSelector(selectIcons);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    let navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/");  // Redirect to home if already logged in
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                navigate("/");  // Redirect to home after successful login
            } else {
                setErrorMessage('Invalid Credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="login-container2">
            {loading && <Spinner />} {/* Show spinner when loading */}

            <div className="login-box2">
                <h1 className="login-title2"><img src={logo} alt="" /></h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-box2">
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="input-box2">
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn2" disabled={loading}>
                        {loading ? 'Loading...' : 'Log In'}
                    </button>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
                <div className="signup-box2">
                    <p>
                        Don't have an account?{' '}
                        <button onClick={() => navigate('/signup')} className="signup-btn2">
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
