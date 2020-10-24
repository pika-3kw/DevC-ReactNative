import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default Comments = () => {
  return (
    <View style={styles.screen}>
      <Text>Commets screen</Text>
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
