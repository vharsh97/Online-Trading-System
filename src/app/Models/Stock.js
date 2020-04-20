const mongoose = require("mongoose");
// const ObjectId = mongoose.Schema.Types.ObjectId;


const StockSchema = new mongoose.Schema({
    stockId: {
        type: String,
        required: true,
        unique: true
    },
    stockName: {
        type: String,
        required: true,
        trim: true
    },
    openPrice: {
        type: Number,
        required: true
    },
    closePrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});
exports.Stock = mongoose.model('Stock', StockSchema);
