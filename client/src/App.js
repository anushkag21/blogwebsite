import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Header from "./Pages/Dashboard/Header.jsx";
import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/Signup/Signup.jsx";
import ViewPost from "./Pages/Post/ViewPost.jsx";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToggleBtn from "./ToggleBtn.jsx";
import Landing from "./Pages/Landing/Landing.jsx";
import UserPosts from "./Components/UserPosts.jsx";
import ProfilePage from "./Pages/profilePage/ProfilePage.jsx";
import UserProfile from "./Pages/UserProfile/UserProfile.jsx";

function App() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const storedTheme = localStorage.getItem("theme");
  const [thememode, setThememode] = useState(storedTheme || "light");
  const toggle = () => {
    const newTheme = thememode === "light" ? "dark" : "light";
    setThememode(newTheme);
    console.log(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(thememode);
  }, [thememode]);
  // useEffect(() => {
  //   const check = async () => {
  //     try {
  //       const loggedInUser = localStorage.getItem("user");
  //       if (loggedInUser) {
  //         console.log(loggedInUser);
  //         const foundUser = JSON.parse(loggedInUser);
  //         console.log("found user", foundUser);
  //         await setUser(foundUser);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   check();
  // }, [user._id]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                user={user}
                setUser={setUser}
                thememode={thememode}
                toggle={toggle}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                user={user}
                setUser={setUser}
                thememode={thememode}
                toggle={toggle}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                user={user}
                setUser={setUser}
                thememode={thememode}
                toggle={toggle}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                user={user}
                setUser={setUser}
                thememode={thememode}
                toggle={toggle}
              />
            }
          />
          <Route
            path="/profile/:userId"
            element={
              // <UserPosts
              //   user={user}
              //   setUser={setUser}
              //   thememode={thememode}
              //   toggle={toggle}
              // />
              <ProfilePage user={user}
                 setUser={setUser}
                 thememode={thememode}
                 toggle={toggle} 
              />
            }
          />
          <Route
            path="/profile"
            element={
              // <UserPosts
              //   user={user}
              //   setUser={setUser}
              //   thememode={thememode}
              //   toggle={toggle}
              // />
              <UserProfile user={user}
                 setUser={setUser}
                 thememode={thememode}
                 toggle={toggle} 
              />
            }
          />
          <Route
            path="/btn"
            element={<ToggleBtn thememode={thememode} toggle={toggle} />}
          />
          <Route path="/viewpost/:postId" element={<ViewPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
