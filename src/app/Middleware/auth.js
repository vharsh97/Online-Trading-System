const jsonwebtoken = require("jsonwebtoken");

function validatebroker(req, res, next) {
    const token = req.headers['x-access-token'];
    const private_key = process.env.PRIVATEKEY || '';
    jsonwebtoken.verify(token, private_key, (err, decoded) => {
        if (err) {
            res.status(401).json({
                status: 'failed',
                message: 'Your session is expired',
                data: null
            });
        }
        else {
            req.body.brokerId = decoded.id;
            next();
        }
    });
}
exports.validatebroker = validatebroker;