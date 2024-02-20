import React from 'react';
import { Text, View, StyleSheet} from "react-native";

const RealAccount = (props) => {

    return (
        <View style={styles.section}>
            <Text style={styles.section_title}>출금계좌</Text>

            <View style={styles.text_row }>
                <Text style= { styles.text_title }>은행명</Text>
                <Text style= { styles.text_content}>{props.real_account.bankNm}</Text>
            </View>
            <View style={styles.text_row }>
                <Text style= { styles.text_title }>예금주</Text>
                <Text style= { styles.text_content}>{props.real_account.acctNm}</Text>
            </View>
            <View style={styles.text_row }>
                <Text style= { styles.text_title }>계좌번호</Text>
                <Text style= { styles.text_content}>{props.real_account.acctNo}</Text>
            </View>
        </View>
    );
}

export default RealAccount;

const styles = StyleSheet.create({
    section: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        paddingLeft: 10,
        marginTop: 20,
    },
    section_title: {
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
});