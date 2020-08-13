import React, { useContext } from "react";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";

import { NotesContext } from "../NotesContext";

export default function Header() {
  const { theme, setTheme } = useContext(NotesContext);

  function ChangeTheme() {

    getData()

    if (!theme.dark) {
      setTheme({
        dark: true,
        name: "Night",
        bgColor: "#172A3A",
        oddColor: "#FFFF",
        titleColor: "#CAFE48",
        noteColor: "#FFFF",
        textColor: "#000",
        barStyle: "light-content",
      });
    }
    if (theme.dark) {
      setTheme({
        dark: false,
        name: "Light",
        bgColor: "#FFFF",
        oddColor: "#000",
        titleColor: "#172A3A",
        noteColor: "#FFFF",
        textColor: "#000",
        barStyle: "dark-content",
      });
    }
  }

  return (
    <View style={[HeaderStyle.header, { backgroundColor: theme.bgColor }]}>
      <Text
        onPress={() => ChangeTheme()}
        style={{ fontSize: 25, fontWeight: "bold", color: theme.titleColor }}
      >
        {theme.name}Notes
      </Text>
    </View>
  );
}

const HeaderStyle = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    paddingBottom: 10,
  },
});
