import React, { useState, useEffect } from "react";

import { StyleSheet, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

import ListItem from "../components/ListItem";

const URL = "https://giangnam-api.herokuapp.com/campaigns";

export default Manager = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    let controller = new AbortController();

    const loadData = async () => {
      try {
        let response = await fetch(URL, { signal: controller.signal });
        let dataFetch = await response.json();
        setData(dataFetch);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error);
        }
      }
    };

    loadData();

    return () => {
      controller.abort();
    };
  }, [page]);

  const menuButton = () => (
    <Entypo
      name="menu"
      size={24}
      color="white"
      onPress={() => navigation.toggleDrawer()}
    />
  );

  return (
    <View style={styles.screen}>
      <Header
        placement="left"
        leftComponent={menuButton}
        centerComponent={{
          text: "CAMPAIGN MANAGER",
          style: { color: "#fff" },
        }}
      />
      <Button
        title="Create New Campaign"
        color="green"
        onPress={() => props.navigation.navigate("AddCampaign")}
      />
      <ListItem data={data} isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
