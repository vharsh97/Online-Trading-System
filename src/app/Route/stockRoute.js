const stockController = require("../Controller/stockController");
const express = require("express")

exports.stockRoute = express.Router();

exports.stockRoute.get('/', stockController.StockController.getStocks);
exports.stockRoute.get('/:id', stockController.StockController.getStockById);
exports.stockRoute.post("/", stockController.StockController.addStock);
exports.stockRoute.put("", stockController.StockController.updateStock);