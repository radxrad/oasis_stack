import React, { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import {getStrapiAuth, getStrapiURL} from "../lib/api";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { setToken } from "../lib/helpers";

export default function PassowrdChange(props) {
    const history = useHistory();
    const { setUser } = useAuthContext();
    let location = useLocation();
  let { from } = location.state || { from: { pathname: "/user" } };

  const [username,setUsername] = useState();
  const [message,setMessage] = useState();
  //const [user, setUser] = useState(localStorage.getItem("user"));
  const handleUsername = (e)=> setUsername(e.target.value);

    const [currentPassword,setcurrentPassword] = useState();
    const [password,setPassword] = useState();
    const [passwordConfirmation,setPasswordConfirmation] = useState();

    //const [user, setUser] = useState(localStorage.getItem("user"));
    const handlePassword = (e)=> setPassword(e.target.value);
    const handlePasswordConfirmation = (e)=> setPasswordConfirmation(e.target.value);
    const handlecurrentPassword = (e)=> setcurrentPassword(e.target.value);
    //const navigate = useNavigate();




  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const onFinish =  async (e) => {
    e.preventDefault();
    setIsLoading(true);
      axios
          .post(getStrapiURL('/api/auth/change-password'),
           {

          "password": password,
          "currentPassword": currentPassword,
          "passwordConfirmation": passwordConfirmation


          },{
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": getStrapiAuth(),

                  } })
          .then(response => {
              console.log('Password Changed');
              setMessage("Password Changed")
              setIsLoading(false);
              history.push("/signin")
          })
          .catch(error => {
              console.log('An error occurred:', error.response);
              setMessage("Failed to Find User or other issue")
              setIsLoading(false);
          });

  };


  return (
      <Fragment>
    <div className="signin light-bg max-window">
      <Form className="signup__container">


                  <div className="signup__header">Current Password</div>
                  <Form.Control
                      type="password"
                      className="signup__textbox"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={handlecurrentPassword}
                  />
                  <div className="signup__header">New Password</div>
                  <Form.Control
                      type="password"
                      className="signup__textbox"
                      placeholder="New Password"
                      value={password}
                      onChange={handlePassword}
                  />
                  <div className="signup__header">Confirm Password</div>
                  <Form.Control
                      type="password"
                      className="signup__textbox"
                      placeholder="Confirm Password"
                      value={passwordConfirmation}
                      onChange={handlePasswordConfirmation}
                  />

                  {message ? (
                      <div className="py-2">
                          <div className="alert alert-danger error-msg">{message}</div>
                      </div>
                  ) : (
                      ""
                  )}



        <div className="controls">
          <Button
            className="btn--lg"
            type="submit"
            onClick={onFinish}
          >
            Change Password {isLoading && <Spinner size="small" />}
          </Button>

        </div>

      </Form>
    </div>
      </Fragment>
  );
}
