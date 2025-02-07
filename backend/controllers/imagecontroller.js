


const uploadImage = async (req,res) =>{
    //upload to ipfs and get th cid  store to mongodb and get that id store to blockchain
    const {image} = req.body;

    if(!image){
        return res.status(400).json({message:"Image is required"});
    }

    //upload to ipfs


    // store the hashb in db 

}


module.exports = {
    uploadImage
}