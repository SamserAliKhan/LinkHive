import Link from "../models/LinksModel.js";

// GET /link
const getLinks = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"]; // injected by gateway

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: no user id" });
    }

    const links = await Link.find({ userId }).sort({ createdAt: -1 });
    res.json(links);
  } catch (err) {
    console.error("Error fetching links:", err);
    res.status(500).json({ message: "Failed to fetch links" });
  }
};

export default getLinks;
