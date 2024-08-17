const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        const connect = await mongoose.connect("mongodb://localhost:27017/contacts?retryWrites=true&loadBalanced=false&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000");
        console.log("Database Connected", connect.connection.host,connect.connection.name)
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB