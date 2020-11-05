import React from "react";

import { StyleSheet, Text, TouchableHighlight } from "react-native";

import { useNavigation } from "@react-navigation/native";

const Item = ({ title, createAt }) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      style={styles.item}
      onPress={() => navigation.navigate("Detail")}
      underlayColor="#DDDDDD"
    >
      <>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDate}>{createAt}</Text>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    marginVertical: 5,
    padding: 10,
  },
  itemTitle: {
    fontSize: 16,
    paddingBottom: 5,
  },
  itemDate: {
    marginLeft: "auto",
    color: "grey",
  },
});

export default Item;
