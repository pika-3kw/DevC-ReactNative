import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Facebook from "expo-facebook";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";

const PERMISSIONS = [
  "public_profile",
  "email",
  "pages_manage_posts",
  "pages_show_list",
  "pages_manage_metadata",
  "pages_read_engagement",
];

const APP_ID = "2835633236715709";
const API_VERSION = "v8.0";

export default LoginFacebookButton = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    Facebook.initializeAsync({ appId: APP_ID, version: API_VERSION });
  }, []);

  const facebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: PERMISSIONS,
      });

      if (type === "success") {
        console.log(token);
        const response = await fetch(
          `https://graph.facebook.com/v8.0/me?fields=id,name,email,accounts{name,app_id}&access_token=${token}`
        );

        const userInfo = await response.json();

        dispatch({
          type: "SET_FACEBOOK_ACCOUNT",
          payload: { token, ...userInfo },
        });

        AsyncStorage.setItem("@token", token);
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
