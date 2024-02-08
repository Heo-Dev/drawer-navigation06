import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const HomeScreen = () => {

    const { navigation } = useNavigation();

    return (

        <View style={styles.container}>
            <Text>비플러스 홈 화면입니다.</Text>
        </View>

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