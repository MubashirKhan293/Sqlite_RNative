import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, FlatList, ScrollView } from "react-native";
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase5.db' });

const Home = (props) => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [userData, SetUserData] = useState('');

//creating a table in the database
  const addUser = () => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_email VARCHAR(30), user_password VARCHAR(16))',
              []
            );
          } else {
            console.log('created')
          }
        }
      );
    });
  }


//Insert the data into table
  const saveData = () => {
    db.transaction(txn => {
      txn.executeSql("INSERT INTO table_user(user_name,user_email,user_password) VALUES (?,?,?)",
        [name, email, password],
        (tex, res) => {
          if (res.rowsAffected > 0) {
            console.warn(name);
          } else {
            console.log("not found")
          }
        },
        error => {
          console.log(error);
        }
      )
    })
  }


//mount lifecycle method for creating table
  useEffect(() => {
    addUser();
  }, []);

  return (
    <View>
      <Text style={styles.text}>Hello World</Text>

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
        <Button color={'green'} title="Submit" onPress={() => {
          saveData();
          props.navigation.navigate('View')
        }}></Button>
      </View>
      <View style={styles.button}>
        <Button color={'green'} title="View Records" onPress={() => {
          props.navigation.navigate('View')
        }}></Button>
      </View>
    </View>
  )
}

//Style for the home screen
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
export default Home;