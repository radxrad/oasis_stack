import "./css/index.css";
//import React, { useState, useEffect, useContext } from "react";
import { React,  useState, useEffect, useContext } from "react";
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from "react-router-dom";
import Home from "./routes/Home";
import paths from "./paths";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import User from "./routes/User";
import Read from "./routes/Read";
import history from "./history";
import Publish from "./routes/Publish";
import About from "./routes/About";
import Question from "./routes/Question";
import ForgotPassword from "./routes/PasswordForgotten"
import ChangePassword from "./routes/PasswordChange"
import ResetPassword from "./routes/PasswordReset"


import Test from "./routes/Test";
import CustomNavbar from "./components/CustomNavbar";
import axios from "axios";
//import UserProvider from './context/user';
import AuthProvider from "./components/AuthProvider/AuthProvider";
import { useAuthContext } from "./context/AuthContext";
import {getStrapiURL} from "./lib/api";
import {
  ReviewsConfigContext, ReviewsProvider,
  Reviews,
  ReviewForm
} from "strapi-ratings-client";
import { CommentsProvider } from "strapi-comments-client"
import PasswordReset from "./routes/PasswordReset";
function App() {
  // const { user, isLoading, setUser } = useAuthContext();
  const { user, isLoading } = useAuthContext();
  const { setUser } = useContext(ReviewsConfigContext);
  const auth = JSON.parse(localStorage.getItem("user"));
  // useEffect(() => {
  //   if (auth) {
  //     const options = {
  //       method: "GET",
  //       url: `https://stoplight.io/mocks/oasis/oasis/19253909/user/${auth.userId}`,
  //       headers: { "Content-Type": "application/json" },
  //     };
  //
  //     axios
  //       .request(options)
  //       .then(function (response) {
  //         console.log(response.data);
  //         setUser(response.data);
  //       })
  //       .catch(function (error) {
  //         console.error(error);
  //       });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
      <Router history={history}>
        <AuthProvider >
          <ReviewsProvider apiURL={getStrapiURL()}>
            <CommentsProvider apiURL={getStrapiURL()}>
              <CustomNavbar user={user} auth={auth} />
              <Switch>
                <Route exact path={paths.home} component={Home} />
                <Route path={paths.signIn} component={SignIn} />
                <Route path={paths.signUp} component={SignUp} />
                <Route path={paths.user} component={User} />
                <Route path={paths.read} component={Read} />
                <Route path={paths.publish} component={Publish} />
                <Route path={paths.test} component={Test} />
                <Route path={paths.about} component={About} />
                <Route path={paths.question} component={Question} />
                <Route path={paths.postreview} component={Question} />
                <Route path={paths.forgotpassword} component={ForgotPassword} />
                <Route path={paths.resetpassword} component={ResetPassword} />
                <Route path={paths.changepassword} component={ChangePassword} />
              </Switch>
            </CommentsProvider>
          </ReviewsProvider>
        </AuthProvider>
      </Router>
  );
}



export default App;
