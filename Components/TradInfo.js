import React, { useCallback, createRef, useMemo } from "react";
import {StyleSheet, Text, View, FlatList} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";



// 공통모듈
import {numberFormat, showAlert} from '../comm_module';


const TradInfo = (props) => {

    if (Array.isArray(props.trad_info[""])) {
        return (
            <View>
                <Text style={{textAlign: 'center', marginVertical: 30, }}>해당기간 조회 결과가 없습니다.</Text>
            </View>
        );
    };

    // const ListHeader = () => {
    //     return <Text style={{fontSize: 20, textAlign: 'center', backgroundColor: '#fff'}}>FlatList Header sample</Text>
    // }

    return (

        <View style={{width: '100%', marginTop: 20,}}>
            <FlatList
                data={Object.keys(props.trad_info)}
                renderItem={({ item }) => (
                    <View>
                        <View style={{marginHorizontal: 10, borderColor: '#ddd', borderBottomWidth: 1, marginBottom: 10,}}>

                        <Text style={{  justifyContent: 'flex-start', 
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        marginBottom:8,}}>{item}</Text>
                        </View>
                        <FlatList
                            data={props.trad_info[item] }
                            renderItem={({ item }) => (
                                <View style={{marginBottom: 25,}}>
                                <View style={{width: '100%', paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{  marginRight: 10,
                                                        color: '#777',
                                                        fontSize: 12,}}>{item.trad_time }</Text>
                                        <Text style={{fontSize: 12,}}>{item.rmrk}</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize: 12, color: (item.trad_tp == '입금' ? '#eb7100' : '#599dec')}}>{item.trad_tp }</Text>
                                    </View>
                                </View>
                                <View style={{width: '100%', paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{fontSize: 12, fontWeight: 'bold'}}>{item.title }</Text>
                                    <Text style={{fontSize: 12, fontWeight: 'bold', color: (item.trad_tp == '입금' ? '#eb7100' : '#599dec')}}>{numberFormat(item.trad_amt) }</Text>
                                </View>
                                <View style={{width: '100%', paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Text style={{fontSize: 12, fontWeight: 'bold', color: '#999'}}>{numberFormat(item.balance) }</Text>
                                </View>
                            </View>
                            )}
                            keyExtractor={item => item.tid}
                        />
                    </View>
                )}
                keyExtractor={date => date}
                // ListHeaderComponent={<ListHeader />}
                // stickyHeaderIndices={[0]}
            />
        </View>
    );
}

export default TradInfo;

const styles = StyleSheet.create({

    inquery_term: {
        flex: 0.25, 
        paddingVertical:5,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#444',
        borderWidth: 1,
        borderStyle: 'solid',
        marginHorizontal: 4,
        height: 36,
        textAlign: 'center',
    },

    monthly: {
        display: 'none',
        marginHorizontal: 20,
        marginTop: 20,
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: 'solid'
    },
      
    monthly_date: {
        padding: 10, 
        flexDirection: "row",
        alignItems: 'center',
    },
      
    direct: {
        display: 'none',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20,
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: 'solid'
    },
    
    direct_date: {
        padding: 10, 
        flexDirection: "row",
        alignItems: 'center',
    },

    selectBtn: {
        backgroundColor: '#ffdb59',
        borderColor: '#ffdb59',
    },

    unSelectBtn: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
    },
    visible: {
        flex: 1,
    },
    unVisible: {
        display: 'none,'
    },

    inquiry_button: {
        flex: 0.5,
        margin: 10,
        height: 40,
    },

});