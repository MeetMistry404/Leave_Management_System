import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../UI/Pages/Home/Home";
import Login from "../UI/Pages/Login/Login";
import Profile from "../UI/Pages/Profile/Profile";
import HeaderCom from "../UI/Components/HeaderCom/HeaderCom";
import { Provider } from "react-redux";
import { store } from "../../Redux/App/Store";
import SignUp from "../UI/Pages/SingUp/SignUp";
import Admin from "../UI/Pages/Admin/Admin";
import Apply from "../UI/Pages/Apply/Apply";
import ShowAll from "../UI/Pages/ShowAll/ShowAll";

function Routing() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <HeaderCom />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/showall" element={<ShowAll />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/apply" element={<Apply />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default Routing;
