import { View, Text, Alert } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import { loginUser, registerUser } from '../db/databaseService'
import AsyncStorage from '@react-native-async-storage/async-storage'

const authContext = createContext<any>(null)

const AuthProvider = ({ children }: any) => {

  const login = async (loginDetails: any, navigation: any) => {
    const result = await loginUser(loginDetails.email, loginDetails.password)
    if(result && result.length > 0 && result[0].rows.length > 0) {
      await AsyncStorage.setItem('user', JSON.stringify(result[0].rows.item(0)));
      Alert.alert('Success', 'Login Successful')
      if(result[0].rows.item(0).email === "admin123@gmail.com") {
        navigation.replace("Admin")
      }else {
        navigation.replace("Home")
      }
    }else {
      Alert.alert('Failed', 'Failed to login')
    }
  }

  const signUpUser = async (userDetails: any, navigation: any) => {
    const result = await registerUser(userDetails.name, userDetails.email, userDetails.password)
    if(result && result.length > 0 && result[0].rowsAffected > 0) {
      Alert.alert('Success', 'Registration Successful')
      navigation.navigate("Login")
    }else {
      Alert.alert('Failed', 'Failed to register')
    }
  }

  const logoutUser = async (navigation: any) => {
    await AsyncStorage.removeItem('user', () => {
      // navigation.navigate("Login")
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    })
  }

  return (
    <authContext.Provider value={{ login, signUpUser, logoutUser }}>
      { children }
    </authContext.Provider>
  )
}

const useAuthContext = () => {
  if(!authContext) {
    console.error("authContext only can be used within authProvider")
    return null;
  }
  return useContext(authContext);
}

export { authContext, AuthProvider, useAuthContext }