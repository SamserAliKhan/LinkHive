import Link from "../models/LinksModel.js";

const DeletLink = async(req,res) =>{
    try{
      const { id } = req.params;
      const userId = req.headers["x-user-id"]; // injected by gateway

      const link = await Link.findOneAndDelete({ _id: id, userId });
      if (!link) {
        return res.status(404).json({ message: "Link not found or user not authorized" });
      }
      res.status(200).json({ message: "Link deleted successfully" });
    }catch(err){
      console.error("Error deleting link:", err);
      res.status(500).json({ message: "Failed to delete link" });
    }
}

export default DeletLink;