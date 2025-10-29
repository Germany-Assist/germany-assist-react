import React from 'react'

export const ConfirmationPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-blue-50 '>
        <div className='bg-white p-8 rounded-2xl shadow-lg text-center '>
            <div className='text-6xl text-blue-500 mb-4'>✔️</div>
            <h2 className='text-xl font-bold mb-2'>Order Confirmed</h2>
            <p className='text-gray-600  mb-4'>
                 Thank you for your order. A confirmation email has been sent.
            </p>
            <div className='flex gap-3'>
                <button className='bg-blue-600 text-white px-4 py-4 rounded-lg '>Continue Shopping</button>
                <button className='border border-blue-600 text0blue-600  text-white px-4 py-4 rounded-lg '>
                    share
                </button>
            </div>
        </div>
    </div>
  )
}
