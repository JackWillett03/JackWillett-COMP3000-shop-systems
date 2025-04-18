const mongoose = require('mongoose');

const StockListSchema = new mongoose.Schema({
  ShopId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShopList', required: true, },
  Item: { type: String, required: true, trim: true, },
  CurrentStock: { type: Number, required: true, default: 0, },
  Price: { type: String, required: true, },
  Tags: { type: [String], default: [], },
});

const Stock = mongoose.model('StockList', StockListSchema);
module.exports = Stock;// Export so can be accessed by other node modules