import React, { useState } from "react";
import "./login.css";
import { assets } from "../../assets/frontend_assets/assets";
import axios from 'axios'
import { useDispatch} from "react-redux";
import { setToken } from "../../store/slices/cartSlice.js";
import { BASE_URL } from "../../config/api.js";

const Login = ({ setLoginState }) => {
  const dispatch = useDispatch()
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData]= useState({
    name:"",
    email:"",
    password:""
  })
  let url =""

  const onChangeHandler = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setData(date=>({...data, [name]:value}))
  }

  const onLogin = async (e)=>{
    e.preventDefault();
    if (currentState === "Login") {
      url = `${BASE_URL}/api/user/login`
    }else{
      url = `${BASE_URL}/api/user/register`
    }
    const response = await axios.post(url,data)
    if (response.data.success) {
     dispatch(setToken(response.data.token))
     localStorage.setItem("token",response.data.token)
     setLoginState(false)
    }else{
      alert(response.data.message)
    }
  }


  return (
    <div className="login-page">
      <div className="login-popup">
        <form onSubmit={onLogin} className="login-form">
          <div className="form-headings">
            <h3>{currentState}</h3>
            <img
              src={assets.cross_icon}
              alt="Crose-Icon"
              onClick={() => setLoginState(false)}
            />
          </div>
          <div className="login-inputs">
            {currentState === "Login" ? (
              <></>
            ) : (
              <input onChange={onChangeHandler} name="name" value={data.name} type="text" placeholder="Enter Your Name" required />
            )}

            <input onChange={onChangeHandler} type="email" name="email" value={data.email} placeholder="Enter Your e-mail" required />
            <input onChange={onChangeHandler} type="pasword" name="password" value={data.password} placeholder="Enter Your Pasword" required />
          </div>
          <div className="Login-btn">
            <button type="submit">{currentState}</button>
          </div>
          <div className="change-login-status">
            {currentState === "Login" ? (
              <p>
                Don't have an account
                <span onClick={() => setCurrentState("Sign Up")}>
                  click here to Sign-Up
                </span>
              </p>
            ) : (
              <p>
                Alrady have an account
                <span onClick={() => setCurrentState("Login")}>
                  click here to Login
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
