import React , {useState} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import "./Login.css"
import image from "./image.jpg";
import {useNavigate} from 'react-router-dom'

function Login({user,setUser,token,setToken}){
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    /*---------------function to handle password----------------*/
    const handlePasswordChange = (event) =>{
        event.preventDefault();
        const newPassword = event.target.value;
        setPassword(newPassword);
    }

    /*---------------function to handle email----------------*/
    const handleEmailChange = (event) => {
        event.preventDefault();
        const newEmail = event.target.value;
        setEmail(newEmail);
    }
    const submitFunction = async(event) => {
       event.preventDefault();
       try{
         const res = await axios.post("http://localhost:3001/auth/login",{
            email,
            password
        })
        console.log(res.data);
        setUser(res.data.requiredUser);
        // setToken(res.data.sessionToken);
        localStorage.clear();
        localStorage.setItem('user',JSON.stringify(res.data.requiredUser));
        localStorage.setItem('token',JSON.stringify(res.data.sessionToken));
        alert("Logged in successfully");
        navigate('/dashboard');
       }
       catch(err){
        if(err.response && err.response.status === 400 ){
            alert("Username doesn't exist!!!");
        }
        else{
            console.log(err);
        }
    }
    }
    const backgroundImageStyle = {
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        margin:"0px",
        padding:"0px" 
       };
    return (
        <>
        <form onSubmit={submitFunction}>
            <div className='bigger container'style={backgroundImageStyle}>
                <div className='input-box2 data'>
              <h1>Login</h1>
              <div className='content'>
                
              <div className='email box'>
                    <label htmlFor='email'></label>
                    <input 
                    className='input'
                    value = {email}
                    type = "email"
                    placeholder = "Enter your email"
                    onChange = {handleEmailChange}
                    required/>

                </div>
                <div className='password box'>
                    <label htmlFor='fname'></label>
                    <input 
                    className='input'
                    value = {password}
                    type = "text"
                    placeholder = "Enter your password"
                    onChange = {handlePasswordChange}
                    required/>

                </div>

                <button
                 className='buttonm'
                 onClick={submitFunction}
                ><Link to = "/dashboard" className="login-link">Login</Link> </button>
                <div>Don't have an account?<Link to="/Signup" className='signup-link'> SignUp</Link></div>
              </div>
             </div>
            </div>
        </form>
        
        
        
        
        </>
    )
}

export default Login;
