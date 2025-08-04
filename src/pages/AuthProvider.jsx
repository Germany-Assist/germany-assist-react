import React, { createContext, useState} from 'react'

export const AuthContext =createContext();
export const AuthProvider = ({children}) => {
  const[accessToken,setAccessToken]= useState(null);
  const[user,setUser]=useState(null);
  
  const login=(token,userData)=>{
      setAccessToken(token);
      setUser(userData);
  }
  const logOut=()=>{
    setAccessToken(null);
    setUser(null);
  }
    return (
    <AuthContext.Provider value={{accessToken,user,login,logOut}}>
      {children}
    </AuthContext.Provider>
  )
}
