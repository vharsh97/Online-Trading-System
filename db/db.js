const mongoose = require("mongoose");

class MongoConnect {
    static connect() {
        const mongoDBConn = process.env.MONGODB_URL || '';
        return mongoose.connect(mongoDBConn, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    }
}

exports.MongoConnect = MongoConnect;