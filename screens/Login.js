import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { Button } from "react-native-elements";
import { Input } from "react-native-elements";

export default Login = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          leftIcon={<MaterialIcons name="email" size={24} color="black" />}
        />
        <Input
          placeholder="Password"
          leftIcon={
            <FontAwesome
              name="lock"
              size={24}
              color="black"
              style={{ marginLeft: 5, marginRight: 2 }}
            />
          }
          secureTextEntry={true}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={{ width: "40%" }}>
          <Button
            title="Register"
            type="outline"
            onPress={() => props.navigation.navigate("Register")}
          />
        </View>

        <View style={{ width: "40%" }}>
          <Button title="Login" />
        </View>
      </View>

      <Text style={{ color: "grey", marginVertical: 20 }}>OR</Text>

      <Button
        title="Login with Facebook"
        buttonStyle={{ backgroundColor: "#1877F2" }}
        containerStyle={{ width: "80%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  inputContainer: {
    width: "90%",
  },
});
