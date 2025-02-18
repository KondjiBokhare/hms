const mongoose = require('mongoose');


//creating database connection
const Connect_Database = () =>{
    //connection using connect method
    mongoose.connect(process.env.DB_URI, {family: 4,serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000})
    .then(() => console.log('Database : Mongodb Connected Successfully'))
    //if error occurs
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
}

module.exports = Connect_Database;