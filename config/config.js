const mongoose = require('mongoose');
require('colors');

// ConnectDB Function
const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MONGODB CONNECTED ${conn.connection.host}`.bgYellow)
    } catch (error) {
        console.log(`Error ${error}`.bgRed)
        process.exit(1)
    }
}

// export
module.exports = connectDb;