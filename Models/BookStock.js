const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const BookStockSchema = new mongoose.Schema({
    bookId: {
        type: ObjectId,
        required: true
    },
    stockId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});
exports.BookStock = mongoose.model('BookStock', BookStockSchema);
