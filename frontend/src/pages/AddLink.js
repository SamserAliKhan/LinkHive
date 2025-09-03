import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addLink, handleApiCall } from "../services/apiService";

const AddLinks = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Clear previous success messages
    setErrorMessage(""); // Clear previous error messages
    setIsLoading(true);

    // Prepare the form data - no need for hardcoded userId, 
    // the backend will get user info from the JWT token
    const linkData = {
      title,
      url,
      description,
      tags: tags.split(",").map((tag) => tag.trim()).filter(tag => tag.length > 0), // Split tags by comma and filter empty ones
    };

    console.log("Link Data:", linkData); // Debugging payload

    try {
      const result = await handleApiCall(addLink, linkData);
      console.log("Response Data:", result); // Debugging API response
      setSuccessMessage("Link added successfully!");
      
      // Clear form fields on success
      setTitle("");
      setUrl("");
      setDescription("");
      setTags("");
      
      setTimeout(() => navigate("/dashboard"), 1000); // Slight delay for better UX
    } catch (error) {
      console.error("Error in Adding Link:", error.message);
      setErrorMessage(error.message || "Failed to add link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Link</h2>
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="url">URL</label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Adding Link..." : "Add Link"}
      </button>
    </form>
  );
};

export default AddLinks;
