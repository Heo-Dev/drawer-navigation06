import {View,
        Text,
        ImageBackground,
        Image,
        TouchableOpacity,
        StyleSheet,
        Switch,
        Button,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import {createDrawerNavigator, 
        DrawerContentScrollView, 
        DrawerItemList, 
        DrawerItem } from '@react-navigation/drawer';
import {createStackNavigator } from '@react-navigation/stack';
import {useNavigation } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";


// 컴포넌트
import HomeScreen from '../Components/HomeScreen';
import InvestScreen from '../Components/InvestScreen';
import AboutScreen from '../Components/AboutScreen';
import LoginScreen from '../Components/LoginScreen';
import RegistScreen from '../Components/RegistScreen';
import MypageScreen from '../Components/MypageScreen';

import BplusHeader from '../Components/BplusHeader';
import { AuthContext } from "../context/AuthContext";

const CustomDrawerContent = ({ ...props }) => {
    const { navigation } = props;
    const { isLogin, setIsLogin, user, token, navi, setNavi, } = useContext(AuthContext);

    useEffect(() => {
        console.log ('앱 실행 시 한번만 실행');
        setNavi(navigation);
    }, []);

    const CustomDrawerHeader = isLogin ? () => (
        <>
            <TouchableOpacity onPress={() => navigation.navigate('Mypage')} style={styles.buttonStyle} >
                <Ionicons name="stats-chart-outline" size={22} />
                <Text style={styles.buttonText}>마이페이지</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {setIsLogin(false);
                                              navigation.navigate('Home')}
                                      } style={styles.buttonStyle} >
                <Ionicons name="log-out-outline" size={22} />
                <Text style={styles.buttonText}>로그아웃</Text>
            </TouchableOpacity>
        </>

    ) : () => (
        <>
            <TouchableOpacity onPress={() => {navigation.navigate('Login')}
                                      } style={styles.buttonStyle} >
                <Ionicons name="log-in-outline" size={22} />
                <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Regist')} style={styles.buttonStyle} >
                <Ionicons name="person-add-outline" size={22} />
                <Text style={styles.buttonText}>회원가입</Text>
            </TouchableOpacity>
        </>
    );
    
    return (
        <>
            <DrawerContentScrollView>
                <View>
                            
                    <View style={styles.drawer_header}>

                        <TouchableOpacity onPress={() => navigation.closeDrawer()} >
                            <Ionicons name="close-outline" size={32} style={styles.close_icon} />
                        </TouchableOpacity>

                        <Image source={require("../assets/logo-set.png")} style={styles.drawer_logo} />
                    </View>


                    <View style={{ flex: 1, flexDirection: "row", marginTop: 10, padding: 10,}}>

                        <CustomDrawerHeader />

                    </View>
                </View>

                <DrawerItems />
            </DrawerContentScrollView>
        </>
    );
};




const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


// Drawer Menu에 나오는 아이템 등록
const DrawerList = [
    {icon: 'home-outline', label: '비플러스', navigateTo: 'Home'},
    {icon: 'calculator-outline', label: '투자하기', navigateTo: 'Invest'},
    {icon: 'help-buoy-outline', label: '고객센터', navigateTo: 'About'},
];

const DrawerItems = props => {
    return DrawerList.map((eL, i) => {
        return (
            <DrawerLayout   key={i}
                            icon={eL.icon}
                            color={'#333'}
                            size={20}
                            label={eL.label}
                            navigateTo={eL.navigateTo}
            />
        )
    });
}

const DrawerLayout = ({icon, color, size, label, navigateTo}) => {
    const navigation = useNavigation();
    return (
        <DrawerItem icon={() => <Ionicons name={icon} color={color} size={size} />}
                    label={label}
                    onPress={() => {navigation.navigate(navigateTo)}}
                    labelStyle={{ marginLeft: -16 }}
        />
    );
};

const StackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Invest' component={InvestScreen} />
        <Stack.Screen name='About' component={AboutScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Regist' component={RegistScreen} />
        <Stack.Screen name='Mypage' component={MypageScreen} />
    </Stack.Navigator>
);

const DrawerNavigator = () => (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        
        <Drawer.Screen  name='Home' 
                        component={HomeScreen}  
                        options={{  headerShown: true, 
                                    headerTitle: () => <BplusHeader />  }} />

        <Drawer.Screen  name="Invest" 
                        component={InvestScreen} 
                        options={{  headerShown: true, 
                                    headerTitle: () => <BplusHeader /> }} />

        <Drawer.Screen  name='About' 
                        component={AboutScreen} 
                        options={{  headerShown: true, 
                                    headerTitle: () => <BplusHeader /> }} />
        <Drawer.Screen  name="Login" 
                        component={LoginScreen} 
                        options={{  headerShown: true, 
                                    headerTitle: () => <BplusHeader /> }} />
        <Drawer.Screen  name="Regist" 
                        component={RegistScreen}
                        options={{  headerShown: true, 
                                    headerTitle: () => <BplusHeader /> }} />
        <Drawer.Screen  name="Mypage" 
                        component={MypageScreen}
                        options={{  headerShown: true, 
                                    headerTitle: () => <BplusHeader /> }} />
        <Drawer.Screen  name="Drawer" 
                        component={StackNavigator}
                        options={{  headerShown: true, 
                                    headerTitle: () => <BplusHeader /> }} />
    </Drawer.Navigator>
);

export default DrawerNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
        maxWidth: '60%',
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
    drawer_header: {
        flex: 1, 
        marginTop: 5,
        flexDirection: "row", 
        justifyContent: "start", 
        alignItems: 'center',
        marginLeft: -20,
    },
    drawer_logo: {
        flex: 1,
        height: 32,
        maxWidth: '40%',
        objectFit: 'contain',  
        alignItems: 'center',  
        justifyContent: 'flex-start',
        marginTop: 1,           
    },
    close_icon: {
        marginLeft: 30,
    },
    buttonText: {
        color: '#111', 
        textAlign: 'center',
        marginLeft: 5,
    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
        margin: 5, 
        backgroundColor: '#ffdb59',
        textAlign: "center",
        padding: 10,
        borderRadius: 4,
    },
});
