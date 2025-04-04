import axios from "axios";
import React from "react";
import './PNR.css';

class PNRComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PNRNumber: "",
            PNRDetails: {},
            PassengerStatus: [],
            OnButtonClicked: false,
            ErrorMessage: "",
            IsErrorOccurred: false,
            isLoading: false
        };
    }

    handleChange = (event) => {
        this.setState({
            PNRNumber: event.target.value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!this.state.PNRNumber || this.state.PNRNumber.length < 10) {
            this.setState({
                ErrorMessage: "Please enter a valid 10-digit PNR number",
                IsErrorOccurred: true
            });
            return;
        }

        this.setState({
            isLoading: true,
            PNRDetails: {},
            PassengerStatus: [],
            ErrorMessage: "",
            IsErrorOccurred: false
        });

        try {
            const options = {
                method: 'GET',
                url: 'https://irctc1.p.rapidapi.com/api/v3/getPNRStatus',
                params: {
                    pnrNumber: this.state.PNRNumber
                },
                headers: {
                    'X-RapidAPI-Key': '78e886e8b5msh6d4e43b087b08b8p145a2djsnde547d29770c',
                    'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
                }
            };

            const response = await axios.request(options);
            
            if (response.data && response.data.data) {
                this.setState({
                    PNRDetails: response.data.data,
                    PassengerStatus: response.data.data.passengerStatus || [],
                    OnButtonClicked: true,
                    isLoading: false
                });
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("API Error:", error);
            this.setState({
                ErrorMessage: error.response?.data?.message || 
                             "Failed to fetch PNR details. Please try again.",
                IsErrorOccurred: true,
                isLoading: false
            });
        }
    }

    render() {
        return (
            <div className="luxury-app">
                <div className="luxury-header">
                    <div className="logo-container">
                        <img src="https://via.placeholder.com/50x50" alt="Railway Logo" className="logo" />
                        <h1>Premier Rail Enquiries</h1>
                    </div>
                    <div className="header-decoration"></div>
                </div>

                <div className="luxury-container">
                    <div className="pnr-input-section">
                        <h2 className="section-title">PNR Status Inquiry</h2>
                        <p className="section-subtitle">Experience the journey before it begins</p>
                        
                        <form onSubmit={this.handleSubmit} className="luxury-form">
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    id="pnr" 
                                    name="pnr" 
                                    value={this.state.PNRNumber} 
                                    onChange={this.handleChange}
                                    maxLength="10"
                                    placeholder="Enter 10-digit PNR number"
                                    className="luxury-input"
                                />
                                <button 
                                    type="submit" 
                                    disabled={this.state.isLoading}
                                    className="luxury-button"
                                >
                                    {this.state.isLoading ? (
                                        <span className="button-loading">
                                            <span className="spinner"></span> Processing...
                                        </span>
                                    ) : (
                                        "Check Status"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {this.state.isLoading && (
                        <div className="loading-overlay">
                            <div className="loading-content">
                                <div className="loading-spinner"></div>
                                <p>Retrieving your journey details...</p>
                            </div>
                        </div>
                    )}
                    
                    {this.state.IsErrorOccurred && (
                        <div className="luxury-alert error">
                            <div className="alert-icon">!</div>
                            <div className="alert-message">{this.state.ErrorMessage}</div>
                        </div>
                    )}

                    {this.state.OnButtonClicked && !this.state.IsErrorOccurred && (
                        <div className="results-container">
                            <div className="journey-summary">
                                <h3 className="summary-title">Journey Summary</h3>
                                <div className="summary-cards">
                                    <div className="summary-card">
                                        <div className="card-icon">🚆</div>
                                        <div className="card-content">
                                            <h4>Train Details</h4>
                                            <p>{this.state.PNRDetails.trainName || "N/A"}</p>
                                            <p className="card-subtext">No. {this.state.PNRDetails.trainNumber || "N/A"}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="summary-card">
                                        <div className="card-icon">📍</div>
                                        <div className="card-content">
                                            <h4>Route</h4>
                                            <p>{this.state.PNRDetails.boardingStationName || "N/A"} →</p>
                                            <p>{this.state.PNRDetails.destinationStationName || "N/A"}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="summary-card">
                                        <div className="card-icon">📅</div>
                                        <div className="card-content">
                                            <h4>Date of Journey</h4>
                                            <p>{this.state.PNRDetails.dateOfJourney || "N/A"}</p>
                                            <p className="card-subtext">PNR: {this.state.PNRDetails.pnrNumber || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {this.state.PassengerStatus.length > 0 && (
                                <div className="passenger-details">
                                    <h3 className="section-title">Passenger Details</h3>
                                    <div className="luxury-table-container">
                                        <table className="luxury-table">
                                            <thead>
                                                <tr>
                                                    <th>Passenger</th>
                                                    <th>Coach</th>
                                                    <th>Berth</th>
                                                    <th>Booking Status</th>
                                                    <th>Current Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.PassengerStatus.map((passenger, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{passenger.coachPosition || "N/A"}</td>
                                                        <td>{passenger.berthNo || "N/A"}</td>
                                                        <td>
                                                            <span className={`status-badge ${passenger.bookingStatus?.toLowerCase() || ''}`}>
                                                                {passenger.bookingStatus || "N/A"}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className={`status-badge ${passenger.currentStatus?.toLowerCase() || ''}`}>
                                                                {passenger.currentStatus || "N/A"}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="luxury-footer">
                    <p>© 2023 Premier Rail Services. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="#">Terms of Service</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Contact Us</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default PNRComponent;