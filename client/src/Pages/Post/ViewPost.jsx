import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewPost(){
    const {postId} = useParams();
    const [curPost, setCurPost] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let username;
    useEffect( () =>{

        async function getUser(){

            let post;
            let user;
            try{
                post = await axios.get(`http://localhost:3001/posts/${postId}`, {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
                    },
                });
                post = post.data;
                user = await axios.get(`http://localhost:3001/users/${post.userId}` , {
                    headers : {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token').slice(1,-1),
                    },
                })

                user = user.data;
            }catch(error){
                console.log(error);
            }finally{
                setIsLoaded(true);
            }

            setCurPost(post);
            setUser(user);
        }

        getUser();
    },[]);
    

    if(!isLoaded){
        return(<h1> Loading ... </h1>);
    }

    console.log(isLoaded);
    return(
        <div>
            <div>
                <img
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                        width={60}
                        height={60}
                        alt="user"
                        src={`http://localhost:3001/assets/${user.picturePath}`}
                />

                <h1>{user.firstName + ' ' + user.lastName}</h1> 
                <h2>{user.occupation}</h2>
            </div>

            <div>
                <h3>{curPost.description}</h3>
                <p>{curPost.about}</p>
            </div>
            </div>
        );

}

export default ViewPost;