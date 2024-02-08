import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Text>고객센터 Screen</Text>
        </View>
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