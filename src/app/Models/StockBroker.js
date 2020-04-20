const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
// const ObjectId = mongoose.Schema.Types.ObjectId;


const salt_Round = process.env.SALT_ROUND;

const BookStockSchema = new mongoose.Schema({
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

let StockBrokerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    sensexRegId: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 10,
        minlength: 10
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 12
    },
    account: {
        type: Number,
        trim: true,
        required: true,
        default: 0
    },
    Portfolio: [{
        type: BookStockSchema,
        // trim: true
    }]
});
StockBrokerSchema.pre('save', function (next) {
    const broker = this;
    if (broker.isModified("password")) {
        const saltRound = parseInt(salt_Round);
        bcryptjs.genSalt(saltRound, (err, salt) => {
            bcryptjs.hash(broker.password, salt, (err, hash) => {
                if (err) {
                    throw err;
                }
                else {
                    broker.password = hash;
                    next();
                }
            });
        });
    }
    else {
        next();
    }
});
exports.Invoice = mongoose.model('Invoice', BookStockSchema);
exports.Broker = mongoose.model('Broker', StockBrokerSchema);