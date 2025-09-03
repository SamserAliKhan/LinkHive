import React, { useState, useEffect } from 'react';
import { getAllLinks, deleteLink, updateLink, handleApiCall } from '../services/apiService';

const LinkManager = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingLink, setEditingLink] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    url: '',
    description: '',
    tags: ''
  });

  // Load links when component mounts
  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await handleApiCall(getAllLinks);
      setLinks(result.links || result || []);
    } catch (error) {
      console.error('Error loading links:', error.message);
      setError(error.message || 'Failed to load links');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = async (linkId) => {
    if (!window.confirm('Are you sure you want to delete this link?')) {
      return;
    }

    try {
      await handleApiCall(deleteLink, linkId);
      // Remove the deleted link from the state
      setLinks(links.filter(link => link._id !== linkId));
      alert('Link deleted successfully!');
    } catch (error) {
      console.error('Error deleting link:', error.message);
      alert(error.message || 'Failed to delete link');
    }
  };

  const handleEditClick = (link) => {
    setEditingLink(link._id);
    setEditFormData({
      title: link.title,
      url: link.url,
      description: link.description || '',
      tags: link.tags ? link.tags.join(', ') : ''
    });
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateLink = async (e) => {
    e.preventDefault();
    
    try {
      const updateData = {
        ...editFormData,
        tags: editFormData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      };
      
      const result = await handleApiCall(updateLink, editingLink, updateData);
      
      // Update the link in the state
      setLinks(links.map(link => 
        link._id === editingLink 
          ? { ...link, ...updateData, ...result } // Include any updated data from server
          : link
      ));
      
      setEditingLink(null);
      alert('Link updated successfully!');
    } catch (error) {
      console.error('Error updating link:', error.message);
      alert(error.message || 'Failed to update link');
    }
  };

  const handleCancelEdit = () => {
    setEditingLink(null);
    setEditFormData({
      title: '',
      url: '',
      description: '',
      tags: ''
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-xl">Loading your links...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 text-xl">{error}</div>
        <button 
          onClick={loadLinks}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Your Links</h2>
        <button 
          onClick={loadLinks}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Refresh
        </button>
      </div>

      {links.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-xl text-gray-600">No links found</div>
          <p className="text-gray-500 mt-2">Start by adding your first link!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {links.map((link) => (
            <div 
              key={link._id} 
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
            >
              {editingLink === link._id ? (
                // Edit form
                <form onSubmit={handleUpdateLink} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">URL</label>
                    <input
                      type="url"
                      name="url"
                      value={editFormData.url}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                    <input
                      type="text"
                      name="tags"
                      value={editFormData.tags}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // Display mode
                <>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {link.title}
                    </h3>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-all"
                    >
                      {link.url}
                    </a>
                  </div>
                  
                  {link.description && (
                    <div className="mb-4">
                      <p className="text-gray-600">{link.description}</p>
                    </div>
                  )}
                  
                  {link.tags && link.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {link.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Created: {new Date(link.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(link)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteLink(link._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkManager;