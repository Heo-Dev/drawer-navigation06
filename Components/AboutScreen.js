import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WebView } from 'react-native-webview';

const AboutScreen = () => {
    const { navigation } = useNavigation();

    return (

        <WebView source={{ uri: 'https://benefitplus.kr/questions/create' }} style={{ flex: 1 }} mixedContentMode="always"/>

    );
};

export default AboutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center", 
    },
});