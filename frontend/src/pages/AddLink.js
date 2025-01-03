import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLinks = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Clear previous success messages
    setErrorMessage(""); // Clear previous error messages

    // Prepare the form data

    // The form data is created here in statci where you are posting the data to the same userID 
    //which we need to change and have dynamic user id 
    //that can be done by getting the user id from the local storage and passing it to the form data 
    //someting through jwt token or any other way

    const formData = {
      title,
      url,
      description,
      tags: tags.split(",").map((tag) => tag.trim()), // Split tags by comma
      userId: "64eecf0d12345abc67890def", // Replace with actual user ID
    };

    console.log("Form Data:", formData); // Debugging payload

    try {
      const response = await axios.post(
        "http://localhost:5000/api/link/addlink", // Ensure this URL is correct
        formData
      );

      console.log("Response Data:", response.data); // Debugging API response
      setSuccessMessage("Link added successfully!");
      setTimeout(() => navigate("/dashboard"), 1000); // Slight delay for better UX
    } catch (error) {
      // Improved error handling with detailed logging
      if (error.response) {
        console.log("Server Error:", error.response.data);
        setErrorMessage(error.response.data.message || "Failed to add link.");
      } else {
        console.log("Error in Adding Link:", error.message);
        setErrorMessage("Failed to add link. Please try again.");
      }
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

      <button type="submit">Add Link</button>
    </form>
  );
};

export default AddLinks;
