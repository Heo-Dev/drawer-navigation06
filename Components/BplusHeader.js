import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";

import Ionicons from "react-native-vector-icons/Ionicons";


const BplusHeader = () => {

    const navigation = useNavigation();
    const { isLogin, user, token, } = useContext(AuthContext);

    const Header = isLogin ? () => (
                                    <TouchableOpacity onPress={() => navigation.navigate('Mypage')} style={styles.bplus_header_btn} >
                                        <Ionicons name="stats-chart-outline" size={22} />
                                        <Text style={styles.buttonText}>마이페이지</Text>
                                    </TouchableOpacity>
                                ) : () => (
                                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.bplus_header_btn} >
                                        <Ionicons name="log-in-outline" size={22} />
                                        <Text style={styles.buttonText}>로그인</Text>
                                    </TouchableOpacity>
                                );

    return (
        <View style={styles.bplus_header}>
            <View>
                <Image source={require("../assets/logo-set.png")} style={styles.bplus_header_logo} />
            </View>
            <View>
                <Header />
            </View>
        </View>
    );
};

export default BplusHeader;


const styles = StyleSheet.create({
    bplus_header: {
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "space-between",
        width: '100%',
        alignItems: 'center',

    },
    bplus_header_logo: {
        flex: 1,
        height: 32,
        maxWidth: '50%',
        objectFit: 'contain',  
        alignItems: 'center',  
        justifyContent: 'flex-start',
        marginLeft: -15,
        marginTop: 1,           
    },
    bplus_header_btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#ffdb59',
        textAlign: "center",
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,         
        maxHeight: 36,
    },    
    buttonText: {
        color: '#111', 
        textAlign: 'center',
        marginLeft: 5,
        color: '#333'
    },
});