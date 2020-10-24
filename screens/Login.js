import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default Login = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Login screen</Text>
      <Button
        title="Go to Register"
        onPress={() => props.navigation.navigate("Register")}
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
});
