import React from 'react'

const ServiceInfo = ({service}) => {

  return (
    <div  className='bg-white rounded-lg shadow-md p-6 mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'> Service Name{service.name}</h1>
        <p className='text-gray-600 gap-6 mb-6' >{service.description}</p>
        
        <div className='flex items-center gap-6 mb-6'>
           <span className='text-2xl font-semibold text-blue-500'>{service.price}</span>
           <span className='flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full  text-sm font-medium'>
            ⭐ {service.rating}/5
           </span>
        </div>

        
    </div>
  )
}

export default ServiceInfo