import UserWidget from "../widgets/Userwidget";
import UserPosts from "../../Components/UserPosts";
import Header from "../Dashboard/Header";
import FriendList from "../../Components/FriendList";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
function ProfilePage(){
    const {userId} = useParams();
    const [user,setUser] = useState(null);
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
    const xyz = JSON.parse(localStorage.getItem('user'));
    // const userId = JSON.parse(localStorage.getItem('user'));
return (
    <div className="body" >
   <div>
       <Header userId={xyz._id} picturePath={xyz.picturePath}></Header>
   </div>
   <div className="widget" style={{marginTop:'60px'}}>
       <UserWidget userId={userId} />
   </div>
   <div className="posts" style={{marginTop:'45px'}}>
       <UserPosts userId={userId}/>
   </div>
   {/* <div>
       <FriendList />
   </div> */}
        
   </div>
)
}
export default ProfilePage;
