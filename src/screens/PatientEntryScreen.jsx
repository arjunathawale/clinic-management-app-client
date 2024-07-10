import { View, StyleSheet, Text, TouchableOpacity, TextInput, ActivityIndicator, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, {useState } from 'react';
import moment from 'moment';

import { apiPost } from '../utils/helper';
import { ScrollView } from 'react-native-gesture-handler';

import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { useSelector } from 'react-redux';

const PatientEntryScreen = () => {

  const navigation = useNavigation();
  const { USER_ID } = useSelector(state => state?.name.userData)
  const [text, onChangeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);


  const CallSearch = async (event) => {
    onChangeText(event)
    try {
      if (event.length >= 3) {
        setIsLoading(true)
        const res = await apiPost("api/patient/getAllPatient", {
          filter: ` AND PATIENT_NAME LIKE '${event ? "%" + event + "%" : ""}' AND DOCTOR_ID = ` + USER_ID
        });
        if (res && res.statusCode === 200) {
          setOrderData(res.data);
          setIsLoading(false)
        }
      } else if (event == "") {
        setOrderData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor='#E6F4FE' barStyle="dark-content" />
      <View style={styles.mainContent} >
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen', {})}>
          <Feather name="chevron-left" size={33} color="#000" />
        </TouchableOpacity>
        <TextInput placeholder='Search Name' placeholderTextColor="#000" focusable style={styles.input} onChangeText={CallSearch} value={text} />
        <AntDesign name="form" size={33} color="#000" onPress={() => navigation.navigate('InputFormScreen', {
          data: {}
        })} />
      </View>
      <View style={styles.container}>
        {orderData && !isLoading ?
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
            <View style={{ flex: 1 }}>
              {text == "" && <Text style={styles.add1}>Please Type 3 Character to Search</Text>}
              {
                orderData.map((item, i) => (
                  <TouchableOpacity
                    style={styles.mg}
                    key={item.ID}
                    onPress={() => navigation.navigate('InputFormScreen', { data: item })}
                  >
                    <View style={{width: "100%",}}>
                      <View style={styles.touchView}>
                        <Text style={styles.nameText}>{i + 1}. {item.PATIENT_NAME}</Text>
                        <Text style={styles.ruppes}>{item.ADDRESS}</Text>
                      </View>
                      <View style={styles.touchView}>
                        <Text style={styles.add}>{item.MOBILE_NO}</Text>
                        <Text style={styles.visited}>Last Visit: - {moment(item.LAST_VISITDATETIME.split(' ')[0]).format("ll")}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
          : <ActivityIndicator size="large" color="black" style={styles.spinner} />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: "#E6F4FE",
    flex: 1,

  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#E6F4FE",
  },
  text: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "black",
    margin: 12,
    padding: 10,
    // backgroundColor: "red",
    // height: 45,
  },
  input: {
    height: "90%",
    width: "70%",
    // margin: 12,
    marginHorizontal: 5,
    backgroundColor: "#F0F6F6",
    paddingHorizontal: 15,
    paddingTop: 12,
    borderRadius: 10,
    color: "black",
    fontFamily: "Poppins-Medium",
    textAlign: "left",
    fontSize: 16,




    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.9,
    shadowRadius: 9,
    elevation: 10,
  },

  touchView: {
    flexDirection: 'row',
    justifyContent: "space-between",
   
    // paddingRight: 10,
    // paddingLeft: 10,
    // flex: 1

  },
  mg: {
    paddingHorizontal: 20,
    // marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 4,
    width: "100%",
    // flex:1,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4
    },
    elevation: 1,
  },

  nameText: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "black",
    marginRight: 20
    // textAlign:"left"
  },
  ruppes: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "black",
  },

  add: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "black",
  },
  add1: {
    fontSize: 17,
    fontFamily: "Poppins-Regular",
    color: "black",
    // textAlign: "center"
  },
  visited: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "black",
  },
  spinner: {
    marginTop: 25,
    fontSize: 40
  }

});

export default PatientEntryScreen;
