import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiPost } from '../utils/helper';
import { FlatList } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';


const PatientReport = () => {
    const navigation = useNavigation();
    const { USER_ID } = useSelector(state => state?.name.userData)
    const pageSize = 50

    const [pageIndex, setPageIndex] = useState(1);
    const [isFilter, setIsFilter] = useState(false)
    const [search, setSearch] = useState("");

    const [searchData, setSearchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

    const [patient, setPatient] = useState(0);
    const [patientName, setPatientName] = useState("");
    const [fromDate, setFromDate] = useState(moment().format("YYYY-MM-DD"));
    const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));
    const [patientVisitDetail, setPatientVisitDetail] = useState([]);

    const CallSearch = async (event) => {
        setSearch(event)
        try {
            if (event.length >= 3) {
                setIsLoading(true)
                const res = await apiPost("api/patient/get", {
                    filter: ` AND DOCTOR_ID = ` + USER_ID + ` AND PATIENT_NAME LIKE '${event ? "%" + event + "%" : ""}'  `,
                    pageSize,
                    pageIndex: pageIndex,
                    sortKey: "LAST_VISITDATETIME"
                });
                if (res && res.statusCode === 200) {
                    setSearchData(res.data);
                    setIsLoading(false)
                }
            } else if (event == "") {
                setSearchData([]);
            }

        } catch (error) {
            console.log(error);
        }
    };


    const getMoreCallSearch = async () => {
        try {
            setLoadingMore(true)
            const res = await apiPost("api/patient/get", {
                // filter: ` AND PATIENT_NAME LIKE '${event ? "%" + event + "%" : ""}' AND DOCTOR_ID = ` + USER_ID,
                filter: ` AND DOCTOR_ID = ` + USER_ID + ` AND PATIENT_NAME LIKE '${search ? "%" + search + "%" : ""}' `,
                pageSize,
                pageIndex: pageIndex + 1,
                sortKey: "LAST_VISITDATETIME"
            });

            console.log("res", res);

            if (res && res.statusCode === 200) {
                if (res.data.length > 0) {
                    await setSearchData(prevData => [...prevData, ...res.data])
                    await setPageIndex(prevPageIndex => prevPageIndex + 1);
                }
            }
            setLoadingMore(false)

        } catch (error) {
            console.log(error);
        }
    };

    const clearSearch = () => {
        setSearch("")
        setPatientName("")
        setSearchData([])
        setPageIndex(1)
        setPatient(0)
    }



    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showDatePicker2 = () => {
        setDatePickerVisibility2(true);
    };

    const hideDatePicker2 = () => {
        setDatePickerVisibility2(false);
    };

    const handleConfirm = (date) => {
        setFromDate(moment(date).format("YYYY-MM-DD"))
        hideDatePicker();
    };
    const handleConfirmTo = (date) => {
        setToDate(moment(date).format("YYYY-MM-DD"))
        hideDatePicker2();
    };


    const applyFilter = () => {
        getVisitReportInfo()
    };

    const cancelFilter = (date) => {
        console.log("cancelFilter");
    };
    let dateFilter = " AND VISIT_DATETIME BETWEEN " + `'${moment(fromDate).format("YYYY-MM-DD")} 00:00:00'` + " AND " + `'${moment(toDate).format("YYYY-MM-DD")} 23:59:59'`


    const getVisitReportInfo = async () => {
        try {
            setLoadingMore(true)
            setPageIndex(1)

            const resVisit = await apiPost("api/patientVisitLogs/get", {
                // " AND DOCTOR_ID = " + USER_ID + 
                filter: " AND DOCTOR_ID = " + USER_ID + (patient != 0 ? " AND PATIENT_ID = " + patient : "") + dateFilter,
                pageSize,
                pageIndex,
                sortKey: "VISIT_DATETIME"
            });

            if (resVisit && resVisit.statusCode === 200) {
                await setPatientVisitDetail(resVisit.data)
            }
            setLoadingMore(false)

        } catch (error) {
            console.log(error);
        }
    };

    useFocusEffect(useCallback(() => {
        getVisitReportInfo()
    }, []))



    const getMoreVisitLog = async () => {
        try {
            setLoadingMore(true)
            const resVisit = await apiPost("api/patientVisitLogs/get", {
                // " AND DOCTOR_ID = " + USER_ID + 
                filter: " AND DOCTOR_ID = " + USER_ID + (patient != 0 ? " AND PATIENT_ID = " + patient : "") + dateFilter,
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

    const handleDelete = async (data) => {
        try {
            const resDelete = await apiPost("api/patient/deletePatientEntry", {
                DOCTOR_ID: data?.DOCTOR_ID,
                PATIENT_ID: data?.PATIENT_ID,
                ROW_ID: data?.ID,

            });
            if (resDelete && resDelete.statusCode === 200) {
                // ToastAndroid.showWithGravity(
                //     'Successfully Deleted',
                //     ToastAndroid.LONG,
                //     ToastAndroid.BOTTOM,
                // );
                ToastAndroid.show(
                    'Successfully Deleted',
                    ToastAndroid.LONG,
                );
                getVisitReportInfo()

                // const resVisit = await apiPost("api/patientVisitLogs/get", {
                //     // " AND DOCTOR_ID = " + USER_ID + 
                //     filter: " AND DOCTOR_ID = " + USER_ID + (patient != 0 ? " AND PATIENT_ID = " + patient : "") + dateFilter,
                //     pageSize,
                //     pageIndex: pageIndex + 1,
                //     sortKey: "VISIT_DATETIME"
                // });
                // if (resVisit && resVisit.statusCode === 200) {
                //     if (resVisit.data.length > 0) {
                //         await setPatientVisitDetail(prevData => [...prevData, ...resVisit.data])
                //         await setPageIndex(prevPageIndex => prevPageIndex + 1);
                //     }
                // }
                // setLoadingMore(false)
            } else {
                ToastAndroid.show(
                    'Failed to Delete',
                    ToastAndroid.SHORT,
                );
                // ToastAndroid.showWithGravity(
                //     'Failed to Delete',
                //     ToastAndroid.LONG,
                //     ToastAndroid.BOTTOM,
                // );
            }


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainContent} >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={30} color="#000" style={styles.icon1} />
                </TouchableOpacity>
                <Text style={styles.text}>Patient Visit Reports</Text>
                <TouchableOpacity onPress={() => setIsFilter(isFilter ? false : true)}>
                    <AntDesign name="filter" size={33} color="black" style={styles.icon} />
                    {/* <Feather name="home" size={28} color="#ff0c6c" style={styles.icon} /> */}
                </TouchableOpacity>
            </View>
            {
                isFilter &&
                <View>
                    <View style={styles.filterBox}>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible2}
                            mode="date"
                            onConfirm={handleConfirmTo}
                            onCancel={hideDatePicker2}
                        />
                        <View style={styles.boxes}>
                            <Text style={styles.label}>From Date</Text>
                            <Text style={styles.dateBox} onPress={showDatePicker}>
                                {moment(fromDate).format("DD/MM/YYYY")}
                            </Text>
                        </View>
                        <View style={styles.boxes}>
                            <Text style={styles.label}>To Date</Text>
                            <Text style={styles.dateBox} onPress={showDatePicker2}>
                                {moment(toDate).format("DD/MM/YYYY")}
                            </Text>
                        </View>

                    </View>

                    <View style={styles.filterBox1}>
                        <TextInput style={styles.inputBox}
                            value={patientName ? patientName : search}
                            // placeholder='Patient Name'
                            onChangeText={CallSearch}
                        // onChangeText={setSearch}
                        />
                        <TouchableOpacity onPress={clearSearch} style={styles.closeIcon}>
                            <AntDesign name="closecircle" size={20} color="#000" />
                        </TouchableOpacity>
                        {
                            !search &&
                            <AntDesign name="search1" size={20} color="#000" style={styles.searchIcon} />
                        }

                    </View>
                    <View style={styles.buttonView}>
                        <Text style={styles.button1} onPress={cancelFilter}>Cancel</Text>
                        <Text style={styles.button2} onPress={applyFilter}>Apply</Text>
                    </View>

                    <View style={styles.filterBox3}>

                        {
                            searchData.length > 0 ?
                                <FlatList
                                    data={searchData}
                                    // style={styles.list}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <View style={styles.visitCard1}>
                                            <TouchableOpacity onPress={() => {
                                                setPatient(item?.ID)
                                                setPatientName(item?.PATIENT_NAME)
                                                setSearchData([])
                                            }}>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                    <Text style={{ fontFamily: "Poppins-SemiBold", color: "black", paddingVertical: 8, fontSize: 15, paddingHorizontal: 5 }}>{item?.PATIENT_NAME}</Text>
                                                    <Text style={{ fontFamily: "Poppins-SemiBold", color: "black", paddingVertical: 8, fontSize: 15, paddingHorizontal: 5, textAlign: "right" }}>{item?.ADDRESS}</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    )}
                                    onEndReached={
                                        getMoreCallSearch
                                    }
                                    onEndReachedThreshold={0.1}
                                /> : !isLoading && search.length >= 3 && patient == 0 && <Text style={{ fontFamily: "Poppins-SemiBold", color: "black", paddingVertical: 8, fontSize: 15, paddingHorizontal: 5, textAlign: "center" }}>No Patients Found</Text>
                        }
                        {
                            isLoading && <ActivityIndicator size="small" color="#0EC2DB" style={{ bottom: 10, position: "absolute", left: "50%" }} />
                        }

                    </View>
                </View>
            }
            <View style={styles.dataView}>
                {
                    (patientVisitDetail.length > 0) ?
                        <FlatList
                            data={patientVisitDetail}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={styles.visitCard}>
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={{ fontFamily: "Poppins-Medium", color: "black", fontSize: 14, paddingTop: 5 }}>Name:- <Text style={{ fontFamily: "Poppins-SemiBold", color: "black", fontSize: 14, }}>{item?.PATIENT_NAME}</Text></Text>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                {
                                                    moment().format("YYYY-MM-DD") === moment(item?.VISIT_DATETIME).format("YYYY-MM-DD") ?
                                                        <Feather name="trash" size={28} color="red" style={styles.icon} onPress={() => handleDelete(item)} /> :
                                                        ""
                                                }
                                                <Feather name="edit" size={28} color="green" style={{ marginLeft: 5 }} onPress={() => navigation.navigate("UpdateFormScreen", { data: item })} />
                                            </View>
                                        </View>
                                        <Text style={{ fontFamily: "Poppins-Medium", color: "black", fontSize: 14 }}>Visit Date Time:- <Text style={{ fontFamily: "Poppins-SemiBold", color: "black", fontSize: 14, }}>{moment(item?.VISIT_DATETIME).format("lll")}</Text></Text>
                                        <Text style={{ fontFamily: "Poppins-Medium", color: "black", fontSize: 14 }}>Visited By:- <Text style={{ fontFamily: "Poppins-SemiBold", color: "black", fontSize: 14, }}>{item?.PATIENT_RELATION}</Text></Text>
                                        <Text style={{ fontFamily: "Poppins-Medium", color: "black", fontSize: 14 }}>Description :- <Text style={{ fontFamily: "Poppins-SemiBold", color: "black", fontSize: 14, }}>{item?.DESCRIPTION}</Text></Text>

                                        <View style={styles.amountSection}>
                                            <Text style={styles.amounts1}>{item?.TOTAL_AMOUNT}</Text>
                                            <Text style={styles.amounts2}>{item?.PAID_AMOUNT}</Text>
                                            <Text style={styles.amounts3}>{item?.TOTAL_AMOUNT - item?.PAID_AMOUNT < 0 ? "D-P" : ""} {item?.TOTAL_AMOUNT - item?.PAID_AMOUNT < 0 ? Math.abs(item?.TOTAL_AMOUNT - item?.PAID_AMOUNT) : item?.TOTAL_AMOUNT - item?.PAID_AMOUNT}</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                            onEndReached={
                                getMoreVisitLog
                            }
                            onEndReachedThreshold={0.1}
                        /> : (!loadingMore && patientVisitDetail.length == 0) ? <Text style={{ top: 0, color: "#000", fontFamily: "Poppins-Regular", fontSize: 16, position: "absolute", left: "30%" }} >No Records Found</Text> : loadingMore &&
                            <>
                                <ActivityIndicator size="large" color="#000" style={{ top: 10, position: "absolute", left: "45%" }} />
                                <Text style={{ top: 50, color: "#000", position: "absolute", left: "44%" }} >Loading...</Text>
                            </>
                }

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "#E6F4FE",
        flex: 1
    },

    mainContent: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"

    },

    text: {
        fontSize: 22,
        fontFamily: "Poppins-SemiBold",
        color: "black",
        margin: 10,
        marginLeft: 10
    },

    icon1: {
        // paddingLeft: 10,
    },
    icon: {
        // paddingRight: 10
    },

    filterBox: {
        // backgroundColor: "blue",
        marginBottom: 10,
        width: "100%",
        // height: 150,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    boxes: {
        width: "50%",
        paddingHorizontal: 5
    },
    label: {
        fontSize: 14,
        color: "black"
    },
    dateBox: {
        width: "100%",
        height: 35,
        fontSize: 16,
        paddingTop: 5,
        backgroundColor: "#F0F6F6",
        justifyContent: "center",
        textAlign: "center",
        color: "black",
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 4
        },
        elevation: 5,
    },
    dataView: {
        flex: 1,
        // backgroundColor: "gray",
        marginTop: 5,
        maxHeight: "100%",
    },

    filterBox1: {
        paddingHorizontal: 5
    },
    filterBox3: {
        paddingHorizontal: 5,
        marginTop: 5,
        height: "auto",
        maxHeight: 200
    },
    inputBox: {
        fontSize: 17,
        paddingLeft: 15,
        width: "100%",
        backgroundColor: '#F0F6F6',
        // backgroundColor: '#D8EBFB',
        fontFamily: "Poppins-Medium",
        height: 50,
        color: "#000",
        paddingHorizontal: 6,
        borderRadius: 10,
        marginTop: 6,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 4
        },
        elevation: 5,
    },
    closeIcon: {
        position: "absolute",
        top: 20,
        right: 20
    },
    searchIcon: {
        position: "absolute",
        top: 20,
        left: 20,
    },

    visitCard1: {
        // height: 40,
        flex: 1,
        backgroundColor: "#F0F6F6",
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0.1
        },
        shadowOpacity: 0.3,
        elevation: 5,
        paddingHorizontal: 10,
        // paddingVertical: 0
    },
    visitCard: {
        // height: 135,
        flex: 1,
        backgroundColor: "#F0F6F6",
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0.1
        },
        shadowOpacity: 0.3,
        elevation: 5,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    buttonView: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 7,
        gap: 5
    },
    button1: {
        width: 80,
        height: 30,
        backgroundColor: "red",
        opacity: .8,
        textAlign: "center",
        fontSize: 16,
        paddingTop: 3,
        color: "#000",
        borderRadius: 10

    },
    button2: {
        width: 80,
        height: 30,
        textAlign: "center",
        fontSize: 16,
        paddingTop: 3,
        color: "#000",
        borderRadius: 10,
        backgroundColor: "green",
        opacity: .8,

    },
    amountSection: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 3
        // alignContent: "center"
    },
    amounts1: {
        width: 50,
        height: 25,
        // color: "red",
        fontSize: 14,
        color: "black",
        paddingHorizontal: 5,
        paddingVertical: 2,
        textAlign: "center",
        backgroundColor: "#FDF306",
        borderRadius: 10
    },
    amounts2: {
        width: 50,
        height: 25,
        // color: "red",
        fontSize: 14,
        color: "black",
        paddingHorizontal: 5,
        paddingVertical: 2,
        textAlign: "center",
        backgroundColor: "#0BFD06",
        borderRadius: 10
    },
    amounts3: {
        width: 70,
        height: 25,
        // color: "red",
        fontSize: 14,
        color: "#fff",
        paddingHorizontal: 5,
        paddingVertical: 2,
        textAlign: "center",
        backgroundColor: "#FD0606",
        borderRadius: 10
    }

});

export default PatientReport;
