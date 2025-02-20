const mongoose = require('mongoose');


//creating database connection
const Connect_Database = () =>{
    //connection using connect method
<<<<<<< HEAD
    mongoose.connect(process.env.DB_URI, {family: 4,connectTimeoutMS: 20000,})
=======
<<<<<<< HEAD
    mongoose.connect(process.env.DB_URI, {family: 4,serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000})
=======
    mongoose.connect(process.env.DB_URI, {family: 4,connectTimeoutMS: 20000,})
>>>>>>> 03f4d9f45d09d0cea8e15a54246124b60f20c290
>>>>>>> bec3171262bd53ddc4d2863cfc6250a706401649
    .then(() => console.log('Database : Mongodb Connected Successfully'))
    //if error occurs
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
}

module.exports = Connect_Database;