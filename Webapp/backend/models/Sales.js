const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
  StockId: { type: mongoose.Schema.Types.ObjectId, ref: 'StockList', required: true, },
  OneMonthAgo: { type: Number, default: 0, },
  TwoMonthsAgo: { type: Number, default: 0, },
  ThreeMonthsAgo: { type: Number, default: 0, },
  FourMonthsAgo: { type: Number, default: 0, },
  FiveMonthsAgo: { type: Number, default: 0, },
  SixMonthsAgo: { type: Number, default: 0, },
  SevenMonthsAgo: { type: Number, default: 0, },
  EightMonthsAgo: { type: Number, default: 0, },
  NineMonthsAgo: { type: Number, default: 0, },
  TenMonthsAgo: { type: Number, default: 0, },
  ElevenMonthsAgo: { type: Number, default: 0, },
  TwelveMonthsAgo: {  type: Number, default: 0, },
  ThirteenMonthsAgo: { type: Number, default: 0, },
  FourteenMonthsAgo: { type: Number, default: 0, },
});

const Sale = mongoose.model('Sales', SalesSchema);
module.exports = Sale; // Export so can be accessed by other node modules