const app = require('./app');
const dotenv = require('dotenv');
const connDB = require('./config/db');

dotenv.config({path :'./Config/Config.env'});

connDB();


app.listen(process.env.PORT || 8586,()=>{
    console.log(`server is connected to http://localhost:${process.env.PORT || 8586}`);
})

