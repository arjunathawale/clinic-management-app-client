import { View, Text, StyleSheet } from 'react-native';
import React from 'react';


import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const Dashboard = ({ data }) => {

    let Today = data[0]?.TODAY_DATA
    let Yesterday = data[0]?.YESTERDAY_DATA
    let Last7 = data[0]?.LAST_7_DATA
    let Month = data[0]?.CMONTH_DATA
    return (
        <>
            {
                data && data.length >= 0 ?
                    < View style={styles.main} >
                        {/* Today day */}
                        <Text style={styles.textHeader1}>Today</Text>
                        <View style={styles.cards}>
                            <View style={styles.card}>
                                {
                                    Today ? <>
                                        <Text style={styles.textHeader}>Patients</Text>
                                        <Text style={styles.textCount}>{Today?.TODAY_PATIENT}</Text>
                                    </> : <ShimmerPlaceHolder
                                        style={{
                                            width: 112,
                                            height: 70,
                                            borderRadius: 15
                                        }}
                                        shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
                                    />
                                }
                                {/* <Text style={styles.textHeader}>Patients</Text>
                                {Today ? <Text style={styles.textCount}>{Today?.TODAY_PATIENT}</Text> : <ActivityIndicator size="large" color="#0EC2DB" />} */}
                            </View>

                            <View style={styles.card}>
                                {/* <Text style={styles.textHeader}>Amount</Text> */}
                                {
                                    Today ? <>
                                        <Text style={styles.textHeader}>Amount</Text>
                                        <Text style={styles.textCount}>{Today?.TODAY_AMOUNT}</Text>
                                    </> : <ShimmerPlaceHolder
                                        style={{
                                            width: 112,
                                            height: 70,
                                            borderRadius: 15
                                        }}
                                        shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
                                    />
                                }
                            </View>
                            <View style={styles.card}>
                                {
                                    Today ? <>
                                        <Text style={styles.textHeader}>Paid</Text>
                                        <Text style={styles.textCount}>{Today?.TODAY_PAID}</Text>
                                    </> : <ShimmerPlaceHolder
                                        style={{
                                            width: 112,
                                            height: 70,
                                            borderRadius: 15
                                        }}
                                        shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
                                    />
                                }
                                {/* <Text style={styles.textHeader}>Paid</Text>
                                {Today ? <Text style={styles.textCount}>{Today?.TODAY_PAID}</Text> : <ActivityIndicator size="large" color="#0EC2DB" />} */}
                            </View>
                        </View>

                        {/* Last day */}
                        <Text style={styles.textHeader1}>Yesterday</Text>
                        <View style={styles.cards}>
                            <View style={styles.card}>
                                {
                                    Yesterday ? <>
                                        <Text style={styles.textHeader}>Patients</Text>
                                        <Text style={styles.textCount}>{Yesterday?.YESTERDAY_PATIENT}</Text>
                                    </> : <ShimmerPlaceHolder
                                        style={{
                                            width: 112,
                                            height: 70,
                                            borderRadius: 15
                                        }}
                                        shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
                                    />
                                }
                            </View>
                            <View style={styles.card}>
                                {
                                    Yesterday ? <>
                                        <Text style={styles.textHeader}>Amount</Text>
                                        <Text style={styles.textCount}>{Yesterday?.YESTERDAY_AMOUNT}</Text>
                                    </> : <ShimmerPlaceHolder
                                        style={{
                                            width: 112,
                                            height: 70,
                                            borderRadius: 15
                                        }}
                                        shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
                                    />
                                }
                            </View>
                            <View style={styles.card}>
                                {
                                    Yesterday ? <>
                                        <Text style={styles.textHeader}>Paid</Text>
                                        <Text style={styles.textCount}>{Yesterday?.YESTERDAY_PAID}</Text>
                                    </> : <ShimmerPlaceHolder
                                        style={{
                                            width: 112,
                                            height: 70,
                                            borderRadius: 15
                                        }}
                                        shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
                                    />
                                }
                            </View>
                        </View>

                        {/* Last Week */}
                        <Text style={styles.textHeader1}>Last 7 Days</Text>
                        <View style={styles.cards}>
                            <View style={styles.card}>



                                {
                                    Last7 ? <>
                                        <Text style={styles.textHeader}>Patients</Text>
                                        <Text style={styles.textCount}>{Last7?.LAST7_PATIENT}</Text>
                                    </> : <ShimmerPlaceHolder
                                        style={{
                                            width: 112,
                                            height: 70,
                                            borderRadius: 15
                                        }}
                                        shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
                                    />
                                }
                            </View>

                            <View style={styles.card}>

                                {
                                    Last7 ? <>
                                        <Text style={styles.textHeader}>Amount</Text>
                                        <Text style={styles.textCount}>{Last7?.LAST7_AMOUNT}</Text>
                                    </> : <ShimmerPlaceHolder
                                        style={{
                                            width: 112,
                                            height: 70,
                                            borderRadius: 15
                                        }}
                                        shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
                                    />
                                }
                                {/* <Text style={styles.textHeader}>Amount</Text>
                                {Today ? <Text style={styles.textCount}>{Last7?.LAST7_AMOUNT}</Text> : <ActivityIndicator size="large" color="#0EC2DB" />} */}
                            </View>
                            <View style={styles.card}>


                                {
                                    Last7 ? <>
                                        <Text style={styles.textHeader}>Paid</Text>
                                        <Text style={styles.textCount}>{Last7?.LAST7_PAID}</Text>
                                    </> : <ShimmerPlaceHolder
                                        style={{
                                            width: 112,
                                            height: 70,
                                            borderRadius: 15
                                        }}
                                        shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
                                    />
                                }
                                {/* <Text style={styles.textHeader}>Paid</Text>
                                {Today ? <Text style={styles.textCount}>{Last7?.LAST7_PAID}</Text> : <ActivityIndicator size="large" color="#0EC2DB" />} */}
                            </View>
                        </View>

                        {/* Current Month */}
                        <Text style={styles.textHeader1}>Current Month</Text>
                        <View style={styles.cards}>
                            <View style={styles.card}>
                                {
                                    Month ? <>
                                        <Text style={styles.textHeader}>Patients</Text>
                                        <Text style={styles.textCount}>{Month?.MONTH_PATIENT}</Text>
                                    </> : <ShimmerPlaceHolder
                                        style={{
                                            width: 112,
                                            height: 70,
                                            borderRadius: 15
                                        }}
                                        shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
                                    />
                                }
                                {/* <Text style={styles.textHeader}>Patients</Text>
                                {Today ? <Text style={styles.textCount}>{Month?.MONTH_PATIENT}</Text> : <ActivityIndicator size="large" color="#0EC2DB" />} */}
                            </View>

                            <View style={styles.card}>


                                {
                                    Month ? <>
                                        <Text style={styles.textHeader}>Amount</Text>
                                        <Text style={styles.textCount}>{Month?.MONTH_AMOUNT}</Text>
                                    </> : <ShimmerPlaceHolder
                                        style={{
                                            width: 112,
                                            height: 70,
                                            borderRadius: 15
                                        }}
                                        shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
                                    />
                                }
                                {/* <Text style={styles.textHeader}>Amount</Text>
                                {Today ? <Text style={styles.textCount}>{Month?.MONTH_AMOUNT}</Text> : <ActivityIndicator size="large" color="#0EC2DB" />} */}
                            </View>
                            <View style={styles.card}>

                                {
                                    Month ? <>
                                        <Text style={styles.textHeader}>Paid</Text>
                                        <Text style={styles.textCount}>{Month?.MONTH_PAID}</Text>
                                    </> : <ShimmerPlaceHolder
                                        style={{
                                            width: 112,
                                            height: 70,
                                            borderRadius: 15
                                        }}
                                        shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
                                    />
                                }
                                {/* <Text style={styles.textHeader}>Paid</Text>
                                {Today ? <Text style={styles.textCount}>{Month?.MONTH_PAID}</Text> : <ActivityIndicator size="large" color="#0EC2DB" />} */}
                            </View>
                        </View>
                    </View > : ""
            }
        </>
    );
};

