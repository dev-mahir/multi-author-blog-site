import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";
import AllCategory from "./components/Dashboard/Category/AllCategory";
import DashComments from "./components/Dashboard/Comments/DashComments";
import AllUser from "./components/Dashboard/Users/AllUser";
import ArticleAdd from "./components/Dashboard/Article/ArticleAdd";
import UserDetails from "./components/User/UserDetails";
import DashboardContent from "./components/Dashboard/Dashboard/DashboardContent";
import DashboardArticle from "./components/Dashboard/Article/DashboardArticle";
import AddCategory from "./components/Dashboard/Category/AddCategory";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllTag from "./components/Dashboard/Tag/AllTag";
import { useDispatch, useSelector } from "react-redux";
import { get_cat } from "./redux/category/action";
import ArticleEdit from "./components/Dashboard/Article/ArticleEdit";
import SingleArticale from "./components/Article/SingleArticle/SingleArticale";
import SearchArticle from "./components/Article/SearchArticle/SearchArticle";
import EmailVerify from "./components/Auth/Register/EmailVerify";
import ProtectRoute from "./components/Auth/ProtectRoute/ProtectRoute";
import LoginPage from "./pages/Login/LoginPage";
import { check_token } from "./redux/auth/action";
import { getCookie } from "./utilis/cookies";
import ErrorPage from "./pages/Error/ErrorPage";
import HomePage from "./pages/Home/HomePage";
import Home from "./components/Home/HomepageContent/Home";
import { get_notification, visitors_count } from "./redux/dashboard/action";
import { get_popular_articles } from "./redux/article/action";
import PrivacyPolicy from "./pages/Privacy/Privacy";


export const authToken = getCookie("authToken");

function App() {
  const dispatch = useDispatch();
  const tokenDispatch = useDispatch();

  useEffect(() => {
    dispatch(visitors_count());
    dispatch(get_cat());
    dispatch(get_notification());
    dispatch(get_popular_articles());
    tokenDispatch(check_token(authToken));
  }, []);




  return (
    <>
      {/* {circle_loader && <CircleLoader />} */}
      <ToastContainer style={{ zIndex: 99999999999 }} />
      <Routes>
        <Route path="/test" element={<Login />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/user/email-verify" element={<EmailVerify />}></Route>


        <Route path="/" element={<HomePage />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/article/details/:slug" element={<SingleArticale />}></Route>
          <Route path="/article/:type/:searchValue" element={<SearchArticle />}></Route>
          <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
        </Route>

        <Route path="/user/:username" element={<UserDetails />}></Route>

        <Route element={<ProtectRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard" element={<DashboardContent />}></Route>
            <Route path="/dashboard/all-article" element={<DashboardArticle />}></Route>
            <Route path="/dashboard/edit-article/:slug" element={<ArticleEdit />}></Route>
            <Route path="/dashboard/article-add" element={<ArticleAdd />}></Route>
            <Route path="/dashboard/all-category" element={<AllCategory />}></Route>
            <Route path="/dashboard/add-category" element={<AddCategory />}></Route>
            <Route path="/dashboard/tag" element={<AllTag />}></Route>
            <Route path="/dashboard/comments" element={<DashComments />}></Route>
            <Route path="/dashboard/users" element={<AllUser />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>

      </Routes>
    </>
  );
}

export default App;
