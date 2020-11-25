import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  FlatList,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import {
  ListItem,
  Badge,
  BottomSheet,
  Input,
  Header,
  Overlay,
  Button,
} from "react-native-elements";
import { useSelector } from "react-redux";

import getFeed from "../function/getFeed";
import postCampaign from "../function/postCampaign";

export default AddCampaign = () => {
  const [isVisibleBottomSheet, setIsVisibleBottomSheet] = useState(false);

  const [isVisibleOverlay, setIsVisibleOverlay] = useState(false);

  const [itemSelected, setItemSelected] = useState(null);

  const [feed, setFeed] = useState([]);

  const [campaignName, setCampaignName] = useState("");
  const [campaignPosts, setCampaignPosts] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  const updateData = route.params.updateData;

  const info = useSelector((state) => state.user.info);

  const token = useSelector((state) => state.user.jwtToken);

  let fanpages = info.facebook.accounts.data;

  fanpages = fanpages.map((item) => ({
    ...item,
    type: "fanpage",
  }));

  const onSelectFanpage = (item) => {
    setIsVisibleBottomSheet(false);
    setIsVisibleOverlay(true);
    setItemSelected(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (itemSelected) {
        try {
          const id = itemSelected.id;
          let fbFeed = await getFeed(id, token);
          setFeed(fbFeed);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [itemSelected]);

  const backButton = () => (
    <Feather
      name="arrow-left"
      size={24}
      color="white"
      onPress={() => navigation.goBack()}
    />
  );

  const Item = ({ item }) => (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        marginBottom: 5,
      }}
    >
      <Badge value={item.type} textStyle={{ color: "orange" }} />
      <Text>{item.permalink_url}</Text>
    </View>
  );

  const handleSelectPost = (id) => {
    setIsVisibleOverlay(false);

    const found = campaignPosts.find((el) => el.id === id);

    if (found) return;

    const item = feed.find((el) => el.id === id);

    setCampaignPosts([
      ...campaignPosts,
      {
        permalink_url: item.permalink_url,
        type: "fanpage",
        id: item.id,
        fbParentId: itemSelected.id,
      },
    ]);
  };

  const handleSubmit = async () => {
    if (!campaignName || !campaignPosts) return;

    const campaign = {
      name: campaignName,
      posts: campaignPosts,
    };

    try {
      const result = await postCampaign(campaign, token);

      if (result.status === 201) {
        setCampaignName("");
        setCampaignPosts([]);
        updateData(result.data);

        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.screen}>
      <Header
        placement="left"
        leftComponent={backButton}
        centerComponent={{
          text: "CREATE NEW CAMPAIGN",
          style: { color: "#fff" },
        }}
      />

      <Input
        placeholder="Campaign name"
        onChangeText={(value) => setCampaignName(value)}
        style={styles.inputName}
      />

      <FlatList
        data={campaignPosts}
        renderItem={Item}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <TouchableHighlight
            style={styles.select}
            underlayColor="#DDDDDD"
            onPress={() => setIsVisibleBottomSheet(true)}
          >
            <Text style={styles.textSelect}>Add Post</Text>
          </TouchableHighlight>
        }
      />

      <BottomSheet isVisible={isVisibleBottomSheet}>
        {fanpages.map((item) => (
          <ListItem
            key={item.id}
            bottomDivider
            onPress={() => onSelectFanpage(item)}
          >
            <Badge value={item.type} textStyle={{ color: "orange" }} />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>

      <Overlay isVisible={isVisibleOverlay} fullScreen={true}>
        <>
          {feed ? (
            <ScrollView>
              {feed.map((item) => (
                <ListItem
                  key={item.id}
                  bottomDivider
                  onPress={() => handleSelectPost(item.id)}
                >
                  <ListItem.Content>
                    <ListItem.Title>{item.message}</ListItem.Title>
                    <ListItem.Subtitle>{item.permalink_url}</ListItem.Subtitle>
                    <ListItem.Subtitle>{item.created_time}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))}
            </ScrollView>
          ) : (
            <Text>Loading...</Text>
          )}
          <Button title="Back" onPress={() => setIsVisibleOverlay(false)} />
        </>
      </Overlay>

      <ButtonCreate onPress={handleSubmit} />
    </View>
  );
};

const ButtonCreate = (props) => (
  <TouchableHighlight
    onPress={props.onPress}
    style={{
      width: "100%",
      height: 40,
      backgroundColor: "#2089DC",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ color: "white" }}>Create New Campaign</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  select: {
    marginBottom: 5,
    backgroundColor: "white",
  },
  textSelect: {
    color: "grey",
    fontSize: 18,
    padding: 14,
  },
  inputName: {},
});
