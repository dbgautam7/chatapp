const Users =require("../models/Users")

const PostProfile = async(req, res) => {
  try{
    console.log(req.file)
    const data = await Users.findByIdAndUpdate(req.body._id, { photo: req.file.filename }).lean()
    if (data) {
      res.status(200).json({
        userProfilePic:data,
        msg: "Image Uploaded Successfully"
      })
    }
    else{
      res.status(404).json({
        msg:"Image not selected"
      })
    }
  }
  catch(error){
    console.log(error)
  }
  };

  exports.PostProfile=PostProfile