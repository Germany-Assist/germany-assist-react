import React, { useState, useEffect } from 'react';
import axios from "axios";
import AuthInputs from '../AuthInputs';
import CommentItem from './CommentItem';

const  CommentSection=({serviceId})=> {
    const [comments,setComments]=useState([]);
    const [newComment,setNewComment]=useState('');
    const[loading]=useState(true);
    const[error,setError]=useState('');

    useEffect(()=>{
fetchComment();
    },[serviceId]);
    const fetchComment=async()=>{
        try {
            const response= await axios.post(`api/services/${serviceId}/comments`);
            setComments(response.data);
        } catch (error) {
            setError(error.message);
        }
    }
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!newComment.trim()) return;  // Fixed variable name from newComments to newComment

  try {
    const response = await axios.post(
      `/api/services/${serviceId}/comments`,
      { 
        text: newComment,
        author: 'currentUser',
        date: new Date().toISOString(),  
        rating: 5,
      },
      { 
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    setComments([...comments, response.data]);
    setNewComment('');
  } catch (error) {
    setError(error.response?.data?.message || error.message || 'Failed to post comment');
  }
};

    if(loading) return <div className='text-center py-4'>Loading....</div>
    if(error) return <div className='text-red-500'>Error Loading Comments ${error}</div>
  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Customer Reviews</h2>
          <form onSubmit={handleSubmit} className='mb-8'>
            <textarea
             value={newComment}
             onChange={(e)=>setComments(e.value.target)}
             rows="4"
             className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'

            />
               <AuthInputs
          label="submit"
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Post Review
        </AuthInputs>
          </form>
          <div className='space-y-4 '>
            {comments.length===0?(  <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to review!</p>):
            comments.map((comment)=><CommentItem key={comment.id} comment={comment}/>)
            }
          </div>
    </div>
  )
}

export default CommentSection