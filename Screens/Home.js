import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NotesContext } from "../NotesContext";

export default function Home() {
  const Navigation = useNavigation();

  const { notes, setNotes, theme } = useContext(NotesContext);

  const [modalShown, setModalVisibility] = useState(false);

  const [currentNote, setCurrentNote] = useState({ title: "" });

  function ModalShow(item) {
    if (!modalShown) {
      setCurrentNote(item);
    }
    setModalVisibility(!modalShown);
  }

  function DeleteNote() {
    let arr = notes;
    let pos = notes.indexOf(currentNote);
    arr.splice(pos, 1);
    setNotes(arr);

    setModalVisibility(!modalShown);
  }

  return (
    <View style={[HomeStyle.Container, { backgroundColor: theme.bgColor }]}>
      <FlatList
        data={notes}
        keyExtractor={(notes) => String(notes.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity onLongPress={() => ModalShow(item)}>
            <View style={HomeStyle.noteCard}>
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
              <Text style={{ fontSize: 16 }}>{item.details}</Text>
              <Text style={{ color: "rgba(0,0,0, 0.5)" }}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={HomeStyle.FloatingButton}>
        <TouchableOpacity onPress={() => Navigation.navigate("Folders")}>
          <MaterialCommunityIcons name="plus" size={25} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalShown}
        animated={true}
        transparent={true}
        animationType="fade"
      >
        <View style={{ backgroundColor: "rgba(0,0,0,0.5)", flex: 1 }}>
          <View style={HomeStyle.Modal}>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => ModalShow()}
            >
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Text
              style={{
                paddingHorizontal: 10,
                fontSize: 25,
                fontWeight: "bold",
                alignSelf: "center",
                textAlign: "center",
                marginTop: -20,
              }}
            >
              Deletar Nota "{currentNote.title}"?
            </Text>

            <TouchableOpacity
              onPress={() => DeleteNote()}
              style={{
                padding: 5,
                borderRadius: 5,
                width: "90%",
                flexDirection: "row",
                backgroundColor: "#e04",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const HomeStyle = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noteCard: {
    backgroundColor: "#FFFF",
    width: Dimensions.get("screen").width - 40,
    padding: 5,
    borderRadius: 5,
    marginBottom: 20,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 0.5,
  },
  FloatingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#CAFE48",
    position: "absolute",
    right: 20,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  Modal: {
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFF",
    height: 200,
    position: "absolute",
    bottom: 20,
    borderRadius: 5,
    width: Dimensions.get("screen").width - 40,
    paddingBottom: 10,
  },
});
