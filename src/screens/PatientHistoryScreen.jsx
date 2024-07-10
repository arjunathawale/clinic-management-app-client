import { View, StyleSheet, Text, TouchableOpacity, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import moment from 'moment';
import { apiPost } from '../utils/helper';
import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { useSelector } from 'react-redux';

const PatientHistoryScreen = ({ route }) => {
    const navigation = useNavigation();
    const { USER_ID } = useSelector(state => state?.name?.userData)
    const pageSize = 50
    const [pageIndex, setPageIndex] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [patientDetail, setPatientDetail] = useState([]);
    const [patientVisitDetail, setPatientVisitDetail] = useState([]);


    const getUserInfo = async () => {
        try {
            setLoadingMore(true)
            const PATIENT_ID = await route.params.data.ID
            const res = await apiPost("api/patient/getPatientDetails", {
                PATIENT_ID: PATIENT_ID
            });
            const resVisit = await apiPost("api/patientVisitLogs/get", {
                filter: ` AND PATIENT_ID = ` + PATIENT_ID,
                pageSize,
                pageIndex,
                sortKey: "VISIT_DATETIME"
            });
            if (res && res.statusCode === 200) {
                await setPatientDetail(res.personalDetails)
            }
            if (resVisit && resVisit.statusCode === 200) {
                await setPatientVisitDetail(resVisit.data)
            }

            setLoadingMore(false)
        } catch (error) {
            console.log(error);
        }
    };


    useFocusEffect(useCallback(() => {
        getUserInfo()
    }, []))

    const getMoreVisitLog = async () => {
        try {
            setLoadingMore(true)
            const PATIENT_ID = await route.params.data.ID
            const resVisit = await apiPost("api/patientVisitLogs/get", {
                filter: ` AND PATIENT_ID = ` + PATIENT_ID,
                pageSize,
                pageIndex: pageIndex + 1,
                sortKey: "VISIT_DATETIME"
            });

            if (resVisit && resVisit.statusCode === 200) {
                if (resVisit.data.length > 0) {
                    await setPatientVisitDetail(prevData => [...prevData, ...resVisit.data])
                    await setPageIndex(prevPageIndex => prevPageIndex + 1);
                }
            }
            setLoadingMore(false)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <View style={styles.main}>
                <StatusBar backgroundColor='#E6F4FE' barStyle="dark-content" />
                <View style={styles.mainContent} >
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen', {})}>
                        <Feather name="chevron-left" size={33} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.text}>Patient History</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('InputFormScreen', {
                        data: {
                            ID: patientDetail[0]?.ID,
                            PATIENT_NAME: patientDetail[0]?.PATIENT_NAME,
                            ADDRESS: patientDetail[0]?.ADDRESS,
                            MOBILE_NO: patientDetail[0]?.MOBILE_NO,
                            DUE_AMOUNT: patientDetail[0]?.DUE_AMOUNT
                        }
                    })}>
                        {
                            patientDetail[0]?.DOCTOR_ID == USER_ID && <AntDesign name="plus" size={33} color="#000" />
                        }

                    </TouchableOpacity>

                </View>
                <View style={styles.container}>
                    <View style={styles.profileDetail}>
                        {
                            patientDetail.length > 0 ?
                                <>
                                    <View style={styles.div1}>
                                        <Text style={{ fontSize: 14.5, fontFamily: "Poppins-Bold", color: "black" }}>{patientDetail[0]?.PATIENT_NAME}</Text>
                                        <Text style={{ fontSize: 14.5, fontFamily: "Poppins-Medium", color: "black" }}>{patientDetail[0]?.MOBILE_NO}</Text>
                                        <Text style={{ fontSize: 14.5, fontFamily: "Poppins-Medium", color: "black" }}>{patientDetail[0]?.ADDRESS}</Text>
                                        <Text style={{ fontSize: 14.5, fontFamily: "Poppins-Medium", color: "black" }}>First Visit:- {moment(patientDetail[0]?.FIRST_VISITDATETIME).format("ll")}</Text>
                                        <Text style={{ fontSize: 14.5, fontFamily: "Poppins-Medium", color: "black" }}>Last Visit:- {moment(patientDetail[0]?.LAST_VISITDATETIME).format("ll")}</Text>
                                    </View>
                                    <View style={styles.div2}>
                                        <Text style={{ fontSize: 15, fontFamily: "Poppins-Medium", color: "black" }}>Total ₹.<Text style={{ fontSize: 16, fontFamily: "Poppins-Bold", color: "black" }}> {patientDetail[0]?.TOTAL_AMOUNT}</Text></Text>
                                        <Text style={{ fontSize: 15, fontFamily: "Poppins-Medium", color: "black" }}>Paid ₹.<Text style={{ fontSize: 16, fontFamily: "Poppins-Bold", color: "black" }}> {patientDetail[0]?.PAID_AMOUNT}</Text></Text>
                                        <Text style={{ fontSize: 15, fontFamily: "Poppins-Medium", color: "black" }}>Dues ₹.<Text style={{ fontSize: 16, fontFamily: "Poppins-Bold", color: "black" }}> {patientDetail[0]?.DUE_AMOUNT}</Text></Text>
                                        <Text style={{ fontSize: 15, fontFamily: "Poppins-Medium", color: "black" }}>Visited <Text style={{ fontSize: 16, fontFamily: "Poppins-Bold", color: "black" }}>{patientDetail[0]?.VISITED_COUNT}</Text></Text>

                                    </View>

                                </> : <ActivityIndicator size="large" color="#0EC2DB" style={{ position: "absolute", top: "38%", left: "45%" }} />
                        }

                    </View>
                </View>

                <Text style={styles.subtext}>Visit History</Text>
                <FlatList
                    data={patientVisitDetail}
                    style={styles.list}
                    // keyExtractor={item => item.ID.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.visitCard} >
                            <Text style={{ fontFamily: "Poppins-Regular", color: "black", fontSize: 15 }}>Visit Time :- <Text style={{ fontFamily: "Poppins-SemiBold", color: "black", fontSize: 15 }}>{moment(item?.VISIT_DATETIME).format("lll")}</Text></Text>
                            <Text style={{ fontFamily: "Poppins-Regular", color: "black", fontSize: 15 }}>Who Visited :- <Text style={{ fontFamily: "Poppins-SemiBold", color: "black", fontSize: 15 }}>{item?.PATIENT_RELATION}</Text></Text>
                            <Text style={{ fontFamily: "Poppins-Regular", color: "black", fontSize: 15 }}>Description :- <Text style={{ fontFamily: "Poppins-SemiBold", color: "black", fontSize: 15 }}>{item?.DESCRIPTION}</Text></Text>

                            <View style={styles.amountSection}>
                                <Text style={styles.amounts1}>{item?.TOTAL_AMOUNT}</Text>
                                <Text style={styles.amounts2}>{item?.PAID_AMOUNT}</Text>
                                <Text style={styles.amounts3}>{item?.TOTAL_AMOUNT - item?.PAID_AMOUNT < 0 ? "D-P" : ""} {item?.TOTAL_AMOUNT - item?.PAID_AMOUNT < 0 ? Math.abs(item?.TOTAL_AMOUNT - item?.PAID_AMOUNT) : item?.TOTAL_AMOUNT - item?.PAID_AMOUNT}</Text>
                            </View>
                        </View>
                    )}

                    onEndReached={
                        getMoreVisitLog
                    }
                    onEndReachedThreshold={0.1}
                />
                {
                    loadingMore && <ActivityIndicator size="small" color="#0EC2DB" style={{ bottom: 20, position: "absolute", left: "50%" }} />
                }
            </View>
        </>

    );
};

