import React from 'react';
import axios from 'axios';
import logo from '../../Components/logo.png';
import "./header.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Search,
  Message,
  Notifications,
  Help,
  Menu,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";

function ClearLocal() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <MenuItem>
      <button onClick={handleLogout}>Log Out</button>
    </MenuItem>
  );
}
function Profile() {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <MenuItem>
    <button onClick={handleProfile}>Profile</button></MenuItem>
  )
}
function Header({ userId, picturePath }) {
  const [user,setUser] = useState(null);
  const navigate = useNavigate();
  const getUser = async () => {
      const response = await axios.get(`http://localhost:3001/users/${userId}`,{
          headers : {
              'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
          }
      })
      setUser(response.data);
  };
  useEffect(()=>{
      getUser();
  },[]);
  if(!user){
      return null;
  }
  const {
      firstName,
      lastName,
      // location,
      // occupation,
      // viewedProfile,
      // impressions,
      // friend,
  }= user;
  return (
    <div className='header' style={{ backgroundColor: '#00ADB5', position: 'fixed' }}>
       <Icon />
      <div className='title3'>
       <b>Blogopedia</b>
      </div>
      <div>
        <InputBase placeholder="Search..." />
        <IconButton>
          <Search />
        </IconButton>
      </div>
      <Message sx={{ fontSize: "25px" }} />
      <Notifications sx={{ fontSize: "25px" }} />
      <img
        style={{ borderRadius: "50%",display:'inline-flex'}}
        width={60}
        height={60}
        alt="user"
        className='icon'
        src={`http://localhost:3001/assets/${picturePath}`}
      />
      <div className='name'><h5>{firstName} {lastName}</h5></div>
      <FormControl variant="standard" value="aayush">
        <Select
          value="aaus"
          // sx={{
          //   backgroundColor: '#fffde7',
          //   width: "1",
          //   borderRadius: "0.25rem",
          //   p: "0.25rem 1rem",
          //   "& .MuiSvgIcon-root": {
          //     pr: "0.25rem",
          //     width: "3rem",
          //   },
          //   "& .MuiSelect-select:focus": {
          //     backgroundColor: '#fffde7',
          //   },
          // }}
          input={<InputBase />}
        >
          
          <Profile/>
          <ClearLocal />
        </Select>
      </FormControl>
    </div>
  );
}

function Icon() {
  return (<img className="logo" src={logo} alt="logo" />);
}

export default Header;
