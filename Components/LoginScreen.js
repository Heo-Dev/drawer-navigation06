import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../context/AuthContext";
import axiosPost from "../Network/axiosPost";

const LoginScreen = () => {

    const { navigation } = useNavigation();
    const [isLoading, setLoading] = useState(true);

    const [email, setEmail] = useState('stup2027@benefitplus.kr');
    const [password, setPassword] = useState('hsho!@#42');

    const { isLogin, setIsLogin, user, setUser, token, setToken, navi } = useContext(AuthContext);
    
    const handleEmailChange = (text) => {
        setEmail(text);
    };
    
    const handlePasswordChange = (text) => {
        setPassword(text);
    };
    
    const handleSubmit = async () => {

        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('경고', '이메일과 비밀번호를 모두 입력하세요.');
            return;
        }

        const data = {
            'email': email,
            'password': password,
        };      


        // axiosInstance 처리
        const login = await axiosPost("/user/login", data);
        setIsLogin(true);
        setUser(login.data.user);
        setToken(login.data.token);
        navi.navigate('Home');

        /******************************************************************
        try {
            
            const response = await axiosInstance.post("/user/login", {
                email,
                password
            });

            if (response.status == 200) {
                console.log ('3. response = ', response.data);
            }
            
        } catch (error) {
            console.log('Error catched : ', error);
        }

        // fetch 처리
        try{
            const apiUrl = 'http://stg.benefitplus.kr/api/user/login';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            console.log ('3. response = ', json);
            
        } catch (error) {
            console.log('Error catched : ', error);
        }
        ***************************************************************/
    };


    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, marginBottom: 20,}}>비플러스 로그인</Text>
            <View style={{width: '100%', padding: '15%',}}>
                <Text style={styles.input_label}>이메일</Text>
                <TextInput  placeholder="Enter your email"
                            onChangeText={handleEmailChange}
                            value={email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCompleteType="email"
                            autoCorrect={false}
                            style={styles.input_box}/>

                <Text style={styles.input_label}>비밀번호</Text>     
                <TextInput  placeholder="Enter your password"
                            onChangeText={handlePasswordChange}
                            value={password}
                            secureTextEntry={true}                  // 비밀번호 입력으로 설정
                            autoCapitalize="none"
                            autoCompleteType="password"
                            autoCorrect={false}
                            style={styles.input_box}/>

                <TouchableOpacity onPress={handleSubmit}  style={styles.input_btn} >
                    <Text style={styles.input_btn_text}>로그인</Text>
                </TouchableOpacity>

            </View>

            <Text style={{fontSize: 20, marginBottom: 20,}}></Text>
 

        </View>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center", 
    },
    input_btn: {
        backgroundColor: '#ebb600',
        borderRadius: 4,
        width: '100%', 
        marginTop: 10,
        alignItems: 'center',
        height: 40,
    },
    input_btn_text: {
        padding: 10,
        color: '#fff',
    },
    input_label: {
        margin: 10,
    },
    input_box: {
        width: '100%', 
        marginBottom: 20, 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingTop: 5, 
        paddingBottom: 5, 
        borderWidth: 1,
        borderColor: '#ddd'
    }
});