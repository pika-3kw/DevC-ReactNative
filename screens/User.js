import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Header } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default User = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch({
      type: "REMOVE_USER",
    });

    await AsyncStorage.clear();
  };

  const homeButton = () => (
    <Entypo
      name="home"
      size={24}
      color="white"
      onPress={() => navigation.navigate("Manager")}
    />
  );

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
        centerComponent={{ text: "PROFILE", style: { color: "#fff" } }}
        rightComponent={homeButton}
      />
      <Avatar
        size="xlarge"
        title="GN"
        containerStyle={styles.avatarContainer}
        rounded
      />
      <View style={styles.info}>
        <Text>Fullname: Giang Nam</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={logout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },

  avatarContainer: {
    backgroundColor: "grey",
    marginTop: 10,
  },
  info: { marginTop: 10 },
  buttonContainer: { marginTop: 10 },
});
