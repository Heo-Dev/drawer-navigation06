import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { WebView } from 'react-native-webview';

const HomeScreen = () => {

    const { navigation } = useNavigation();

    return (

        <WebView source={{ uri: 'https://benefitplus.kr' }} style={{ flex: 1 }} mixedContentMode="always"/>

    );
};
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center", 
    },
});