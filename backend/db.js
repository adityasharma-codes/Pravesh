const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_URI ;
const Connection = async () => {
    try {
        const connection =    await mongoose.connect(mongo_url);
        if (connection) {
            console.log('MongoDB connected successfully');
        }
        
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = Connection