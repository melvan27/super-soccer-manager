import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { AuthContext } from "../context/AuthContext";


const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [errors, setErrors] = useState({email: "", password: ""});
  const navigate = useNavigate();
  const initialForm = {
    email: "",
    password: "",
  };
  const handleSubmit = async (user) => {
    try {
      const userData = await axios.post("http://localhost:8000/api/login", user, {withCredentials: true});
      dispatch({type: "LOGIN", payload: true});
      console.log(userData);
      navigate("/home");
    } catch (err) {
      const errorResponse = err.response.data.errors;
      setErrors({
        email: errorResponse.email? errorResponse.email.message : "",
        password: errorResponse.password? errorResponse.password.message : "",
      })
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <UserForm initialForm={initialForm} errors={errors} isRegistering={false} submitHandler={handleSubmit}/>
    </div>
  );
}

export default Login;
