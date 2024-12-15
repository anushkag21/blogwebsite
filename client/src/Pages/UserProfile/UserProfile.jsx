import Header from "../Dashboard/Header";
import UserWidget from "../widgets/Userwidget";
import UserPosts from "../../Components/UserPosts";
import FriendList from "../../Components/FriendList";
function UserProfile(){
    const xyz = JSON.parse(localStorage.getItem('user'));
    return (
        <div className="body" >
       <div>
           <Header userId={xyz._id} picturePath={xyz.picturePath}></Header>
       </div>
       <div className="widget" style={{marginTop:'60px'}}>
           <UserWidget userId={xyz._id} />
       </div>
       <div className="posts" style={{marginTop:'45px'}}>
           <UserPosts userId={xyz._id}/>
       </div>
       <div>
           <FriendList />
       </div>
            
       </div>
    )
}
export default UserProfile;