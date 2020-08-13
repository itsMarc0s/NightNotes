import React, { useState, useEffect } from "react";
import { StatusBar, AsyncStorage } from "react-native";

import Routing from "./Routes/Routing";
import Header from "./Compontents/Header";

import { NotesContext } from "./NotesContext";

import StorageSetter from './Compontents/Storage'

export default function App() {

  const [notes, setNotes] = useState([])
  const [contentLoaded, setLoaded] = useState(false)

  useEffect(()=>{
    getData()
  }, [])

  async function getData(){
    try {
      const notesStored = await AsyncStorage.getItem('notes')
      const JSONNOTES = JSON.parse(notesStored)
      if(JSONNOTES){
        setNotes(JSON.parse(notesStored))
        setLoaded(true)
      }else{
        setNotes(['error'])
      }
    } catch(err){
      console.log(err)
    }    
  }

  const [theme, setTheme] = useState({
    dark: true,
    name: "Night",
    bgColor: "#172A3A",
    oddColor: "#FFFF",
    titleColor: "#CAFE48",
    noteColor: "#FFFF",
    textColor: "#000",
    barStyle: "light-content",
  });

  return (
    <NotesContext.Provider value={{ notes, setNotes, theme, setTheme, contentLoaded }}>
      <StatusBar backgroundColor={theme.bgColor} barStyle={theme.barStyle} />
      <Header />
      <Routing />
      <StorageSetter />
    </NotesContext.Provider>
  );
}
