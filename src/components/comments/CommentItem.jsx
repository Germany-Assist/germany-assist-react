import React from 'react'

const CommentItem=({comment})=> {
  return (
    <div className='border-b border-gray-300 pb-6 last:border-0 last:pb-0'>
        <div className='flex flex-wrap items-center justify-between gap-2 mb-3 '>
            <span className='font-semibold text-gray-800'>{comment.userId}</span>
            <div className='flex items-center gap-3'>
                <span className='text-sm text-gray-500'>
                    {new Date(comment.Date).toLocaleDateString('en-US',{
                        year:'numeric',
                        month:'long',
                        day:'numeric'
                    })}
                </span>

                {comment.rating &&(<span className='flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold'>
                    ⭐ {comment.rating}/5
                </span>)}
            </div>
        </div>
        <p className='text-gray-700 whitespace-pre-line'>{comment.text}</p>
    </div>
  )
}

export default CommentItem