import React from 'react'

export const Timeline = ({posts}) => {
  return (
    <div className='relative border-1   border-gray-300  pl-6 ml-4'>
    {posts.map((post,index)=>(
        <dev key={post.id} className="mb-10 relative">
            <div className='absolute left-3 top-1 w-6 h-6 rounded-full bg-blue-500'>
                <div className='bg-white p-4 rounded-lg shadow-sm border'>
                    <h3 className='text-lg font-semibold mb-2'>
                        Post #{index + 1}
                    </h3>
                    <p className='text-gray-700 mb-3 '>{post.description}</p>


                    {/* Attachment */}
                   {posts.attachments && post.attachments.length>0 &&(
                    <div className='mt-2 p-3 bg-gray-50 rounded '>
                        <p className='text-sm font-semibold'>Attachment: </p>
                         {post.attachments.map((file,i)=>(
                            <a key={i} href={file} className='text-blue-600 underline text-sm block'>{file}</a>
                         ))}

                         {/* Comments */}
                         {posts.comments.length > 0 && (
                            <div className="mt-4 ml-4 border-1 pl-4">
                                <p className='font-semibold mb-2 text-sm'>Comments: </p>
                                {post.comments.map((c)=>(
                                    <div key={c.id} className='mb-2 '>
                                        <p className='text-gray-600 text-sm'>{c.body}</p>
                                    </div>
                                ))}
                            </div>
                         )}
                    </div>
                   )}
                </div>
            </div>
        </dev>
    ))}
    </div>
  )
}
