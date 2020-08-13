import React, { useContext, createContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NotesContext } from "../NotesContext";

export default function Folders() {
  const { notes, setNotes, theme } = useContext(NotesContext);

  const Navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  function createNote() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();

    const newNote = {
      id: Math.random(),
      title: title,
      details: details,
      date: ('0' + day).slice(-2)+"/"+('0' + month).slice(-2)+"/"+year,
    };
    setNotes([...notes, newNote]);

    Navigation.goBack();
  }

  return (
    <View style={[AddStyle.Container, { backgroundColor: theme.bgColor }]}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: theme.oddColor,
          marginBottom: 50,
          marginTop: 25,
        }}
      >
        New note
      </Text>

      <Text
        style={{
          color: theme.oddColor,
          alignSelf: "flex-start",
          marginLeft: 25,
        }}
      >
        Title:{" "}
      </Text>
      <TextInput
        onChangeText={(text) => setTitle(text)}
        style={[
          AddStyle.Input,
          { borderBottomColor: theme.oddColor, color: theme.oddColor },
        ]}
      />

      <Text
        style={{
          color: theme.oddColor,
          alignSelf: "flex-start",
          marginLeft: 25,
          marginTop: 50,
        }}
      >
        Details:{" "}
      </Text>
      <TextInput
        onChangeText={(text) => setDetails(text)}
        style={[
          AddStyle.Input,
          { borderBottomColor: theme.oddColor, color: theme.oddColor },
        ]}
      />

      <TouchableHighlight onPress={() => createNote()} style={AddStyle.addBtn}>
        <Text style={{ fontWeight: "bold" }}>Create Note</Text>
      </TouchableHighlight>
    </View>
  );
}

const AddStyle = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
  },
  addBtn: {
    marginTop: 20,
    width: Dimensions.get("screen").width - 50,
    backgroundColor: "#CAFE48",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Input: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFF",
    width: Dimensions.get("screen").width - 50,
    height: 40,
  },
});
