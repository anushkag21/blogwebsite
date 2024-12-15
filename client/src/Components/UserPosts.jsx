import React,{useState, useEffect} from "react";
import axios from 'axios';
import LikedButton from '@mui/icons-material/Favorite';
import LikeButton from '@mui/icons-material/FavoriteBorder'
import CommentButton from '@mui/icons-material/Comment';
import ReportIcon from '@mui/icons-material/Report';
function Feed({userId}){
    let [posts, setPosts] = useState([]);

    useEffect( () => {
        async function fetchPost(){
            try{
                let postsObj = await axios.get(`http://localhost:3001/posts/${userId
            }/posts`, {
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
        return <Post key = {post._id} id = {post._id} userId = {userId} userName = {post.firstName + ' ' + post.lastName}  description = {post.description} likes={likes} is_liked={is_liked} image ={post.picturePath} />
    });
    return(
        <ul>
            {postsArray}
        </ul>
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
           <div style = {{border:'1px solid #B6BBC4',borderRadius:'8px', padding:'3vw'}}>
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
    const postid = props.id;
    function handledelete(){
            async function deletePost(){
                try{
                    let result= await axios.delete(`http://localhost:3001/posts/delete/${postid}
                `, {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
                        },
                    });
                    
                alert('post deleted successfully');
                } catch(error){
                    console.log(error);
                }
    
            }
    
            deletePost();
    }
    function checking(id1,id2){
        if(id1 === id2){
            return true;
        }
        else{
            return false;
        }
    }
    const Deletebutton = ({check})=>{
        return (
            <div>
        {check ? (
            <button onClick={handledelete}>delete the post </button>
        ):
        (
            <div></div>
        )

        }
        </div>)
    }
    const id1 = JSON.parse(localStorage.getItem('user'))._id;
    const id2 = props.userId;
    let check = checking(id1,id2);
    return (
        <Wrapper>
          <Deletebutton check ={check}/>
          <h5>{userName}</h5>
          <p>{description}</p>
          <img
            style={{ objectFit: "contain", borderRadius: "0.5vw", height: "80%" }}
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

function UserPosts({userId}){
    // const userId = JSON.parse(localStorage.getItem('user'))._id;
    
    return(
        <div className="feed">
            <Feed userId ={userId}/>
        </div>
    );
}
export default UserPosts;
