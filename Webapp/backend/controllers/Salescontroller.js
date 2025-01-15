const Sales = require('../models/Sales');
const mongoose = require('mongoose');

exports.addSales = async (req, res) => { // Add sales data
    try {
        const { StockId, Sold } = req.body;

        let sales = await Sales.findOne({ StockId }); // Find existing data for the StockId

        if (!sales) {
            // If no data exists, create a new entry
            sales = new Sales({
                StockId,
                OneMonthAgo: Sold, // Data goes into OneMonthAgo
            });
        } else {
            sales.FourteenMonthsAgo = undefined; // clear 14 months ago
            sales.FourteenMonthsAgo = sales.ThirteenMonthsAgo;
            sales.ThirteenMonthsAgo = sales.TwelveMonthsAgo;
            sales.TwelveMonthsAgo = sales.ElevenMonthsAgo;
            sales.ElevenMonthsAgo = sales.TenMonthsAgo;
            sales.TenMonthsAgo = sales.NineMonthsAgo;
            sales.NineMonthsAgo = sales.EightMonthsAgo;
            sales.EightMonthsAgo = sales.SevenMonthsAgo;
            sales.SevenMonthsAgo = sales.SixMonthsAgo;
            sales.SixMonthsAgo = sales.FiveMonthsAgo;
            sales.FiveMonthsAgo = sales.FourMonthsAgo;
            sales.FourMonthsAgo = sales.ThreeMonthsAgo;
            sales.ThreeMonthsAgo = sales.TwoMonthsAgo;
            sales.TwoMonthsAgo = sales.OneMonthAgo; // Move OneMonthAgo to TwoMonthsAgo

            sales.OneMonthAgo = Sold; // Add new data to OneMonthAgo
        }

        // Save the updated sales data
        await sales.save();

        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getSales = async (req, res) => { //Get all sales
    try {
        const sales = await Sales.find();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSalesByStockId = async (req, res) => { // Get sales by StockId
    try {
        const { stockId } = req.params;
        const stockObjectId = new mongoose.Types.ObjectId(stockId); // Convert stockId to ObjectId
        const sales = await Sales.find({ StockId: stockObjectId });

        if (!sales || sales.length === 0) {
            return res.status(404).json({ message: 'Sales not found for the StockId' });
        }
        
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSales = async (req, res) => { // Update sales by Id
    try {
        const { month, sold } = req.body;

        let sales = await Sales.findOne({ _id: req.params.id }); // Find the existing sales data

        if (!sales) {
            return res.status(404).json({ message: 'Sales not found' });
        }

        const validMonths = [  // Make sure the month is one of the allowed months
            "OneMonthAgo", "TwoMonthsAgo", "ThreeMonthsAgo", "FourMonthsAgo", "FiveMonthsAgo", 
            "SixMonthsAgo", "SevenMonthsAgo", "EightMonthsAgo", "NineMonthsAgo", "TenMonthsAgo", 
            "ElevenMonthsAgo", "TwelveMonthsAgo", "ThirteenMonthsAgo", "FourteenMonthsAgo"
        ];

        if (!validMonths.includes(month)) {
            return res.status(400).json({ message: 'Invalid month specified' });
        }

        sales[month] = sold; // Update the month

        await sales.save(); // Save the updated data

        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteSales = async (req, res) => { // Delete sales by Id
    try {
        const deletedSales = await Sales.findByIdAndDelete(req.params.id);
        if (!deletedSales) {
            return res.status(404).json({ message: 'Sales not found' });
        }
        res.status(200).json({ message: 'Sales deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