const styles = StyleSheet.create({
    main: {
        paddingTop: 10,
        paddingRight: 18,
        paddingLeft: 15,
        backgroundColor: "#E6F4FE",
        flex: 1,


    },
    mainContent: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
    amountSection: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },

    container: {
        // position: "relative",
        // justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        // height: 715,
        backgroundColor: "#E6F4FE"
    },
    text: {
        fontSize: 25,
        fontFamily: "Poppins-SemiBold",
        color: "black",
        margin: 7,
        marginLeft: 10
    },
    subtext: {
        fontSize: 20,
        fontFamily: "Poppins-Medium",
        color: "black",
        margin: 7,
        marginLeft: 10,
        letterSpacing: 1,
        marginBottom: 0
    },
    profileDetail: {
        backgroundColor: "#F0F6F6",
        width: "95%",
        height: 140,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 2,

        justifyContent: "space-between",
        flexDirection: "row",

        // alignItems: "center",
        // alignContent: "center",
    },
    div1: {
        // backgroundColor: "red",
        width: '60%',
        height: "100%",
        paddingVertical: 7,
        paddingLeft: 9
    },
    div2: {
        // backgroundColor: "blue",
        width: '40%',
        height: "100%",
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    visitCard: {
        // height: 130,
        flex: 1,
        backgroundColor: "#F0F6F6",
        marginVertical: 5,
        marginHorizontal: 8,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0.1
        },
        shadowOpacity: 0.3,
        elevation: 2,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    scrollView: {
        // minHeight: 300,
        backgroundColor: "gray",
        marginHorizontal: 8,

    },
    amounts1: {
        width: 50,
        height: 30,
        // color: "red",
        fontSize: 16,
        color: "black",
        paddingHorizontal: 5,
        paddingVertical: 5,
        textAlign: "center",
        backgroundColor: "#FDF306",
        borderRadius: 10
    },
    amounts2: {
        width: 50,
        height: 30,
        // color: "red",
        fontSize: 16,
        color: "black",
        paddingHorizontal: 5,
        paddingVertical: 5,
        textAlign: "center",
        backgroundColor: "#0BFD06",
        borderRadius: 10
    },
    amounts3: {
        width: 100,
        height: 30,
        // color: "red",
        fontSize: 16,
        color: "#fff",
        paddingHorizontal: 5,
        paddingVertical: 5,
        // marginVertical:5,
        textAlign: "center",
        backgroundColor: "#FD0606",
        borderRadius: 10
    }



});

export default PatientHistoryScreen;
