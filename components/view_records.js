import React, { useEffect, useState } from "react"
import { FlatList, ScrollView, Text, View, Button, StyleSheet } from "react-native"
import { openDatabase } from 'react-native-sqlite-storage';
import {useIsFocused} from'@react-navigation/native';
import styles from './home'
var db = openDatabase({ name: 'UserDatabase5.db' });

const ViewRecord = (props) => {
    const Focus=useIsFocused();
    const [userData, SetUserData] = useState('');
  
    //View data from table
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

    //mount lifecycle method for viewing records
    useEffect(() => {
        viewUser();
    }, [Focus]);

    //Delete data from table
    const deleteRecord = (id) => {
        db.transaction((txn) => {
            txn.executeSql("DELETE FROM table_user WHERE user_id=?",
                [id],
                (tx, res) => {
                    console.warn("Deleted Successfully");
                    viewUser();
                },
            )
        }
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Text>All users</Text>
            <FlatList
                data={userData}
                renderItem={({ item }) => {
                    return (
                        <ScrollView style={styles.users}>
                            <Text>{"Id : " + item.user_id}</Text>
                            <Text>{"Name : " + item.user_name}</Text>
                            <Text>{"Email : " + item.user_email}</Text>
                            <Text>{"password : " + item.user_password}</Text>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, marginRight: 10, }}><Button title="UPDATE" onPress={() => props.navigation.navigate('Update', {
                                    data: {
                                        name: item.user_name,
                                        email: item.user_email,
                                        password: item.user_password,
                                        id: item.user_id,
                                    }
                                })}></Button></View>
                                <View style={{ flex: 1 }}><Button title="DELETE" onPress={() => deleteRecord(item.user_id)}></Button></View>
                            </View>
                        </ScrollView>
                    )
                }}>

            </FlatList>
        </View>

    )
}

export default ViewRecord;