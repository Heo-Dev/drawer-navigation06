import React, {useState, useContext, useEffect, useCallback, createRef, useMemo } from "react";
import {StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Button, SectionList} from "react-native";
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetTextInput, } from "@gorhom/bottom-sheet";

import DatePicker from 'react-native-date-picker'
import MonthPicker, { ACTION_DATE_SET, ACTION_DISMISSED, ACTION_NEUTRAL } from 'react-native-month-year-picker';

import moment from 'moment';
import Ionicons from "react-native-vector-icons/Ionicons";

// context
import {AuthContext } from "../context/AuthContext";

// javascript comm 모듈
import axiosGet from "../Network/axiosGet";

// component
import VirtualAccount from "./VirtualAccount";
import RealAccount from "./RealAccount";
import VirtualAccountBalance from "./VirtualAccountBalance";
import TradInfo from "./TradInfo";

const getInquiryString = (inquiryTp, inquiryYear, inquiryMonth, inquiryFromDt, inquiryToDt) => {
    const toDate = new Date();
    switch (inquiryTp) {
        case 1:
            return  '1개월(' +
                    moment(toDate).subtract(1, 'months').format('YYYY-MM-DD') +
                    ' ~ ' +
                    moment(toDate).format('YYYY-MM-DD') +
                    ')';
        case 2:
            return  '3개월(' +
                    moment(toDate).subtract(3, 'months').format('YYYY-MM-DD') +
                    ' ~ ' +
                    moment(toDate).format('YYYY-MM-DD') +
                    ')';
        case 3:
            return  '월별(' +
                    moment(inquiryYear + '-' + inquiryMonth + '-01').startOf('month').format('YYYY-MM-DD') +
                    ' ~ ' +
                    moment(inquiryYear + '-' + inquiryMonth + '-01').endOf('month').format('YYYY-MM-DD') +
                    ')';
                    break;
        case 4:
            return '직접입력(' +
            inquiryFromDt +
            ' ~ ' +
            inquiryToDt +
            ')';                                
            break;
    }
}

