import React, {useContext, useEffect} from 'react';
import { AsyncStorage } from 'react-native';

import {NotesContext} from '../NotesContext'

function Storage() {
const { notes, contentLoaded } = useContext(NotesContext);

useEffect(()=>{

    if(contentLoaded){
      saveData()
    }
    async function saveData(){
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes))
    } catch(err) {
      console.log(err)
    }
  
    console.log('Done.')
  }
}, [notes])
  
return null;
}

export default Storage;