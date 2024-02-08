import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { AuthContext } from "../context/AuthContext";
import axiosGet from "../Network/axiosGet";
import Ionicons from "react-native-vector-icons/Ionicons";

const MypageScreen = () => {
    
    const { user, token, navi } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [verifyInfo, setVerifyInfo]= useState(null);
    const [accountInfo, setAccountInfo]= useState(null);
    
    useEffect (() => {

        const fetchData = async () => {
            try {
                const data = await axiosGet(token, "/mypage/getAccountInfo");
                setAccountInfo(data);
            }catch(error){
                console.error('Error fetching data : ', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
        
    }, []);
    console.log('isLoading stat1 = ',  isLoading);
    
    
    // const acctInfo = await axiosGet(token, "/mypage/getVerifyInfo");
    const handleSubmit = async () => {
        // const verifyInfo = await axiosGet(token, "/mypage/getVerifyInfo");
        
        console.log('verifyInfo = ', verifyInfo);
        console.log('isLoading stat2 = ',  isLoading);
    };

    const numberFormat = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleOption = () => {
        console.log ('Bottom sheet를 나오게 한다.');
    }

    if (isLoading){
        <View style={styles.container}>
            <Text style={{fontSize: 16, fontWeight: 700, }}>{user.name}님 마이페이지</Text>

            <TouchableOpacity onPress={handleSubmit}  style={styles.input_btn} >
                    <Text style={styles.input_btn_text}>데이타 가져오기</Text>
            </TouchableOpacity>

        </View>
    }else {
        console.log('verifyInfo = ', accountInfo.data);
        return (
            
            <View style={styles.container}>
                <Text style={styles.container_title}>{user.name}님 계좌정보</Text>

                <View style={{  backgroundColor: '#fff', 
                                width: '100%', 
                                marginLeft: 20,
                                marginRight: 20,
                            }}>

                    <View style={styles.section}>
                        <Text style={styles.section_title}>비플러스 가상계좌</Text>

                        <View style={styles.text_row }>
                            <Text style= { styles.text_title }>은행명</Text>
                            <Text style= { styles.text_content}>{accountInfo.data.virtual_acct[0].bank_name}</Text>
                        </View>
                        <View style={styles.text_row }>
                            <Text style= { styles.text_title }>예금주</Text>
                            <Text style= { styles.text_content}>{accountInfo.data.virtual_acct[0].customer_name}</Text>
                        </View>
                        <View style={styles.text_row }>
                            <Text style= { styles.text_title }>계좌번호</Text>
                            <Text style= { styles.text_content}>{accountInfo.data.virtual_acct[0].account_number}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.section_title}>출금계좌</Text>

                        <View style={styles.text_row }>
                            <Text style= { styles.text_title }>은행명</Text>
                            <Text style= { styles.text_content}>{accountInfo.data.real_acct[0].bankNm}</Text>
                        </View>
                        <View style={styles.text_row }>
                            <Text style= { styles.text_title }>예금주</Text>
                            <Text style= { styles.text_content}>{accountInfo.data.real_acct[0].acctNm}</Text>
                        </View>
                        <View style={styles.text_row }>
                            <Text style= { styles.text_title }>계좌번호</Text>
                            <Text style= { styles.text_content}>{accountInfo.data.real_acct[0].acctNo}</Text>
                        </View>
                    </View>
                    
                    <View style={{ marginTop: 20, paddingLeft: 10, flexDirection: "row", marginBottom: 20, }}>
                        <Text style= {{ width: '30%',
                                        borderColor: '#333',
                                        padding: 4,
                                        fontWeight: "bold",
                                    }}>가상계좌 잔고</Text>
                        <Text style= {{ width: '30%',
                                        borderColor: '#333',
                                        padding: 4,}}>{numberFormat(accountInfo.data.balance)} 원</Text>
                    </View>

                    <View style={{width: '100%', backgroundColor: '#eee', alignItems: 'flex-end', }} >
                        <View style={{flexDirection: "row", padding: 5, marginRight: 10, }} >
                            <Text style={{marginRight: 10, }} onPress={handleOption}>1개월 (2024/01/06 ~ 2024/02/06)</Text>
                            <Ionicons name="chevron-down-outline" size={20} />
                        </View>
                    </View>
                </View>



            </View>
        );
    }
};

export default MypageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    container_title: {
        fontSize: 16, 
    },
    section: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        paddingLeft: 10,
    },
    section_title: {
        marginTop: 20,
        padding: 4,
        fontSize: 14, 
        textAlign: 'left',
        fontWeight: "bold",
    },
    text_row: {
        flexDirection: "row", 
        height: 32,
        height: '10px',
        width: '100%',
    },
    text_title: {
        width: '30%',
        // borderColor: '#333',
        // backgroundColor: '#eee',
        padding: 4,
    },
    text_content: {
        padding: 4,
        borderColor: '#000',
        fontSize: 14,
    },
    input_btn: {
        backgroundColor: '#ebb600',
        borderRadius: 4,
        width: '50%', 
        marginTop: 10,
        alignItems: 'center',
        height: 40,
    },
    input_btn_text: {
        padding: 10,
        color: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});