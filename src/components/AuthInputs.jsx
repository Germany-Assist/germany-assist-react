import React from 'react'

const AuthInputs = ({label,onClick}) => {
  return (
    <div>
      <button
      onClick={onClick}
      className='w-full bg-blue-700 text-white py-2 rounded-md hover"bg-blue-700 transition'
      >{label}</button>
    </div>
  )
}

export default AuthInputs