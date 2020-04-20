const stockBrokerController = require("../Controller/stockBrokerController");
const express = require("express");
const auth = require("../Middleware/auth");

exports.stockBrokerRoute = express.Router();
exports.stockBrokerRoute.get('/', auth.validatebroker, stockBrokerController.StockBrokerController.getProfile);
exports.stockBrokerRoute.post("/login", stockBrokerController.StockBrokerController.login);
exports.stockBrokerRoute.post("/registration", stockBrokerController.StockBrokerController.registration);
exports.stockBrokerRoute.put("/", auth.validatebroker, stockBrokerController.StockBrokerController.updateProfile);
exports.stockBrokerRoute.put("/buy", auth.validatebroker, stockBrokerController.StockBrokerController.insertInvoice);