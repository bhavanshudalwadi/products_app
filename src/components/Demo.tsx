import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);
// INTEGER, REAL, TEXT
var db = SQLite.openDatabase({name: 'ecomm.db', location: 'default'});

const Demo = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        createTable();
        addUser();
        getUsers();
    }, []);

    const createTable = async () => {
        const query_create = `
            CREATE TABLE IF NOT EXISTS users(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT NOT NULL,
                password TEXT NOT NULL
            );
        `;

        try {
            db.then((txn) => {
                txn.executeSql(query_create);
            });
        } catch (err) {
            console.log({ err });
        }
    };


    const addUser = async () => {
        const query_insert = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const params = ['preet', 'preet123@gmail.com', '123'];

        try {
            db.then((txn) => {
                txn.executeSql(query_insert, params);
            });
        } catch (err) {
            console.log({ err });
        }
    }

    const getUsers = async () => {
        try {
            db.then((tnx) => {
                tnx.executeSql('SELECT * FROM users', [], (tx: any, results: any) => {
                    var len = tx.rows.length;

                    for (let i = 0; i < len; i++) {
                      let row = tx.rows.item(i);
                      console.log(`Name: ${row.name}, Email: ${row.email}`);
                    }
                });
            });
        } catch (error) {
            console.log({ error });
        }
    }

    return (
        <View>
            <Text>Demo</Text>
        </View>
    )
}

export default Demo

const styles = StyleSheet.create({})