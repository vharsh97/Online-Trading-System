const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
// const ObjectId = mongoose.Schema.Types.ObjectId;


const salt_Round = process.env.SALT_ROUND;

let StockBrokerSchema = new mongoose.Schema({
    // brokerId: {
    //     type: ObjectId,
    //     required: true
    // },
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
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    sensexRegId: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        trim: true,
        required: true,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 12
    },
    role: {
        type: String,
        trim: true,
        required: true,
        default: 'Broker'
    }
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
exports.Broker = mongoose.model('Broker', StockBrokerSchema);