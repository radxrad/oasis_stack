

import React, { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
//import { message } from "antd";
import Alert from 'react-bootstrap/Alert';
import { API, BEARER } from "../../lib/constant";
import { useEffect } from "react";
import {getToken, removeToken, setToken} from "../../lib/helpers";
import axios from "axios";
import {fetchAPI, getStrapiURL} from "../../lib/api";
import jwt_decode from "jwt-decode";

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const authToken = getToken();
    const    getRefreshToken= async () => {
        try {
            const data = {
                refreshToken: getToken(),
            };
            const options = {
                "Access-Control-Allow-Credentials": true,
                withCredentials: true,
            };
            const res = await axios.post(
                `${getStrapiURL()}/api/token/refresh`,
                data,
                options
            );
            setToken( res.data.jwt);
            this.$emit("close-modal");
        } catch (err) {
            console.log(err);
        }
    } ;

    const fetchLoggedInUser = async (token) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${getStrapiURL("/api/users/me")}`, {
                headers: { Authorization: `${BEARER} ${getToken()}` },
            });
          //  const response = await fetchAPI('/users/me');
            const data = await response.json();
            if (data.status === 401){
               getRefreshToken();
            } else {
                setUserData(data);
            }

        } catch (error) {
            console.error(error);
          //  Alert.error("Error While Getting Logged In User Details");
           // getRefreshToken();
        } finally {
            setIsLoading(false);
        }
    };

    const handleUser = (user) => {
        setUserData(user);
    };

    useEffect(() => {
        if (authToken) {
            const jwtPayload = jwt_decode(getToken());
            let currentDate = new Date();
            if (jwtPayload.exp * 1000 < currentDate.getTime()) {
                getRefreshToken();
            }
            fetchLoggedInUser(authToken);
        }
    }, [authToken]);

    return (
        <AuthContext.Provider
            value={{ user: userData, setUser: handleUser, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
