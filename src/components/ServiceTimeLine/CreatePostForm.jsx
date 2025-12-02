import React, { useState } from 'react'
import { BACKEND_URL } from '../../config/api';
import { useAuth } from '../../pages/AuthProvider';
import axios from 'axios';
export const CreatePostForm = ({serviceId,onPostCreated}) => {
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
 const {accessToken}=useAuth();
//   handle changes of attachment
  const handleAttachment=(e)=>{
    const files= Array.from(e.target.files);
    setAttachments(files);

  }
  const submitPost=async(e)=>{
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading("");
    try {
        const payload = {
        serviceId,
        description,
        attachments, 
      }
      const response = await axios.post(`${BACKEND_URL}/post`,
        payload,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }

        }
      )
      setSuccess("Post created successfully!");
      setDescription("");
      setAttachments([]);

      if (onPostCreated) onPostCreated();

    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create post. Try again."
      );
    }

    setLoading(false);
  };
   

  
    return (
      <form
      onSubmit={submitPost}
      className="p-4 border rounded-md bg-white shadow-sm max-w-lg"
    >
      <h2 className="text-xl font-semibold mb-4">Create New Post</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <div className="mb-3">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full border px-3 py-2 rounded"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-medium">Attachments (optional)</label>
        <input
          type="file"
          multiple
          onChange={handleAttachment}
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  )
}
