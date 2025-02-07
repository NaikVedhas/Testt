const Image = require("../models/imageModel");

const uploadImage = async (req, res) => {
  //upload to ipfs and get th cid  store to mongodb and get that id store to blockchain

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    //upload to ipfs
    try {
        
    } catch (error) {
      console.log("Error in IPFs", error);
      return res.status(400).json({ message: "Server Error" });
    }

    // store the hashb in db

    try {
      let hash;
      const newImage = await Image.create({ image: hash });

    } catch (error) {
      console.log("Error in MongoDB", error);
      return res.status(400).json({ message: "Server Error" });
    }

    //send the hash to blockchain
    try {
        
    } catch (error) {
        console.log("Error in blockchain", error);
        return res.status(400).json({ message: "Server Error" });
    }



  } catch (error) {
    console.log("Error in UploadImage", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  uploadImage,
};
