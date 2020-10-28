import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Facebook from "expo-facebook";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";

import { FB_APP_ID, FB_APP_SECRET, FB_API_VERSION } from "@env";

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

  const getUserInfo = async (token) => {
    const response = await fetch(
      `https://graph.facebook.com/v8.0/me?fields=id,name,email,accounts{name,app_id}&access_token=${token}`
    );
    let userInfo = await response.json();
    userInfo.token = token;

    return userInfo;
  };

  const getLongLivedToken = async (token) => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/${FB_API_VERSION}/oauth/access_token?grant_type=fb_exchange_token&client_id=${FB_APP_ID}&client_secret=${FB_APP_SECRET}&fb_exchange_token=${token}`
      );

      const json = await response.json();
      return json.access_token;
    } catch (error) {
      console.log("err", error);
    }
  };

  const facebookLogin = async () => {
    try {
      let { type, token } = await getToken();

      token = await getLongLivedToken(token);

      if (type === "success") {
        let userInfo = await getUserInfo(token);

        dispatch({
          type: "SET_FACEBOOK_ACCOUNT",
          payload: userInfo,
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
