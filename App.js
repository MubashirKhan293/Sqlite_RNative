import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, FlatList, ScrollView } from "react-native";
import UpdateUser from "./components/updateUser";
import ViewRecord from "./components/view_records";
import {NavigationContainer} from'@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/home";

let stack=createNativeStackNavigator();
//component for navigation between different components
const App = () => {
  return (
  <NavigationContainer>
    <stack.Navigator>
      <stack.Screen name='Home' component={Home}/>
      <stack.Screen name='View' component={ViewRecord}/>
      <stack.Screen name='Update' component={UpdateUser}/>
    </stack.Navigator>
  </NavigationContainer>
  )
}

export default App;