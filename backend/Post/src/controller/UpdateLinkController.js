import Link from "../models/LinksModel.js";

// PUT /link/update
const updateLink = async(req,res)=>{
    try{
      const { id } = req.params;
      const { title, url, description, tags } = req.body;
      const userId = req.headers["x-user-id"]; // injected by gateway

      const link = await Link.findOne({ _id: id, userId });

      // Find the link to update
      if (!link) {
        return res
          .status(404)
          .json({ message: "Link not found or user not authorized" });
      }

      // Update the link fields
      link.title = title || link.title;
      link.url = url || link.url;
      link.description = description || link.description;
      link.tags = tags || link.tags;

      await link.save();

      res.status(200).json({ message: "Link updated successfully", link });
    } catch (err) {
      console.error("Error updating link:", err);
      res.status(500).json({ message: "Failed to update link" });
    }
};

export default updateLink;