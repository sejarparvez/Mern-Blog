import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import EditPost from "./Components/Pages/EditPost/EditPost";
import HomePage from "./Components/Pages/HomePage/HomePage";
import Login from "./Components/Pages/LoginPage/Login";
import NewPost from "./Components/Pages/NewPost/NewPost";
import NotFound from "./Components/Pages/NotFound/NotFound";
import PostPage from "./Components/Pages/PostPage/PostPageModel";
import MyProfile from "./Components/Pages/Profile/MyProfile";
import Registration from "./Components/Pages/RegistrationPage/Registration";
import { UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <div className=" mt-20">
        <Navbar />
      </div>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/registration"} element={<Registration />} />
        <Route path={"/users/:id"} element={<MyProfile />} />
        <Route path={"/newpost"} element={<NewPost />} />
        <Route path={"/post/:id"} element={<PostPage />} />
        <Route path={"/edit/:id"} element={<EditPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div className="mt-20">
        <Footer />
      </div>
    </UserContextProvider>
  );
}

export default App;
