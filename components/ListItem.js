import React from "react";

import { FlatList, ActivityIndicator } from "react-native";

import Item from "./Item";

const renderItem = ({ item }) => (
  <Item title={item.title} createAt={item.createAt} />
);

const Footer = ({ isLoading }) => {
  return isLoading ? (
    <ActivityIndicator color="black" size="large" animating={true} />
  ) : null;
};

const ListItem = (props) => {
  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={<Footer isLoading={props.isLoading} />}
    />
  );
};

export default ListItem;
