import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { createStore } from "redux";

import ManagerScreen from "./screens/Manager";
import DetailScreen from "./screens/Detail";
import AddCampaignScreen from "./screens/AddCampaign";
import CommentsScreen from "./screens/Comments";
import UserScreen from "./screens/User";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";

import rootReducer from "./reducers";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const isAuth = false;

const store = createStore(rootReducer);

const RenderApp = () => {
  const createCampaignsStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Manager" component={ManagerScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="AddCampaign" component={AddCampaignScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
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
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Manager" component={createCampaignsStack} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
};

export default App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <RenderApp />
    </NavigationContainer>
  </Provider>
);
