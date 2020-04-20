const StockBroker = require("../Models/StockBroker");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

class StockBrokerController {
    static login(req, res, next) {
        const private_key = process.env.PRIVATEKEY || '';
        StockBroker.Broker.findOne({ sensexRegId: req.body.sensexRegId }, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                if (result != undefined) {
                    if (bcryptjs.compareSync(req.body.password, result.password)) {
                        const token = jsonwebtoken.sign({ id: result._id }, private_key, { expiresIn: '1h' });
                        res.json({ status: 'success', message: 'Login Success!', data: token, account: result.account });
                    }
                    else {
                        res.json({ status: 'failed', message: 'UserName or Password is incorrect!' });
                    }
                }
                else {
                    res.json({ status: 'failed', message: 'UserName or Password is incorrect!' });
                }
            }
        });
    }
    static registration(req, res, next) {
        const broker = new StockBroker.Broker(req.body);
        StockBroker.Broker.create(broker, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Registration Successful!', data: result });
            }
        });
    }
    static updateProfile(req, res, next) {
        const brokerId = req.body.brokerId;
        StockBroker.Broker.findByIdAndUpdate(brokerId, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mobile: req.body.mobile,
                account: req.body.account
            },
            $push: {
                portfolio: new StockBroker.Invoice(req.body.stock)
            }
        }, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Profile Updated!', data: null });
            }
        });
    }
    static insertInvoice(req, res, next) {
        console.log(req)
        StockBroker.Broker.findByIdAndUpdate(req.body.brokerId, {
            $push: {
                Portfolio: new StockBroker.Invoice(req.body.stock)
            }
        },
        {
            safe: true, 
            upsert: true
        }, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Profile Updated!', data: null });
            }
        });
    }
    static getProfile(req, res, next) {
        const brokerId = req.body.brokerId;
        StockBroker.Broker.findById(brokerId, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Profile fetched successfully!', data: result });
            }
        });
    }
}
exports.StockBrokerController = StockBrokerController;
