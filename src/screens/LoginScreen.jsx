import { View, Text, StyleSheet, TextInput, Image, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { apiPost } from '../utils/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import {setLogin, setName, setUser, setUserId,setAdmin } from '../reduxStore/userSlice';

const LoginScreen = ({ route }) => {

    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');
    const [clicked, onClicked] = useState(false);
    const navigation = useNavigation();
    let STORAGE_KEY = "IS_LOGIN"

    const dispatch = useDispatch()

    const Login = async () => {
        onClicked(true)
        try {
            if (!username) {
                ToastAndroid.show('Please Enter Username', ToastAndroid.LONG);
                setTimeout(() => {
                    onClicked(false)
                }, 200)
                // ToastAndroid.showWithGravity('Please Enter Username', ToastAndroid.LONG, ToastAndroid.BOTTOM);
            } else if (!password) {
                ToastAndroid.show('Please Enter Password', ToastAndroid.SHORT);
                setTimeout(() => {
                    onClicked(false)
                }, 200)
                // ToastAndroid.showWithGravity('Please Enter Password', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            } else {
                const res = await apiPost("user/login", {
                    username: username,
                    password: password,
                });

                if (res && res.statusCode === 200) {
                    console.log("res", res.data[0]);
                    ToastAndroid.show("Login Successfully", ToastAndroid.SHORT);
                    // // ToastAndroid.showWithGravity(
                    //     'Successfully Logged In',
                    //     ToastAndroid.LONG,
                    //     ToastAndroid.BOTTOM,
                    // );
                    // console.log("res.data[0].UserData[0]", res.data[0].UserData[0]);
                    dispatch(setUser(res.data[0].UserData[0]))
                    dispatch(setUserId(res.data[0].UserData[0]?.USER_ID))
                    dispatch(setName(res.data[0].UserData[0]?.NAME))
                    await AsyncStorage.setItem(STORAGE_KEY, "YES")
                    await AsyncStorage.setItem("DOCTOR_DATA", JSON.stringify(res.data[0].UserData[0]))
                    route.params.login("YES")
                    dispatch(setLogin(true))
                    dispatch(setAdmin(res.data[0].UserData[0].IS_ADMIN == 1 ? true : false))
                    setTimeout(() => {
                        navigation.navigate('HomeScreen', {
                            login: route.params.login,
                        })
                    }, 3000);
                    onClicked(false)
                } else if (res && res.statusCode === 400) {
                    onClicked(false)
                    ToastAndroid.show(
                        res.message,
                        ToastAndroid.SHORT,
                    );
                    // ToastAndroid.showWithGravity(
                    //     res.message,
                    //     ToastAndroid.SHORT,
                    //     ToastAndroid.BOTTOM,
                    // );
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={styles.mainContainer}>
            <Image
                style={styles.Logo}
                source={require('../assets/medicine.png')}
            />
            <Text style={styles.name}>Arunodaya Clinic</Text>
            <Text style={styles.subname}>A Digital Clinic</Text>

            <View style={styles.container}>

                <TextInput
                    style={styles.deliver}
                    placeholder='Email ID or Mobile No'
                    placeholderTextColor={"#000"}
                    onChangeText={onChangeUsername}
                    value={username}
                />
            </View>
            <View style={styles.container}>
                <TextInput
                    style={styles.deliver}
                    placeholder='Password'
                    placeholderTextColor={"#000"}
                    onChangeText={onChangePassword}
                    value={password}
                    secureTextEntry
                />
            </View>

            {/* <TouchableOpacity onPress={Login}> */}
                <View style={styles.container}>
                    <Text style={[styles.deliver111, {opacity: clicked ? .7 : 1}]} onPress={Login}>Login</Text>
                </View>
            {/* </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#E6F4FE",
        justifyContent: "center",
        alignItems: "center"
    },
    Logo: {
        width: 200,
        height: 200,
        margin: 10,


        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        // elevation: 6,
    },
    name: {
        fontSize: 30,
        fontFamily: "Poppins-SemiBold",
        color: "#0EC2DB",
        marginBottom: -10,
        letterSpacing: 1.5
    },
    subname: {
        fontSize: 22,
        fontFamily: "Poppins-Regular",
        color: "#0EC2DB",
        letterSpacing: 1.9,
        marginBottom: 20
    },
    container: {
        padding: 1,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",

    },
    deliver: {
        fontSize: 17,
        paddingLeft: 25,
        width: 320,
        backgroundColor: '#E6F4FE',
        // backgroundColor: '#D6DBDF',
        fontFamily: "Poppins-Regular",
        height: 60,
        color: "#000",
        paddingHorizontal: 6,
        borderRadius: 10,


        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },

    deliver111: {
        fontSize: 18,
        paddingLeft: 5,
        marginTop: 15,
        paddingTop: 15,
        width: 195,
        // backgroundColor: '#44B678',
        backgroundColor: '#62A4FB',
      
        // backgroundColor: '#ff0c6c',
        fontFamily: "Poppins-Medium",
        height: 60,
        color: "#fff",
        paddingHorizontal: 6,
        borderRadius: 20,
        textAlign: "center",
        alignContent: "center",

    },
});

export default LoginScreen;
