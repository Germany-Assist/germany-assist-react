import React from 'react'
import { useAlert } from '../alerts/useAlert'
import DashboardHeader from './DashboardHeader';

export const HeaderWithAlert = ({children}) => {
    const {alert} =useAlert();

  return (
    <>
    <DashboardHeader/>
      {alert && (
        <div className="w-full flex justify-center mt-2">
          <div className="max-w-4xl w-full">
            <AlertNotify message={alert.message} type={alert.type} />
          </div>
        </div>
      )}
      {children}
    </>
  )
}
