import Link from "../models/LinksModel.js";

// POST /link/addLink
const addLink = async (req, res) => {
  try {
    const { title, url, description, tags } = req.body;
    const userId = req.headers["x-user-id"]; // injected by gateway

    // Validate user ID
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized - No user ID" });
    }
    // Validate input
    if (!url || !userId) {
      return res.status(400).json({ message: "URL and User ID are required" });
    }
    // Prevent duplicate link for same user
    const existingLink = await Link.findOne({ userId, url });
    if (existingLink) {
      return res.status(409).json({ message: "Link already exists for this user" });
    }

    const newLink = new Link({
      userId,
      title,
      url,
      description,
      tags,
    });

    await newLink.save();

    res.status(201).json({ message: "Link added successfully", link: newLink });
  } catch (err) {
    console.error("Error adding link:", err);
    res.status(500).json({ message: "Failed to add link" });
  }
};

export default addLink;
