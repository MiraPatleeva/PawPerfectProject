import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet,Button,TextInput,Keyboard,Image} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RandomAnimalPage } from './components/AssetExample';



// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

function HomeScreen() {
const handleCallFunction = () => {
    // Call the function from AssetExample.js
    RandomAnimalPage();
  };
  return (
    <View style={styles.home}>
      <RandomAnimalPage />
    </View>
  );
 }

function RemindersScreen() {
   const [nickname, setNickname] = useState("");
  const [nicknamesList, setNicknamesList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const loadNicknames = async () => {
      try {
        const savedNicknames = await AsyncStorage.getItem("@nicknames");
        if (savedNicknames !== null) {
          setNicknamesList(JSON.parse(savedNicknames));
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadNicknames();
  }, []);

  const saveNickname = async () => {
    try {
      let updatedNicknames;
      if (editIndex !== null) {
        updatedNicknames = [...nicknamesList];
        updatedNicknames[editIndex] = nickname;
      } else {
        updatedNicknames = [...nicknamesList, nickname];
      }
      await AsyncStorage.setItem("@nicknames", JSON.stringify(updatedNicknames));
      setNicknamesList(updatedNicknames);
      setNickname("");
      setEditIndex(null);
    } catch (err) {
      console.log(err);
    }
    Keyboard.dismiss();
  };

  const editNickname = (index) => {
    setNickname(nicknamesList[index]);
    setEditIndex(index);
  };

  const removeNickname = async (index) => {
    try {
      const updatedNicknames = [...nicknamesList];
      updatedNicknames.splice(index, 1);
      await AsyncStorage.setItem("@nicknames", JSON.stringify(updatedNicknames));
      setNicknamesList(updatedNicknames);
    } catch (err) {
      console.log(err);
    }
    Keyboard.dismiss();
  };

  return (
   
    <View style={styles.todo,styles.home}>
      <Text style={styles.heading}>Task to be done:</Text>
      <TextInput
        placeholder="Enter your task to be done"
        style={styles.textInput}
        value={nickname}
        onChangeText={(value) => setNickname(value)}
      />
        <Button title={editIndex !== null ? "Update" : "Save"} color="#553c8b" onPress={saveNickname} />
      <View>
        {nicknamesList.map((item, index) => (
          <View key={index} style={styles.nicknameItem}>
            <Text>{item}</Text>
            <View style={styles.buttonContainer}>
             <Button title="Edit" onPress={() => editNickname(index)} color="#ccc1ff" style={styles.buttonEdit} />
              <Button title="Delete" color="#a89ef0" onPress={() => removeNickname(index)} />
            </View>
          </View>
        ))}
      </View>
      
    </View>
    
  );
}

function MapScreen() {
  const varnaRegion = {
  latitude: 43.2141,
  longitude: 27.9147,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
const grandMallVarnaRegion = {
  latitude: 43.218085244528595,
  longitude: 27.89877277843256,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
const deltaPlanetMallRegion = { 
  latitude: 43.22708486797365,
  longitude: 27.87584830859571,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
const MaxiPetRegion = { 
  latitude: 43.22368900203471,
  longitude: 27.873453226858626,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
  return (
   <View style={styles.container}>
      <MapView style={styles.map}   
      initialRegion={MaxiPetRegion}>
      <Marker coordinate={grandMallVarnaRegion} />
      <Marker coordinate={deltaPlanetMallRegion} />
       <Marker coordinate={MaxiPetRegion} />
    </MapView>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Tasks" component={RemindersScreen} />
      <Drawer.Screen name="Map" component={MapScreen} />
    </Drawer.Navigator>
  );
}

         

export default function App() {

  
  return (
       
      <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
    
  );
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 8,
  },
  heading: {
      textAlign:'center',
      fontSize:20,
      fontStyle:'italic',
  },

  todo: {
    flex: 1,
    justifyContent: 'left',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  nicknameItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
    buttonContainer: {
    flexDirection: "row",
    marginTop:'3%'
  },
  buttonEdit: {
    marginRight:'3%', // Add right margin to "Edit" button
  },
  home:{
    height: 3000,
    backgroundColor:'#ffeafe'
  },
});

