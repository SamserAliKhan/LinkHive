import Link from '../../models/linkModel.js'; // Assuming you have a Link model

export const addLink = async (req, res) => {
    const { userId, title, url, description, tags } = req.body; // Extract data from the request body

    try {
        // Validate the input
        if (!url || !userId) {
            return res.status(400).json({ message: "URL and User ID are required" });
        }

        // Create a new link entry
        const newLink = new Link({
            userId,
            title,
            url,
            description,
            tags,
            createdAt: new Date(),
        });
        //Debuging 
        console.log(newLink);
        
        // Save the link to the database
        await newLink.save();

        res.status(201).json({ message: "Link added successfully", link: newLink });
    } catch (error) {
        console.error("Error adding link:", error);
        res.status(500).json({ message: "Failed to add link", error: error.message });
    }
};
