import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default Register = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Register screen</Text>
      <Button
        title="Go to Login"
        onPress={() => props.navigation.navigate("Login")}
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
