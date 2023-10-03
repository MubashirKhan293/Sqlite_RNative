import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, FlatList, ScrollView } from "react-native";
import { openDatabase } from 'react-native-sqlite-storage';
import UpdateUser from "./updateUser";
var db = openDatabase({ name: 'UserDatabase5.db' });

const Home = (props) => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [userData, SetUserData] = useState('');


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


  const viewUser = () => {
    db.transaction(txn => {
      txn.executeSql("SELECT * FROM table_user",
        [],
        (tex, res) => {
          var temp = [];
          for (let i = 0; i < res.rows.length; ++i) {
            console.log(res.rows.item(i));
            temp.push(res.rows.item(i));
          }
          SetUserData(temp);
        }
      );
    });
  }


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


  const deleteRecord=(id)=>{
    db.transaction((txn)=>{
      txn.executeSql("DELETE FROM table_user WHERE user_id=?",
      [id],
      (tx,res)=>{
        console.warn("Deleted Successfully");
        saveData();
      },
      )
    }
    )
  }
  useEffect(() => {
    addUser();
  }, []);


  useEffect(() => {
    viewUser();
  }, []);

  useEffect(() => {
    viewUser();
  }, [userData]);


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
          viewUser();
        }}></Button>
      </View>
      <FlatList
        data={userData}
        style={{ marginBottom: 400 }}
        renderItem={({ item }) => {

          return (
            <ScrollView style={styles.users}>
              <Text>{"Id : " + item.user_id}</Text>
              <Text>{"Name : " + item.user_name}</Text>
              <Text>{"Email : " + item.user_email}</Text>
              <Text>{"password : " + item.user_password}</Text>
              <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:1, marginRight:10,}}><Button title="UPDATE" onPress={()=>props.navigation.navigate('Update',{
                    data:{
                        name:item.user_name,
                        email:item.user_email,
                        password:item.user_password,
                        id:item.user_id,
                    }
                })}></Button></View>
                <View style={{flex:1}}><Button title="DELETE" onPress={()=>deleteRecord(item.user_id)}></Button></View>
              </View>
            </ScrollView>
          )
        }}>

      </FlatList>
      
    </View>
  )
}

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