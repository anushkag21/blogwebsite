import { useState,useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
function Friends({userId}){
    
    const [friends, setFriends] = useState([]);
    useEffect( () => {
        async function fetchFriends(){
            try{
                let friendsobj = await axios.get(`http://localhost:3001/users/${userId
            }/friends`, {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
                    },
                });

                setFriends(friendsobj.data);
            } catch(error){
                console.log(error);
            }

        }

        fetchFriends();
    }, []);
    const friendsarray = friends.map((friend)=>{
        return <Friend key ={friend._id} id = {friend._id} userName = {friend.firstName + ' ' + friend.lastName} location = {friend.location} occupation ={friend.occupation} picturePath = {friend.picturePath}/>
    })

    console.log(friendsarray);
    return(
        <ul>
            {friendsarray}
        </ul>
    )
    function Friend(props){
        const navigate = useNavigate();
        function handleprofile(){
            navigate(`/profile/${props.id}`);
        }
    return (
        <div>
            <ul>
                <button onClick ={handleprofile}>{props.userName}</button>
                <li>{props.location}</li>
                <img
            style={{ objectFit: "cover", borderRadius: "50%", width: "100%", height: "20vw" }}
            alt="user"
            src={`http://localhost:3001/assets/${props.picturePath}`}
          />
            </ul>
        </div>);
    }
}
function FriendList(){
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    return(
        <div className="body">
            <Friends userId ={userId}/>
        </div>
    );

}
export default FriendList;