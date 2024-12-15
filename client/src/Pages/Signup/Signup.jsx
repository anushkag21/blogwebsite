import React , {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from "axios";
import "./Signup.css"
import image from "./image.jpg";
function Signup(){
    const navigate = useNavigate();

    const [firstName,setFirstName] = useState("");
    const [email,setEmail] = useState("");
    const [lastName,setLastName] = useState("");
    const [password,setPassword] = useState("");
    const [location,setLocation] = useState("");
    const [occupation,setOccupation] = useState("");
    

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
    /*---------------function to handle firstName----------------*/
    const handleFirstNameChange = (event) => {
        event.preventDefault();
        const newFirstName = event.target.value;
        setFirstName(newFirstName);
    }

    /*---------------function to handle firstName----------------*/
    const handleLastNameChange = (event) => {
        event.preventDefault();
        const newLastName = event.target.value;
        setLastName(newLastName);
    }
    /*---------------function to handle location----------------*/
    const handleLocationChange = (event) => {
        event.preventDefault();
        const newLocation = event.target.value;
        setLocation(newLocation);
    }
    /*---------------function to handle occupation----------------*/
    const handleOccupationChange = (event) => {
        event.preventDefault();
        const newOccupation = event.target.value;
        setOccupation(newOccupation);
    }

    /*--------------function to handle filechange------------------*/
    const [currentFile, setCurrentFile] = useState(null);
    const handleFileChange = (event) => {
        setCurrentFile(event.target.files[0]);
    }

    /*-----------function to handle Submit--------------*/
    const submitFunction = async (event) => {
        
        
        event.preventDefault();
        const friends = [];
        const formData = new FormData();
        formData.append('picture',currentFile);
        formData.append('firstName',firstName);
        formData.append('lastName',lastName);
        formData.append('password',password);
        formData.append('email',email);
        formData.append('friends',friends);
        formData.append('location',location);
        formData.append('occupation',occupation);
        formData.append('picturePath',currentFile.name);
        
        try{
          const response = await axios.post("http://localhost:3001/auth/register",formData,{
            headers : {
                'Content-Type': 'multi/form-data',
            },
          });

        //   console.log(response);

        //   console.log(res);
          alert("Signed Up successfully");
          navigate('/login');


          // Making things empty
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
          setOccupation("");
          setLocation("");
          
        }
        catch(err){
            if(err.response && err.response.status === 400 ){
                alert("Username already exist!!!");
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
        <form action="" onSubmit={submitFunction}>
           <div className='outerBox' style={backgroundImageStyle}>
            <div className="outerDiv" >
               <div className='innerDiv'>
                <div className='input-box'>
               <h1>SignUp</h1>
               <div className='name-container'>
                <div className='box firstName name'>
                    <label htmlFor='fname'></label>
                    <input 
                    className='input'
                    value = {firstName}
                    type = "text"
                    placeholder = "firstname"
                    onChange = {handleFirstNameChange}
                    required/>

                </div>

                <div className='box lastname name' >
                    <label htmlFor='lname'></label>
                    <input 
                    className='input'
                    value = {lastName}
                    type = "text"
                    placeholder = "lastName"
                    onChange = {handleLastNameChange}
                    required/>

                </div>
               </div>
                <div className='box email long'>
                    <label htmlFor='email'></label>
                    <input 
                    className='input'
                    value = {email}
                    type = "text"
                    placeholder = "email"
                    onChange = {handleEmailChange}
                    required/>

                </div>
                <div className='box password long'>
                    <label htmlFor='fname'></label>
                    <input 
                    className='input'
                    value = {password}
                    type = "text"
                    placeholder = "password"
                    onChange = {handlePasswordChange}
                    required/>

                </div>
                <div className=' box occupation long'>
                    <label htmlFor='occupation'></label>
                    <input 
                    className='input'
                    value = {occupation}
                    type = "text"
                    placeholder = "occupation"
                    onChange = {handleOccupationChange}
                    required/>

                </div>
                <div className='box location long'>
                    <label htmlFor='location'></label>
                    <input 
                    className='input'
                    value = {location}
                    type = "text"
                    placeholder = "location"
                    onChange = {handleLocationChange}
                    required/>

                </div>

                <div className='box location long'>
                    <input type="file" onChange={handleFileChange} />
                </div>

                <button
                 className='buttonm'
                 onClick={submitFunction}
                >SignUp</button>
                <div>Already signed up? <Link to = "/login">Login</Link></div>                
               </div>
               <div className='text-on-right '>Blogopedia</div>
              </div>
            </div>
            </div>
        </form>
    )




}
export default Signup;