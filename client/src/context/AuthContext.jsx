import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

export const AuthContext = createContext({
  state: null,
  dispatch: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: action.payload };
    case "LOGOUT":
      return { ...state, isLoggedIn: false };
    case "SET_LOADING":
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { isLoggedIn: false, isLoading: true });
  useEffect(() => {
    // check in the cookie named usertoken for the user id
    // if there is a user id, dispatch the login action
    axios.get("http://localhost:8000/api/loginState", {withCredentials: true})
      .then((res) => {
        console.log(res.data);
        dispatch({type: "LOGIN", payload: res.data.verified});
        dispatch({type: "SET_LOADING", payload: false});
      })
      .catch((err) => {
        console.log(err);
        dispatch({type: "SET_LOADING", payload: false});
      });
  }, []);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}