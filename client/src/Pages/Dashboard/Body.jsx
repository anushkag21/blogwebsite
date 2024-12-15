import React,{useState, useEffect} from "react";
import axios from 'axios';
import './Dashboard.css';
import UserWidget from "../widgets/Userwidget";
import Header from "./Header";
import LikedButton from '@mui/icons-material/Favorite';
import LikeButton from '@mui/icons-material/FavoriteBorder'
import CommentButton from '@mui/icons-material/Comment';
import AddButton from '@mui/icons-material/Add';
import ReportIcon from '@mui/icons-material/Report';
import CreatePost from "../CreatePost/CreatePost";
import FriendList from "../../Components/FriendList";
import Popup from "./Popup";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'

// import Userwidget from 

function Feed(){
    let [posts, setPosts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    useEffect( () => {
        async function fetchPost(){
            try{
                let postsObj = await axios.get('http://localhost:3001/posts', {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
                    },
                });

                setPosts(postsObj.data);
            } catch(error){
                console.log(error);
            }

        }

        fetchPost();
    }, []);

    const userId = JSON.parse(localStorage.getItem('user'))._id;

    const postsArray = posts.map((post) => {
        let likes = 0;
        let is_liked = false;

        Object.entries(post.likes).map( ([key, values]) => {
            if(key === userId && values === true){
                is_liked = true;
            }

            if(values === true){
                likes++;
            }
        });


        return <Post key = {post._id} userId = {post.userId} id = {post._id} userName = {post.firstName + ' ' + post.lastName}  description = {post.description} likes={likes} is_liked={is_liked} image ={post.picturePath} profile = {post.userId.profile} />
    });


    function togglePopup(){
        setShowPopup(!showPopup);
    }
    return(
        <div style={{margin:'0',padding:'0'}}>
            <div onClick={togglePopup}>
            <AddButton color="primary" />
            </div>
            {showPopup ?<Popup className ="popup" show={showPopup} setShow={setShowPopup}/> : null}
            {postsArray}
        </div>
    )
}

function Post(props){

    const userName = props.userName;
    const description = props.description;
    
    const [isLiked , setIsLiked] = useState(props.is_liked);
    const [likes, setLikes] = useState(props.likes);
    async function handleLike (){
        if(isLiked){
            setIsLiked(false);
            setLikes(likes-1);
        }

        else{
            setIsLiked(true);
            setLikes(likes+1);
        }
        
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        try{
            await axios.patch( `http://localhost:3001/posts/${props.id}/like`,{ userId : userId}, {
                        headers: {
                            'Authorization' : "Bearer " + localStorage.getItem('token').slice(1,-1),
                            'Content-Type' : 'application/json',
                        },
                    });
        } catch(error){
            console.log(error);
        }
    }

    async function handleComment(){
        //comments here
    }
    async function handleContent(){

    }
    const Wrapper = ({children}) => {
       return (
          <div style = {{border:'1px solid #B6BBC4',borderRadius:'8px', width:'83%',padding:'5vw'}}>
            {children}
          </div>
       );
    };
    const LikeDiv = ({isLiked}) => {
      return(
        <div>
          {isLiked ? (
            <div>
                <LikedButton onClick={handleLike} sx={{ color: "red" }} />
            </div>
          ): (
            <div>
                <LikeButton onClick={handleLike} sx={{ color: "red" }} />
            </div>
          )}
        </div>
      );
    };
    const CommentDiv = ({}) => {
        return (
            <CommentButton sx={{
                color: "grey",
                '&:hover': {
                  cursor: "pointer",
                },
              }} onClick={handleComment} />
        );
    };
    const Report = ({}) => {
       return (
        <ReportIcon sx={{
            color: "black",
            '&:hover': {
              cursor: "pointer",
            },
          }} onClick={handleContent}/>
       )
    };
    const parentContainerStyle = {
        display: 'flex',
        alignItems: 'left',
        gap:'2vw'
      };
    const navigate = useNavigate();
    function HandleName(){
        navigate(`/profile/${props.userId}`);
    }
    return (
        <Wrapper>
          <h5 onClick={HandleName}>{userName}</h5>
          <div>{description}</div>
          <img
            style={{ objectFit: "cover", borderRadius: "2px", width: "100%", height: "20vw" }}
            alt="user"
            src={`http://localhost:3001/assets/${props.image}`}
          />
          <div style={parentContainerStyle}>
         <LikeDiv isLiked = {isLiked} />
         <CommentDiv/>
         <Report/>
         </div>
        </Wrapper>
      );
      
      
}

function Body() {
    const userId = JSON.parse(localStorage.getItem('user'));
    return (
        
        <div className="body">
        <Header userId={userId._id} picturePath={userId.picturePath}/>
        <div className="top" style = {{display: 'flex', margin: '0', gap: '1px',paddingTop:'60px'}}>
        <div className="widget">
            <UserWidget userId={userId._id} picturePath={userId.picturePath} />
        </div>
        <Feed />
        <div className="createPost">
            <FriendList/>
        </div>
        </div>
    </div>
    
    );
  }
export default Body;