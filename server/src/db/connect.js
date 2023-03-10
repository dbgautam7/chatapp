const mongoose = require('mongoose');
module.exports = connect=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/chatapp', {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("connected to mongodb");
    }catch(error){
        console.error(error);
    }
  }