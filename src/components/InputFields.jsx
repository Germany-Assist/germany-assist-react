import React from 'react'

const InputFields = ({label, type, value,onChange,placeholder}) => {
  return (
    <>
        <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>{label} </label>
            <input
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
               className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
                
            </input>
        </div>
    </>
  )
}

export default InputFields