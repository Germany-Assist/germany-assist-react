import React from 'react'
import { useAlert } from '../alerts/useAlert'
import { AlertNotify } from '../alerts/AlertNotify'
import DashboardHeader from './DashboardHeader'

export const HeaderWithAlert = ({ children }) => {
  const { alert, clearAlert } = useAlert();

  return (
    <>
      <DashboardHeader />
      {alert && (
        <div className="w-full">
          <AlertNotify
            message={alert.message}
            type={alert.type}
            onClose={clearAlert}
          />
        </div>
      )}
      {children}
    </>
  );
};
