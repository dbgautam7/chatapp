const Users = require("../models/Users");
const bcrypt = require("bcrypt")


const Login=async (req, res) => {
    try {
        const user = await Users.findOne({ phoneOrEmail: req.body.phoneOrEmail }).lean();
        console.log(user,"&&")
        if (user) {
          const {password, __v, ...refactoredData} = user
          const isMatched = bcrypt.compareSync(req.body.password, password);
          // console.log(isMatched,req.body.password,"bool")
          if (isMatched) {
            res.status(200).json({
              userDetails:refactoredData,
              isLoggedIn:true,
              msg: "Logged in successfully",
            });
          } else {
            res.status(401).json({
              errorMsg: "Invalid credentials",
            });
          }
        } else {
          res.status(404).json({
            errorMsg: "User not found",
          });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({
          errorMsg: "Internal server error",
        });
      }
    };
  
  exports.Login=Login