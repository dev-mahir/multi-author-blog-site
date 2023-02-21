import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import AdminLogIn from "./components/Auth/Admin/AdminLogin";
import Register from "./components/Auth/Register/Register";

import HomePage from "./pages/HomePage";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";
import AllCategory from "./components/Dashboard/Category/AllCategory";
import DashComments from "./components/Dashboard/Comments/DashComments";
import AllUser from "./components/Dashboard/Users/AllUser";
import ArticleAdd from "./components/Dashboard/Article/ArticleAdd";
import AllSubAdmin from "./components/Dashboard/Admin/AllSubAdmin";
import UserDetails from "./components/User/UserDetails";
import DashboardContent from "./components/Dashboard/Dashboard/DashboardContent";
import DashboardArticle from "./components/Dashboard/Article/DashboardArticle";
import AddCategory from "./components/Dashboard/Category/AddCategory";
import ProtectRoute from "./components/Auth/ProtectRoute/ProtectRoute";

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
        <Route path="/user/:username" element={<UserDetails />}></Route>


        {/* <Route element={<ProtectRoute />}> */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard" element={<DashboardContent />}></Route>
            <Route path="/dashboard/all-article" element={<DashboardArticle />}></Route>
            <Route path="/dashboard/article-add" element={<ArticleAdd />}></Route>
            <Route path="/dashboard/all-category" element={<AllCategory />}></Route>
            <Route path="/dashboard/add-category" element={<AddCategory />}></Route>
            <Route path="/dashboard/comments" element={<DashComments />}></Route>
            <Route path="/dashboard/users" element={<AllUser />}></Route>
            <Route path="/dashboard/all-sub-admin" element={<AllSubAdmin />}></Route>
          </Route>
        {/* </Route> */}



      </Routes>
    </>
  );
}

export default App;
