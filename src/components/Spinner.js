import React from 'react';
import '../styles/spinner.css';  // Import CSS for spinner

const Spinner = () => {
    return (
        <div className="spinner-overlay">
            <div className="spinner-container">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Spinner;
