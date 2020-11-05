import React, { useState, useEffect } from "react";

import { StyleSheet, View, Button, SafeAreaView } from "react-native";

import ListItem from "../components/ListItem";

const URL = "https://giangnam-api.herokuapp.com/campaigns";

export default Manager = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

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

  return (
    <View>
      <SafeAreaView>
        <Button
          title="Add"
          onPress={() => props.navigation.navigate("AddCampaign")}
        />
        <ListItem data={data} isLoading={isLoading} />
      </SafeAreaView>
    </View>
  );
};
