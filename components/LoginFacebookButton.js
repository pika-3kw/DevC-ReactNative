import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Facebook from "expo-facebook";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";

import fbLogin from "../function/fbLogin";

import { FB_API_VERSION, FB_APP_ID } from "../constants";

const PERMISSIONS = [
  "public_profile",
  "email",
  "pages_manage_posts",
  "pages_show_list",
  "pages_manage_metadata",
  "pages_read_engagement",
];

export default LoginFacebookButton = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    Facebook.initializeAsync({ appId: FB_APP_ID, version: FB_API_VERSION });
  }, []);

  const getToken = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: PERMISSIONS,
    });
    return { type, token };
  };

  const facebookLogin = async () => {
    try {
      let { type, token } = await getToken();

      if (type === "success") {
        let user = await fbLogin(token);

        console.log(user);

        const { jwtToken, info } = user;

        dispatch({
          type: "SET_USER",
          info,
          jwtToken,
        });

        AsyncStorage.setItem("userJwtToken", jwtToken);
        AsyncStorage.setItem("userInfo", JSON.stringify(info));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      title="Login with Facebook"
      buttonStyle={{ backgroundColor: "#1877F2" }}
      containerStyle={{ width: "80%" }}
      onPress={facebookLogin}
    />
  );
};
