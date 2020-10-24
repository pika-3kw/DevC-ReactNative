import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default Manager = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Campaign screen</Text>
      <Button
        title="Go to Detail"
        onPress={() => props.navigation.navigate("Detail")}
      />
      <Button
        title="Go to Add Campaign"
        onPress={() => props.navigation.navigate("AddCampaign")}
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
