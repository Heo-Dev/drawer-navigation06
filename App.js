import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {NavigationContainer } from '@react-navigation/native';

import DrawerNavigator from './Components/DrawerNavigator';
import { AuthContext } from './context/AuthContext';

export default function App() {

    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [navi, setNavi] = useState(null);

    return (

        <AuthContext.Provider value={{ isLogin, setIsLogin, user, setUser, token, setToken, navi, setNavi }} >

            <NavigationContainer>
                <DrawerNavigator />
            </NavigationContainer>

        </AuthContext.Provider>
    );
  }




