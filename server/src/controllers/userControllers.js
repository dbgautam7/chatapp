const Users = require("../models/Users");

const GetUsers = async (req, res) => {
    try {
        const data = await Users.find()
        console.log(data,"data")
        if (data) {
            res.status(200).json({
                userList:data,
                msg:"Users fetch successfully"
            })
        } else {
            res.status(500).json({
                msg: "something went wrong"
            })
        }
    } catch (err) {
        console.log(err);
    }
}


exports.GetUsers = GetUsers