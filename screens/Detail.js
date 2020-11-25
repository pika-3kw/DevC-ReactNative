import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default Detail = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Detail campaign screen</Text>
      <Button
        title="Go to Comments"
        onPress={() => props.navigation.navigate("Comments")}
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