const styles = StyleSheet.create({

    // parentContainer:{

    //     height: 400
    // },
    main: {
        flex: 1
    },
    mainContent: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    text: {
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        letterSpacing: 1,
        color: "#0EC2DB"
    },
    textWa: {
        fontSize: 45,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        color: "#000"
    },
    cards: {
        marginTop: 0,
        // width: "100%",
        paddingHorizontal: 2,
        height: 65,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    card: {
        width:"30%",
        // flex:1,
        backgroundColor: "#F0F6F6",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2,
    },
    textHeader: {
        fontSize: 14,
        fontFamily: "Poppins-Medium",
        color: "gray"
    },
    textCount: {
        fontSize: 20,
        fontFamily: "Poppins-SemiBold",
        color: "#000",
    },

    textHeader1: {
        fontSize: 15,
        fontFamily: "Poppins-Meduim",
        color: "black",
        marginTop: 5,
        marginVertical: 2
    },



    listSection: {
        backgroundColor: "white",
        marginTop: -15,
        margin: 12,
        padding: 15,
        height: 400,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    touchView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingRight: 10,
        paddingLeft: 10,

    },
    mg: {
        padding: 1,
        backgroundColor: "#B1A0A0",
        borderRadius: 10,
        margin: 5
    },

    nameText: {
        fontSize: 22,
        fontFamily: "Poppins-SemiBold",
        color: "black",
    },

    ruppes: {
        fontSize: 22,
        fontFamily: "Poppins-SemiBold",
        color: "black",
    },
    add: {
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        color: "black",
    },
    visited: {
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        color: "black",
    },

    // floatingBtn: {
    //     // width: 90,
    //     // height: 90,
    //     // position: 'absolute',
    //     // backgroundColor: "red",
    //     // top: 700,
    //     // right: 10,
    //     // borderRadius: 50,
    //     borderWidth: 1,
    //     borderColor: 'red',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width: 75,
    //     position: 'absolute',
    //     top: 700,
    //     right: 20,
    //     height: 75,
    //     backgroundColor: 'red',
    //     borderRadius: 100,

    // }
});

export default Dashboard;
