import React,{useEffect, useState} from "react";
import {View, Text, TextInput,Button, StyleSheet} from "react-native";
import { openDatabase } from 'react-native-sqlite-storage';
import {useRoute,useNavigation} from'@react-navigation/native';


var db = openDatabase({ name: 'UserDatabase5.db' });

//updation component for updating user record
const UpdateUser=()=>{
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
    const route=useRoute();
    const navigate=useNavigation();
//lifecycle method for fetching data from the home screen
    useEffect(()=>{
      setname(route.params.data.name)
      setemail(route.params.data.email)
      setpassword(route.params.data.password)
    },[])
    
//method for update records in database
const updateRecord=()=>{
      db.transaction((txn)=>{
        txn.executeSql("UPDATE table_user set user_name=? , user_email=? , user_password=? WHERE user_id=?",
        [name,email,password,route.params.data.id],
        (tx,res)=>{
          console.warn("Updated Successfully");
          navigate.goBack()
        },
        )
      }
      )
    }
//design of update screen
    return(
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={(txt) => setname(txt)}>
      </TextInput>

      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={(txt) => setemail(txt)}>
      </TextInput>

      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={(txt) => setpassword(txt)}>
      </TextInput>

      <View style={styles.button}>
        <Button color={'green'} title="Update" onPress={()=>updateRecord()}></Button>
    </View>
    </View>
    );
}
//style for update screen
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 20,
  },
  button: {
    width: 150,
    marginLeft: 135,
    borderRadius: 10,
    marginTop: 30
  },
  users: {
    padding: 10,
    margin: 10,
    backgroundColor: 'yellow',
  }
})

export default UpdateUser;