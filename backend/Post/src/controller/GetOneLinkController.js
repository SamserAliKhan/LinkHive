import Link from "../models/LinksModel.js";

const GetOneLink = async(req,res) =>{
    try{
        const { id } = req.params;
        const userId = req.headers["x-user-id"]; //injected by API-gateway

        const link = await Link.findOne({_id: id, userId});
        if(!link){
            //return error link not found
            res.status(404).json({message:"Link not found"});
        }
        res.status(200).json({link,message:"Link fetched successfully"});
    }catch(err){
        console.error("Error fetching link:", err);
        res.status(500).json({message: "Failed to fetch link"});
    }
};

export default GetOneLink;