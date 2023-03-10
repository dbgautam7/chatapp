const Users = require('../models/Users')
const bcrypt = require('bcrypt');

const Register = async (req, res) => {
    const hash = await bcrypt.hashSync(req.body.password, 10);
    try {
        Users.findOne({$and: [{email: req.body.email}, {phone:req.body.phone}]})
        .then((user) => {
            if (!user) {
                const hash = bcrypt.hashSync(req.body.password, 10);
                req.body.password = hash
                Users.create(req.body)
                    .then((userData) => {
                        console.log(userData,"@@")
                        if (userData) {
                            res.json({
                                msg: "Your account is successfully Added"
                            });
                        } else {
                            res.json({ errorMsg: "something went wrong" });
                        }})
            } else {
                res.status(409).json({ errorMsg: "user already exists" });
            }})
    } catch (err) {
        console.log(err);
    }
};

exports.Register = Register;
