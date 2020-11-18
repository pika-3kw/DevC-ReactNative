import React from "react";

import { FlatList, ActivityIndicator } from "react-native";

import Item from "./Item";

const Footer = ({ isLoading }) => {
  return isLoading ? (
    <ActivityIndicator color="black" size="large" animating={true} />
  ) : null;
};

const ListItem = (props) => {
  const renderItem = ({ item }) => (
    <Item
      title={item.name}
      createdAt={item.createdAt}
      id={item._id}
      setSelected={props.setSelected}
    />
  );

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id.toString()}
      ListFooterComponent={<Footer isLoading={props.isLoading} />}
    />
  );
};

export default ListItem;