const MypageScreen = () => {
    
    const { user, token, navi } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [accountInfo, setAccountInfo]= useState(null);
    const [tradInfo, setTradInfo]= useState(null);

    const [isMonthly, setIsMonthly] = useState(false);
    const [isDirect, setIsDirect] = useState(false);
    const [inquiryTp, setInquiryTp]= useState(1);
    const [inquiryFromDt, setInqueryFromDt]= useState(moment().format('YYYY-MM-DD'));
    const [inquiryToDt, setInqueryToDt]= useState(moment().format('YYYY-MM-DD'));
    const [inquiryYear, setInqueryYear]= useState(moment().format('YYYY'));
    const [inquiryMonth, setInqueryMonth]= useState(moment().format('MM'));
    const [inquiryString, setInquiryString] = useState('');
    // var inquiryString = getInquiryString(inquiryTp, inquiryYear, inquiryMonth, inquiryFromDt, inquiryToDt);
    // var inquiryString = '';


    useEffect ( () => {
        
        setInquiryString(getInquiryString(inquiryTp, inquiryYear, inquiryMonth, inquiryFromDt, inquiryToDt));
        
    }, [inquiryTp, inquiryFromDt, inquiryToDt, inquiryYear, inquiryMonth]);
    
    
    useEffect (() => {
        
        const fetachData = async () => {
            try { 
                data1 = await axiosGet(token, "/mypage/getAccountInfo");
                setAccountInfo(data1);    
                // console.log('accountInfo : ', data1.result_msg);
                setIsLoading(false);
                
            }catch(error){
                console.log('axiosGet error : ', error)
            }

            getSeyfertList();
                            
        }
        fetachData();
        
    }, []);

    const getSeyfertList = useCallback( async () => {
        try {
            const param = {
                inquiry_tp: parseInt(inquiryTp),
                inquiry_year: parseInt(inquiryYear),
                inquiry_month: parseInt(inquiryMonth),
                inquiry_from_dt: inquiryFromDt,
                inquiry_to_dt: inquiryToDt
            };
            data2 = await axiosGet(token, "/mypage/getSeyfertList", param);
            setTradInfo(data2);                
            // console.log('tradInfo : ', data2.data );
            setIsLoading2(false);
            
        } catch(error){
            console.log('axiosGet error : ', error)
        } 
    });
    
    
    const bottomSheetModalRef = createRef(); 
    const snapPoints = useMemo( () => ['45%', '45%'], []);

    const handleSheetOpen = useCallback(index => {

        bottomSheetModalRef.current?.present(0);
    });
    
    const handleSheetInquiry = useCallback(index => {
        
        bottomSheetModalRef.current?.close();
        setIsLoading2(true);
        getSeyfertList();        
    })

    const handleSheetClose = useCallback(index => {

        bottomSheetModalRef.current?.close();
    })
    
    const renderBackdrop = useCallback( (props: any) => {
        
        <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props} />
    
    }, []);
    

    const selectTp1 = useCallback( () => {
        setInquiryTp(1);
        setIsMonthly(false);
        setIsDirect(false);
    }, []);
    const selectTp2 = useCallback( () => {
        setInquiryTp(2);
        setIsMonthly(false);
        setIsDirect(false);
    }, []);
    
    const selectTp3 = useCallback (() => {
        setInquiryTp(3);
        setIsMonthly(true);
        setIsDirect(false);
    }, []);
    
    const selectTp4 = useCallback( () => {
        setInquiryTp(4);
        setIsMonthly(false);
        setIsDirect(true);
    }, []);


    // year-month picker
    const [yearMonthPicker, setYearMonthPicker] = useState(false);
    const onYearMonthChange = useCallback((event, newDate) => {
            setYearMonthPicker(false);
        
            setInqueryYear(moment(newDate).format('YYYY'));
            setInqueryMonth(moment(newDate).format('MM'));
            console.log('yearmonth selected = ', inquiryYear, inquiryMonth);
            
    }, [yearMonthPicker]);


    // DatePicker
    const [startDatePickerOpen, setStartDatePickerOpen] = useState(false);
    const [endDatePickerOpen, setEndDatePickerOpen] = useState(false);
    const selectStartDate = useCallback( (date) => {
        setStartDatePickerOpen(false);
        
        setInqueryFromDt(moment(date).format('YYYY-MM-DD'));
        console.log("조회 시작일 = ", moment(date).format('YYYY-MM-DD'));
    }, []);
    
    const selectEndDate = useCallback( (date) => {
        setEndDatePickerOpen(false);

        setInqueryToDt(moment(date).format('YYYY-MM-DD'));
        console.log("조회 종료일 = ", moment(date).format('YYYY-MM-DD'));
    }, []);


    if (!isLoading && !isLoading2) {
        
        return (

        <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
                
                <View style={styles.container}>

                    <Text style={styles.container_title}>{user.name}님 계좌정보</Text>
                    
                    <ScrollView>

                    <View style={{  backgroundColor: '#fff', 
                                    width: '100%', 
                                    marginRight: 20,
                                }}>
                        
                    {/* 가상계좌 정보 */}
                    <VirtualAccount virtual_account = { accountInfo.data.virtual_acct[0] } />

                    {/* 실계좌 정보 */}
                    <RealAccount real_account = { accountInfo.data.real_acct[0] } />
                        
                    {/* 가상계좌 잔액 */}
                    <VirtualAccountBalance virtual_account_balance = { accountInfo.data } />

                    </View>

                    <View style={{width: '100%', alignItems: 'flex-end', backgroundColor: '#eee'}}>
                        <View style={{flexDirection: "row", padding: 5, marginRight: 10, alignItems: 'center'}}>
                            <Text style={{marginRight: 10, alignItems: 'center'}} onPress={handleSheetOpen}>{inquiryString}</Text>
                            <Ionicons name="search-outline" size={16} onPress={handleSheetOpen}/>
                        </View>
                    </View>

                    {/* 가상계좌 입출금내역 */}
                    <TradInfo trad_info = { tradInfo.data.trad_list } />

                    
                    <BottomSheetModal ref={bottomSheetModalRef}
                                        index={0}
                                        snapPoints={snapPoints}
                                        enablePanDownToClose={true}
                                        // backdropComponent={renderBackdrop}
                                        backdropComponent={(backdropProps) => (
                                            <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
                                          )}
                                        initialSnap={0}
                                        backgroundStyle={{ borderRadius: 30, backgroundColor: '#fff'}}
                                        enabledGestureInteraction={true}
                                        handleIndicatorStyle={{ backgroundColor: '#111'}}
                                        >   

                        <View>
                            <Text style={{textAlign: 'left', margin: 20, fontSize: 20,}}>조회기간</Text>
                            <View style={styles.inquery_term_header}>
                                <Text style={[styles.inquery_term, inquiryTp == 1 ? styles.selectBtn : styles.unSelectBtn ]} onPress={selectTp1}>1개월</Text>                             
                                <Text style={[styles.inquery_term, inquiryTp == 2 ? styles.selectBtn : styles.unSelectBtn ]} onPress={selectTp2}>3개월</Text>                             
                                <Text style={[styles.inquery_term, inquiryTp == 3 ? styles.selectBtn : styles.unSelectBtn ]} onPress={selectTp3}>월별</Text>                             
                                <Text style={[styles.inquery_term, inquiryTp == 4 ? styles.selectBtn : styles.unSelectBtn ]} onPress={selectTp4}>직접입력</Text>                             
                            </View>
                                        
                            {/* 월별 등록 */}
                            <View style={[styles.monthly, (!isMonthly ? styles.visible : styles.unVisible)]}>
                                <View style={styles.monthly_date}>
                                    <Text onPress={() => setYearMonthPicker(!yearMonthPicker)}>{inquiryYear}년 {inquiryMonth}월</Text>
                                    <Ionicons onPress={() => setYearMonthPicker(!yearMonthPicker)} name="calendar-outline" size={16} style={{marginHorizontal: 10,}}/>
                                </View>    
                            </View>

                            {/* 직접입력 */}
                            <View style={[styles.direct, (!isDirect ? styles.visible : styles.unVisible)]} >      
                                <View style={styles.direct_date} >                                    
                                    <Text onPress={()=> setStartDatePickerOpen(!startDatePickerOpen)}>{inquiryFromDt}</Text>
                                    <Ionicons onPress={()=> setStartDatePickerOpen(!startDatePickerOpen)} name="calendar-outline" size={16} style={{marginHorizontal: 10,}} />
                                </View>

                                <View><Text style={{marginTop: 12, marginHorizontal: 10,}}>~</Text></View>
                                
                                <View style={styles.direct_date} >
                                    <Text onPress={()=> setEndDatePickerOpen(!endDatePickerOpen)} >{inquiryToDt}</Text>
                                    <Ionicons onPress={()=> setEndDatePickerOpen(!endDatePickerOpen)} name="calendar-outline" size={16} style={{marginHorizontal: 10,}} />
                                </View>
                            </View>
                            
                        </View>
                        

                        <View style={{flex: 1, flexDirection: 'row', margin: 10, marginHorizontal: 10, marginVertical: 30, justifyContent: 'space-between'}}>
                            <View style={{ flex: 0.5, height: 40, marginHorizontal: 4, }}>
                                <Button style={styles.inquiry_button} title='조회' onPress={handleSheetInquiry} />
                            </View>
                            <View style={{ flex: 0.5, height: 40, marginHorizontal: 4,}}>
                                <Button style={styles.inquiry_button} title='취소' onPress={handleSheetClose} />
                            </View>
                        </View>

                        <View style={{backgroundColor: '#eee'}}>
                            <DatePicker
                                modal
                                open={startDatePickerOpen}
                                date={new Date()}
                                onConfirm={(date) => {
                                    selectStartDate(date);
                                }}
                                onCancel={() => {
                                    setStartDatePickerOpen(!startDatePickerOpen)
                                }}
                                locale='ko'
                                mode='date'
                                title='조회 시작일'
                                confirmText='확인'
                                cancelText='취소'
                                />
                        </View>

                        <View style={{backgroundColor: '#eee'}}>
                            <DatePicker
                                modal
                                open={endDatePickerOpen}
                                date={new Date()}
                                onConfirm={(date) => {
                                    selectEndDate(date);
                                }}
                                onCancel={() => {
                                    setEndDatePickerOpen(!endDatePickerOpen)
                                }}
                                locale='ko'
                                mode='date'
                                title='조회 종료일'
                                confirmText='확인'
                                cancelText='취소'
                                />
                        </View>


                        <View style={{backgroundColor: '#eee'}}>
                            {yearMonthPicker && (
                                <MonthPicker    onChange={onYearMonthChange}
                                                value={new Date()}
                                                // locale="ko"
                                                mode='number'
                                                okButton="확인"
                                                cancelButton="취소"
                                                // minimumDate={new Date()}
                                                // maximumDate={new Date(2025, 5)}
                                />  
                            )}
                        </View>

                    </BottomSheetModal>

                    </ScrollView>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
        );
    }
};

export default MypageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingHorizontal: 10,
        width: '100%',
    },
    container_title: {
        fontSize: 18, 
        fontWeight: 'bold',
        marginVertical: 20,
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

    inquery_term_header: {
        flex: 1, 
        flexDirection: "row", 
        marginBottom: 40, 
        marginHorizontal: 10,
        justifyContent: "space-between",
    },

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
});