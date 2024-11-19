import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLinks = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Clear previous success messages
    setErrorMessage(''); // Clear previous error messages

    // Prepare the form data
    const formData = {
      title,
      url,
      description,
      tags: tags.split(',').map(tag => tag.trim()), // Split tags by comma
    };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/addLink', formData);
      setSuccessMessage("Link added successfully!");
      console.log(response.data);
      navigate('/dashboard'); // Navigate to the dashboard after successful addition
    } catch (error) {
      console.log("Error in Adding Link:", error);
      setErrorMessage("Failed to add link. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Link</h2>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

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
