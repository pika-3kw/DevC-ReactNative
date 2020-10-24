import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default User = () => {
  return (
    <View style={styles.screen}>
      <Text>User screen</Text>
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
