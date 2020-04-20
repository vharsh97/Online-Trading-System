const Stock_1 = require("../Models/Stock");

class StockController {
    static getStocks(req, res, next) {
        Stock_1.Stock.find({}, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Stock found!', data: result });
            }
        });
    }
    static getStockById(req, res, next) {
        const stockId = req.params.id;
        Stock_1.Stock.findById(stockId, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Stock Found!', data: result });
            }
        });
    }
    static addStock(req, res, next) {
        const stock = new Stock_1.Stock(req.body);
        Stock_1.Stock.create(stock, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'stock Added!', data: result });
            }
        });
    }
    static updateStock(req, res, next) {
        Stock_1.Stock.findByIdAndUpdate(req.body._id, {
            $set: {
                stockId: req.body.stockId,
                stockName: req.body.stockName,
                openPrice: req.body.openPrice,
                closePrice: req.body.closePrice,
                currentPrice: req.body.currentPrice,
                quantity: req.body.quantity
            }
        }, (err, result) => {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Stock Updated!', data: result });
            }
        });
    }
}
exports.StockController = StockController;
