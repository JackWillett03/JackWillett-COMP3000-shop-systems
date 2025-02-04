import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Sales.css";

const Sales = () => {
    const [sales, setSales] = useState([]); // Stores sales data
    const [sold, setSold] = useState(""); // Stores input add value
    const [error, setError] = useState(""); 
    const [isOwner, setIsOwner] = useState(false); // Checks if user is a owner
    const [isManager, setIsManager] = useState(false); // Checks if user is a manager 
    const [editingSale, setEditingSale] = useState(null); // Track which sale is being edited
    const [updatedSaleData, setUpdatedSaleData] = useState({}); // Stores updated sales data
    const navigate = useNavigate();
    const { stockId } = useParams(); // Get the stockId from the URL

    // Check JWT and roles
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        const decodedToken = parseJwt(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken && decodedToken.exp > currentTime) {
            setIsOwner(decodedToken.isOwner || false);
            setIsManager(decodedToken.isManager || false);
        } else { // If token is invalid or expired log the user out
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            navigate("/"); // Go to ShopList
        }
        } else {
        navigate("/"); // Go to ShopList
        }
    }, []);

    const parseJwt = (token) => { // Decode JWT
        try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64));
        } catch (e) {
        return null;
        }
    };

    // Fetch the data when the stockId changes
    useEffect(() => {
        fetchSalesData();
    }, [stockId]);

    // Get sales data
    const fetchSalesData = async () => {
        try {
        const response = await fetch(`http://localhost:82/sales/stock/${stockId}`);
        const data = await response.json();
        console.log("Fetched Sales Data:", data);

        if (!response.ok || !data) {
            throw new Error("Failed to fetch sales data.");
        }

        setSales(Array.isArray(data) ? data : [data]); // Make sure the data is an array
        } catch (err) {
        console.error("Error fetching sales:", err);
        setError(err.message);
        }
    };

    // Add sales data
    const handleAddSale = async () => {
        if (!sold) return alert("Please enter the number of items sold.");
        try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:82/sales", { // POST Reqest 
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ StockId: stockId, Sold: Number(sold) }),
        });

        if (!response.ok) {
            throw new Error("Failed to add sale.");
        }

        alert("Sale added successfully.");
        setSold(""); // Reset input
        fetchSalesData(); // Refresh the dispalyed data
        } catch (err) {
        alert(err.message);
        }
    };

    // Update sales form
    const handleEditSale = (sale) => {
        setEditingSale(sale); // Set which one is being edited
        setUpdatedSaleData({
        month: "",  // Make the month empty
        sold: 0,    // Make the sold amount as 0
        }); 
    };

    // Update sale
    const handleUpdateSale = async () => {
        if (!updatedSaleData.month || updatedSaleData.sold === "") {
        alert("Please select a month and enter the sold quantity.");
        return;
        }

        const updatedData = {
        month: updatedSaleData.month,  // The month selected
        sold: updatedSaleData.sold,    // The amount sold
        };

        try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:82/sales/${editingSale._id}`, { // PUT request
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error("Failed to update sale.");
        }

        alert("Sale updated successfully.");
        setEditingSale(null); // Close the form
        fetchSalesData(); // Refresh the data
        } catch (err) {
        alert(err.message);
        }
    };

    // Cancel button on update form
    const handleCancelEdit = () => {
        setEditingSale(null); // Close the form without saving the changes
    };

    // Delete sales
    const handleDeleteSale = async (saleId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this sale?");
        if (isConfirmed) {
        try {
            const token = localStorage.getItem("token"); // Get the jwt from storage
            const response = await fetch(`http://localhost:82/sales/${saleId}`, { // DELETE Request
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            });

            if (!response.ok) {
            throw new Error("Failed to delete sale.");
            }

            alert("Sale deleted successfully.");
            fetchSalesData();
        } catch (err) {
            alert(err.message);
        }
        }
    };

    // Update placement suggestion 
    const handleUpdatePlacement = async (sale) => {
    const { ShopId } = sale;  // Get the ShopId from the sales data

    if (!ShopId) { // If ShopId doesn't exist tell user in alert
        alert("Shop ID is missing. Unable to update placement.");
        return;
    }

    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:82/sales/updatePlacement/${ShopId}`, { // PUT Request
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        });

        if (!response.ok) {
        throw new Error("Failed to update placement.");
        }

        alert("Placement updated successfully."); // Send an alert telling a user it was successful
        fetchSalesData(); // Refresh sales data
    } catch (err) {
        alert(err.message);
    }
    };

    // Update linear regression prediction
    const handleUpdateSalesPrediction = async (stockId) => {
        try {
        const token = localStorage.getItem("token"); // Get JWT from storage
        const response = await fetch(`http://localhost:82/sales/updateSalesPrediction/${stockId}`, { // PUT Request
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to update sales prediction.");
        }

        alert("Sales prediction updated successfully.");
        fetchSalesData(); // Refresh data
        } catch (err) {
        alert(err.message);
        }
    };

  const back = localStorage.getItem("page"); // get the last page from localstorage to let the back button go to the correct page

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="salescontainer">
        {/* Back button */}
        <button className="backbuttons" onClick={() => navigate(back)}>Back</button>
        <h1>Sales Data</h1>

        {/* Show add button only for owners and managers */}
        {(isOwner || isManager) && (
            <div className="addsale">
            <input
                type="number"
                className="input-box"
                placeholder="Enter amount sold"
                value={sold}
                onChange={(e) => setSold(e.target.value)}
            />
            <button className="addbutton" onClick={handleAddSale}>Add Sale</button>
            </div>
        )}

        <div className="saleslist">
            {sales.length === 0 ? (
            <p>No sales data found. You can add one.</p>
            ) : (
            // Loop through the sales data, display each part
            sales.map((sale) => (
                <div key={sale._id} className="salecard">
                <h2>{sale.Item}</h2>
                <p><strong>Placement:</strong> {sale.Placement}</p>
                <p><strong>Predicted Next Month Sales:</strong> {sale.PredictedNextMonthSales.toFixed(2)}</p>
                <p><strong>Last 14 Months Sales:</strong></p>
                {/* Display the last 14 months */}
                <ul>
                    {["OneMonthAgo", "TwoMonthsAgo", "ThreeMonthsAgo", "FourMonthsAgo",
                    "FiveMonthsAgo", "SixMonthsAgo", "SevenMonthsAgo", "EightMonthsAgo",
                    "NineMonthsAgo", "TenMonthsAgo", "ElevenMonthsAgo", "TwelveMonthsAgo",
                    "ThirteenMonthsAgo", "FourteenMonthsAgo"].map((key, i) => (
                    <li key={i}>{key.replace("MonthAgo", " Month Ago")}: {sale[key] || 0}</li>
                    ))}
                </ul>

                {/* Show buttons for Managers and Owner */}
                {(isOwner || isManager) && (
                    <div className="actionbuttons">
                    {/* Update placement and prediciton buttons */}
                    <button onClick={() => handleUpdatePlacement(sale)} className="updateplacementbutton">
                        Update Placement
                    </button>
                    <button onClick={() => handleUpdateSalesPrediction(stockId)} className="updatesalespredictionbutton">
                        Update Sales Prediction
                    </button>
                    <button onClick={() => handleEditSale(sale)} className="updatebutton">Update</button>
                    <button onClick={() => handleDeleteSale(sale._id)} className="deletebutton">Delete</button>
                    </div>
                )}

                {/* Update Form */}
                {editingSale && editingSale._id === sale._id && (
                    <div className="editform">
                    <h3>Edit Sale Data</h3>

                    {/* Add a dropdown for selecting the month */}
                    <div>
                        <label>Select Month:</label>
                        <select 
                        value={updatedSaleData.month} 
                        onChange={(e) => setUpdatedSaleData({ ...updatedSaleData, month: e.target.value })}
                        >
                        <option value="">Select Month</option>
                        <option value="OneMonthAgo">1 Month Ago</option>
                        <option value="TwoMonthsAgo">2 Months Ago</option>
                        <option value="ThreeMonthsAgo">3 Months Ago</option>
                        <option value="FourMonthsAgo">4 Months Ago</option>
                        <option value="FiveMonthsAgo">5 Months Ago</option>
                        <option value="SixMonthsAgo">6 Months Ago</option>
                        <option value="SevenMonthsAgo">7 Months Ago</option>
                        <option value="EightMonthsAgo">8 Months Ago</option>
                        <option value="NineMonthsAgo">9 Months Ago</option>
                        <option value="TenMonthsAgo">10 Months Ago</option>
                        <option value="ElevenMonthsAgo">11 Months Ago</option>
                        <option value="TwelveMonthsAgo">12 Months Ago</option>
                        <option value="ThirteenMonthsAgo">13 Months Ago</option>
                        <option value="FourteenMonthsAgo">14 Months Ago</option>
                        </select>
                    </div>

                    <div>
                        <label>Enter Sold Quantity:</label>
                        <input 
                        type="number" 
                        value={updatedSaleData.sold || 0}
                        onChange={(e) => setUpdatedSaleData({ ...updatedSaleData, sold: e.target.value })}
                        />
                    </div>
                    {/* Update and cancel buttons */}
                    <button onClick={handleUpdateSale} className="updatebutton">Update Sale</button>
                    <button onClick={handleCancelEdit} className="cancelbutton">Cancel</button>
                    </div>
                )}
                </div>
            ))
            )}
        </div>
    </div>
    );
};

export default Sales;
