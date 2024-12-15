import React, { useState, useEffect } from "react";
import "./Landing.css";
import { Link } from 'react-router-dom';
const context = require.context('../images', false, /\.(png|jpg|jpeg)$/);
const images = context.keys().map(context);

function Landing() {
  
  const [backgroundImage, setBackgroundImage] = useState(0);
 

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
    }, 5000);

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, []);

  const backgroundImageStyle = {
    backgroundImage: `url(${images[backgroundImage]})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
    margin:"0px",
    padding:"0px" 
   };

  return (
    <>
      <div className="background-Image" style={backgroundImageStyle}>
        <div type="text" className="text1 title">
          Blogopedia
        </div>
        <br />
        <br />
        <div type="text" className="text1 text heading">Your one stop for <br/> Authentic News</div>
        <p className="text2 text para">
          Blogopedia is website which provides authentic news by constantly
          maintaining the source of each information and removing any unauthentic
          news
        </p>

        <br />
        <br />
        <br />
        <button className="button" ><Link to="/Signup" className="link">SIGN ME UP!</Link></button>
      </div>
    </>
  );
}

export default Landing;