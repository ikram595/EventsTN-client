import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  //initial state
  isAuthenticated: false,
};

const AuthActionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

// Define your reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, isAuthenticated: true };
    case AuthActionTypes.LOGOUT:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

// Create the context
const AuthContext = createContext();

// Create the AuthProvider component
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = () => dispatch({ type: AuthActionTypes.LOGIN });
  const logout = () => dispatch({ type: AuthActionTypes.LOGOUT });

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
