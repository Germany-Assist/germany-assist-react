import React from 'react'


const alertType= {
    success:"bg-green-100 border-green-500 text-green-700",
    error:"bg-red-100 border-red-500 text-red-700",
    warning:"bg-yellow-100 border-yellow-500 text-yellow-700",
    inf0:"bg-blue-100 border-blue-500 text-blue-700"
}
export const AlertNotify = ({message,type="info"}) => {
  return (
    <div className={`border-1-4 p-4 shadow-md shadow-sm mb-4 ${alertType[type] || alertType.info }`}>
        <p className='font-medium'> {message}</p>
    </div>
  )
}
