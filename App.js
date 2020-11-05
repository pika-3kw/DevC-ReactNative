import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ManagerScreen from "./screens/Manager";
import DetailScreen from "./screens/Detail";
import AddCampaignScreen from "./screens/AddCampaign";
import CommentsScreen from "./screens/Comments";
import UserScreen from "./screens/User";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";

import rootReducer from "./reducers";

import fbCheckToken from "./function/fbCheckToken";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const store = createStore(rootReducer);

const RenderApp = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.user.isAuth);

  const getJwtTokenFromStorage = async () => {
    const token = await AsyncStorage.getItem("userJwtToken");
    return token;
  };

  const getUserInfoFromStorage = async () => {
    const info = await AsyncStorage.getItem("userInfo");
    return info;
  };

  useEffect(() => {
    const start = async () => {
      let jwtToken, info;

      try {
        jwtToken = await getJwtTokenFromStorage();

        const access = await fbCheckToken(jwtToken);

        if (access) {
          info = await getUserInfoFromStorage();
          info = JSON.parse(info);
          dispatch({ type: "SET_USER", jwtToken, info });
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    start();
  }, []);

  const createCampaignStacks = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Manager"
        component={ManagerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCampaign"
        component={AddCampaignScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

  const createUserStacks = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );

  if (!isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Drawer.Navigator initialRouteName="Manager">
      <Drawer.Screen
        name="Manager"
        component={createCampaignStacks}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="User"
        component={createUserStacks}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <RenderApp />
    </NavigationContainer>
  </Provider>
);
