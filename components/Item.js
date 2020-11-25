import React from "react";

import { StyleSheet, Text, TouchableHighlight } from "react-native";

import { useNavigation } from "@react-navigation/native";

const Item = ({ title, createdAt, id, setSelected }) => {
  const navigation = useNavigation();

  const date = new Date(createdAt);

  const dateString = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return (
    <TouchableHighlight
      style={styles.item}
      onPress={() => navigation.navigate("Detail")}
      onLongPress={() => setSelected(id)}
      underlayColor="#DDDDDD"
    >
      <>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDate}>{dateString}</Text>
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
