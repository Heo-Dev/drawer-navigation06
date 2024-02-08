import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const RegistScreen = () => {
    return (
        <View style={styles.container}>
            <Text>회원가입 Screen</Text>
        </View>
    );
};
export default RegistScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center", 
    },
});