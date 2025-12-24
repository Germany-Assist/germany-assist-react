import React, { useState } from "react";
import { BACKEND_URL } from "../../config/api";
import { useAuth } from "../../pages/AuthProvider";
import axios from "axios";
import { useParams } from "react-router-dom";


export const CreatePostForm = ({ onPostCreated }) => {
  const { serviceId } = useParams();
  const [description, setDescription] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  
  const [attachments, setAttachments] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { accessToken } = useAuth();

  //  Handle adding attachment URL
  const handleAddAttachment = () => {
   
    if (attachmentUrl.trim() !== "" && !attachments.find(a => a.url === attachmentUrl.trim())) {
      setAttachments((prevAttachments) => [
        ...prevAttachments,
        { url: attachmentUrl.trim() },
      ]);
      setAttachmentUrl(""); 
    }
  };


  const handleRemoveAttachment = (urlToRemove) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((attachment) => attachment.url !== urlToRemove)
    );
  };

  const submitPost = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    setLoading(true); 

    try {
      
      const payload = {
        serviceId,
        description,
        attachments: attachments, 
      };

      
      await axios.post(`${BACKEND_URL}/api/post`, payload, { 
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
      });

      setSuccess("Post created successfully!");
      setDescription("");
      setAttachments([]);

      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error("Post creation error:", err);
      setError(
        err.response?.data?.message || "Failed to create post. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <form
        onSubmit={submitPost}
        className="p-6 border rounded-xl bg-white shadow-xl max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Create New Post
        </h2>

        {error && (
          <p className="p-2 mb-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </p>
        )}
        {success && (
          <p className="p-2 mb-3 bg-green-100 text-green-700 rounded-md text-sm">
             {success}
          </p>
        )}

      
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">
            Description
          </label>
          <textarea
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="What is your post about?"
          ></textarea>
        </div>

      
        <label className="block font-semibold text-gray-700 mb-2">
          Add Attachment URL
        </label>
        <div className="flex gap-2 mb-4">
          <input
            type="url"
            placeholder="https://example.com/file.pdf"
            value={attachmentUrl}
            onChange={(e) => setAttachmentUrl(e.target.value)}
            className="border border-gray-300 w-full px-3 py-2 rounded-lg"
          />
          <button
            type="button"
            onClick={handleAddAttachment}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition duration-150 flex-shrink-0"
            disabled={attachmentUrl.trim() === ""}
          >
            Add
          </button>
        </div>

        {/*  Handling attachment Urls */}
        {attachments.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="font-medium text-gray-700 mb-2">Attached Files:</p>
            <ul className="space-y-1">
              {attachments.map((attachment, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-sm text-gray-600 bg-white p-2 rounded border border-gray-100"
                >
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate hover:underline text-blue-600 max-w-[80%]"
                    title={attachment.url}
                  >
                    {attachment.url}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(attachment.url)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    title="Remove attachment"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

    {/* Create Post */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition duration-200 disabled:opacity-50"
          disabled={loading || description.trim() === ""}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};