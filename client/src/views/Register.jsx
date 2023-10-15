import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { AuthContext } from "../context/AuthContext";


const Register = () => {
  const [errors, setErrors] = useState({firstName: "", lastName: "", email: "", username: "", password: "", confirmPassword: ""});
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = (user) => {
    axios.post("http://localhost:8000/api/register", user, {withCredentials: true})
      .then((userData) => {
        console.log(userData);
        dispatch({type: "LOGIN", payload: true});
        navigate("/home");
      })
      .catch((err) => {
        const errorResponse = err.response.data.errors;
        setErrors({
          firstName: errorResponse.firstName? errorResponse.firstName.message : "",
          lastName: errorResponse.lastName? errorResponse.lastName.message : "",
          email: errorResponse.email? errorResponse.email.message : "",
          username: errorResponse.username? errorResponse.username.message : "",
          password: errorResponse.password? errorResponse.password.message : "",
          confirmPassword: errorResponse.confirmPassword? errorResponse.confirmPassword.message : "",
        })
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <UserForm initialForm={initialForm} isRegistering={true} submitHandler={handleSubmit} errors={errors}/>
    </div>
  );
};

export default Register;
