import React , {useState} from 'react';
import axios from "axios";
function CreatePost(){
    const [description,setDescription] = useState("");
    const [currentFile, setCurrentFile] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id;
    const handleDescriptionChange = (event) => {
        event.preventDefault();
        const newDescription= event.target.value;
        setDescription(newDescription);
    }
    const handleFileChange = (event) => {
        setCurrentFile(event.target.files[0]);
    }
    const submitFunction = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('picture',currentFile);
        formData.append('description',description);
        formData.append('userId',userId);
        formData.append('picturePath',currentFile.name);
        try{
            await axios.post( `http://localhost:3001/posts/`,formData, {
                        headers: {
                            'Authorization' : "Bearer " + localStorage.getItem('token').slice(1,-1),
                            'Content-Type' : 'multi/form-data',
                        },
                    });
            alert("post created successfully");
            setDescription("");
        } catch(error){
            console.log(error);
        }


    }
    const Wrapper = ({children}) => {
        return (
           <div style = {{border:'1px solid #B6BBC4',borderRadius:'8px',width:'18vw',padding:'1vw',marginLeft:'1vw'}}>
             {children}
           </div>
        );
     };
    return (
        <form action="" onSubmit={submitFunction}>
            <Wrapper>
                <div>
              <h1>Create Post</h1>
               </div>
            <div >
                    <label htmlFor='fname'></label>
                    <input 
                    className='input'
                    value = {description}
                    type = "text"
                    placeholder = "write the description"
                    onChange = {handleDescriptionChange}
                    required/>

                </div>
                <div>
                    <input 
                    type="file" 
                    onChange={handleFileChange}
                    required />
                </div>
                <div>
                <button
                 className='button2'
                 onClick={submitFunction}>post</button>
                 </div>

           </Wrapper>
        </form>
    )

}
export default CreatePost;