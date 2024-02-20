import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// 공통모듈
import {numberFormat, showAlert} from '../comm_module';


const VirtualAccountBalance = (props) => {

    return (
        <View style={{marginTop: 20, paddingLeft: 10,  marginBottom: 20, flexDirection: "row", justifyContent: 'space-between'}}>
            <View style={{flexDirection: "row", width: '75%'}}>
                <Text style= {{ width: '40%',
                                borderColor: '#333',
                                padding: 4,
                                fontWeight: "bold",
                            }}>가상계좌 잔고</Text>
                            
                <Text style= {{ width: '30%',
                                borderColor: '#333',
                                padding: 4,}}>{numberFormat(props.virtual_account_balance.balance)} 원</Text>
            </View>
            <View style={styles.btn_style}>
                <Ionicons name="wallet-outline" size={16} />
                <Text style={styles.btn_text} 
                      onPress={() => showAlert('info', '출금은 아직 구현되지 않았습니다.')}>출금</Text>
            </View>
        </View>
    );
}

export default VirtualAccountBalance;

const styles = StyleSheet.create({
    btn_style: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#ffdb59',
        textAlign: "center",
        alignItems: 'center',
        paddingHorizontal: 8,
        borderRadius: 4,         
        maxHeight: 36,
        height: 32,
        paddingHorizontal: 15,
    },    
    btn_text: {
        color: '#111', 
        textAlign: 'center',
        marginLeft: 5,
        color: '#333'
    },
});