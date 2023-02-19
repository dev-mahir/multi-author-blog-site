import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import AdminLogIn from "./components/Auth/Admin/AdminLogin";
import Register from "./components/Auth/Register/Register";

import HomePage from "./pages/HomePage";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";
import AllCategory from "./components/Dashboard/Category/AllCategory";
import DashComments from "./components/Dashboard/Comments/DashComments";
import AllUser from "./components/Dashboard/Users/AllUser";
import DashboradArticle from "./components/Dashboard/Article/DashboradArticle";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/admin/login" element={<AdminLogIn />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/article/:currentPage" element={<HomePage />}></Route>
        <Route path="/article/details/:slug" element={<HomePage />}></Route>
        <Route path="/article/category/:slug" element={<HomePage />}></Route>
        <Route path="/article/tag/:slug" element={<HomePage />}></Route>
        <Route path="/search/:searchValue" element={<HomePage />}></Route>

        <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/all-post" element={<Dashboard />}></Route>
            <Route path="/dashboard/all-category" element={<AllCategory />}></Route>
            <Route path="/dashboard/comments" element={<DashComments />}></Route>
            <Route path="/dashboard/users" element={<AllUser />}></Route>
          <Route path="/dashboard/all-article" element={<DashboradArticle />}></Route>
        </Route>
      

      </Routes>
    </>
  );
}

export default App;
