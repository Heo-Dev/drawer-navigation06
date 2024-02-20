import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const InvestScreen = () => {
    return (
        <View style={styles.container}>
            <Text>비플러스 투자하기 화면입니다.</Text>
        </View>
    );
};

export default InvestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center", 
    },
});