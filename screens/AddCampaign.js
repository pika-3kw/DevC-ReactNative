import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default AddCampaign = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Add Campaign Form screen</Text>
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
