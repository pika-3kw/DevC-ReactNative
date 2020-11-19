import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, Button, LogBox } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header, BottomSheet, ListItem } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

import { default as List } from "../components/ListItem";

import getCampaign from "../function/getCampaign";
import removeCampaign from "../function/removeCampaign";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default Manager = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  const [isVisibleOptions, setIsVisibleOptions] = useState(false);
  const [options, setOptions] = useState([]);

  const token = useSelector((state) => state.user.jwtToken);

  const navigation = useNavigation();

  useEffect(() => {
    if (selected != null) {
      setIsVisibleOptions(true);
      setOptions([
        {
          title: "Edit",
          containerStyle: { backgroundColor: "green" },
          titleStyle: { color: "white" },
          onPress: () => {
            setIsVisibleOptions(false);
            // handle edit
          },
        },
        {
          title: "Remove",
          containerStyle: { backgroundColor: "red" },
          titleStyle: { color: "white" },
          onPress: async () => {
            setIsVisibleOptions(false);
            const result = await removeCampaign(selected, token);
            if (result.message === "OK") {
              setData(data.filter((campaign) => campaign._id !== selected));
            }
          },
        },
        {
          title: "Cancel",
          onPress: () => {
            setIsVisibleOptions(false);
            console.log(selected);
          },
        },
      ]);
    }
    return () => {
      setSelected(null);
    };
  }, [selected]);

  useEffect(() => {
    let controller = new AbortController();

    const loadData = async () => {
      try {
        const campaigns = await getCampaign(token);
        setData(campaigns);
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

  const updateData = (newData) => {
    setData([...data, newData]);
  };

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
        onPress={() => props.navigation.navigate("AddCampaign", { updateData })}
      />

      <List data={data} isLoading={isLoading} setSelected={setSelected} />

      <BottomSheet isVisible={isVisibleOptions}>
        {options.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
