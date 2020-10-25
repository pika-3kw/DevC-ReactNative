import React, { useEffect, useState } from "react";

import * as Facebook from "expo-facebook";
import { Button } from "react-native-elements";

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
  useEffect(() => {
    Facebook.initializeAsync({ appId: APP_ID, version: API_VERSION });
  }, []);

  const facebookLogin = async () => {
    try {
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: PERMISSIONS,
      });
      console.log(result);
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
