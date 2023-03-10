const mongoose = require('mongoose');
module.exports = connect=async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/chatapp', {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("connected to mongodb");
    }catch(error){
        console.error(error);
    }
  }