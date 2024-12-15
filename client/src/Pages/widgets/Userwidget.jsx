import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Margin } from "@mui/icons-material";

const UserWidget = ({userId}) => {
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
        location,
        occupation,
        viewedProfile,
        impressions,
        picturePath,
        friend,
    }= user;
    const Wrapper = ({children}) => {
        return (
           <div style = {{border:'1px solid #B6BBC4',borderRadius:'8px',width:'18vw',padding:'1vw',marginLeft:'1vw'}}>
             {children}
           </div>
        );
     };
    return (
        <Wrapper >
            <div >
            <img
        style={{ borderRadius: "50%",display:'inline-flex'}}
        width={60}
        height={60}
        alt="user"
        src={`http://localhost:3001/assets/${picturePath}`}
      />
                <li>{firstName} {lastName}</li>
                <li>location : {location}</li>
                <li>occupation : {occupation}</li>
                <li>viewedProfile : {viewedProfile}</li>
                <li>impressions : {impressions}</li>

            </div>
        </Wrapper>
    )
}
export default UserWidget;