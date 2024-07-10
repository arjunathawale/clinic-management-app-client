import { View, Text, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { apiPost } from '../utils/helper';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { useSelector } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const InputFormScreen = ({ route }) => {

  let { data } = route?.params
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [pickedDate, setPickedDate] = useState(moment().format("DD/MM/YYYY"));
  const [spinner, setSpinner] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setPickedDate(moment(date).format("DD/MM/YYYY"))
    hideDatePicker();
  };


  const { USER_ID } = useSelector(state => state?.name.userData)
  const [name, onChangeName] = useState(data?.PATIENT_NAME ? data?.PATIENT_NAME : "");
  const [address, onChangeAddress] = useState(data?.ADDRESS ? data?.ADDRESS : "");
  const [mobile, onChangeMobile] = useState(data?.MOBILE_NO ? String(data?.MOBILE_NO) : "");
  const [relation, onChangeRelation] = useState("");
  const [desription, onChangeDescription] = useState("");
  const [total, onChangeTotal] = useState("");
  const [paid, onChangePaid] = useState("");
  const [clicked, onClicked] = useState(false);

  const submitDetaill = async () => {
    onClicked(true)
    try {
      if (!name || !address || !mobile || !relation || !desription || !total) {
        ToastAndroid.show('You Not Entered All Fields', ToastAndroid.SHORT);
        setTimeout(() => {
          onClicked(false)
      }, 200)
        // ToastAndroid.showWithGravity('You Not Entered All Fields', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      } else {
        setSpinner(true)
        const res = await apiPost("api/patient/createPatientEntry", {
          VISIT_DATETIME: pickedDate,
          DOCTOR_ID: USER_ID,
          PATIENT_ID: data?.ID ? data?.ID : 0,
          PATIENT_NAME: name,
          ADDRESS: address,
          MOBILE_NO: mobile,
          PATIENT_RELATION: relation,
          DESCRIPTION: desription,
          TOTAL_AMOUNT: total,
          PAID_AMOUNT: paid ? paid : 0,
        });
        if (res && res.statusCode === 200) {
          ToastAndroid.show(
            'Successfully Added Patient Entry',
            ToastAndroid.SHORT,
          );
          // ToastAndroid.showWithGravity(
          //   'Successfully Added Patient Entry',
          //   // res.message,
          //   ToastAndroid.SHORT,
          //   ToastAndroid.BOTTOM,
          // );
          onChangeName("")
          onChangeAddress("")
          onChangeDescription("")
          onChangeRelation("")
          onChangeTotal("0")
          onChangePaid("0")
          onChangeMobile("")
          navigation.goBack()
          // navigation.navigate('PatientEntryScreen')
          // setTimeout(() => {
          //   setIsEnabled(false)
          // }, 1000);
          setSpinner(false)
          setTimeout(() => {
            onClicked(false)
        }, 200)
        } else {
          setTimeout(() => {
            onClicked(false)
        }, 200)

          setSpinner(false)
          // ToastAndroid.showWithGravity(
          //   'Failed to Add Patient Entry',
          //   ToastAndroid.SHORT,
          //   ToastAndroid.BOTTOM,
          // );
          ToastAndroid.show(
            'Failed to Add Patient Entry',
            ToastAndroid.SHORT,
          );
        }

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContent} >
        {/* <TouchableOpacity onPress={() => navigation.goBack()}> */}
          {/* <Feather name="chevron-left" size={33} color="#000" /> */}
          <Feather name="chevron-left" onPress={() => navigation.goBack()} size={30} color="#000" style={styles.icon1} />
        {/* </TouchableOpacity> */}

        <Text style={styles.text}>Patient Entry</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}> */}
          <AntDesign name="home" size={33} color="black" onPress={() => navigation.navigate('HomeScreen')} style={styles.icon} />
          {/* <Feather name="home" size={28} color="#ff0c6c" style={styles.icon} /> */}
        {/* </TouchableOpacity> */}
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          flexDirection: 'row',
          justifyContent: "flex-end",
          alignItems: "center",
          alignContent: "center",
          marginHorizontal: 5
        }}>
          <Text onPress={showDatePicker} style={{
            width: 150, height: 40, fontSize: 20, paddingTop: 5, backgroundColor: "#F0F6F6", justifyContent: "center",
            textAlign: "center", color: "black",
            borderRadius: 10,
            marginHorizontal: 5,
            marginTop: 6,


            shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 4
            },
            elevation: 5,
          }}>
            {pickedDate}
          </Text>
          {/* <Text onPress={showDatePicker} style={{
            width: 150, height: 40, fontSize: 20, backgroundColor: "green", justifyContent: "center",
            textAlign: "center", color: "black"
          }}>
            {pickedDate ? pickedDate : "Select Date"}
          </Text> */}
        </View>
        <Text style={styles.label}>Patient Full Name</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.deliver}
            placeholder='Patient Name'
            onChangeText={onChangeName}
            value={name}
            placeholderTextColor="#000"
          // editable={data?.PATIENT_NAME ? false : true}
          />
        </View>
        <Text style={styles.label}>Patient Address</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.deliver}
            placeholder='Patient Address'
            onChangeText={onChangeAddress}
            value={address}
            placeholderTextColor="#000"
          // editable={data?.ADDRESS ? false : true}
          />
        </View>
        <Text style={styles.label}>Patient Mobile No</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.deliver}
            placeholder='Patient Mobile No'
            onChangeText={onChangeMobile}
            value={mobile}
            maxLength={10}
            keyboardType='numeric'
            placeholderTextColor="#000"
          // editable={data?.MOBILE_NO ? false : true}
          />
        </View>
        <Text style={styles.label}>Relation with Patient</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.deliver}
            placeholder='Relation with Patient'
            onChangeText={onChangeRelation}
            value={relation}

            placeholderTextColor="#000"
          />
        </View>
        <Text style={styles.label}>Detail Description</Text>
        <View style={styles.container}>
          <TextInput
            numberOfLines={4}
            maxLength={256}
            style={styles.deliver1}
            multiline={true}
            textBreakStrategy={"highQuality"}
            placeholder='Detail Descripton'
            onChangeText={onChangeDescription}
            value={desription}
            placeholderTextColor="#000"
          />
        </View>
        <View style={styles.container1} >
          <View style={{ width: "50%" }}>
            <Text style={styles.labelPrice1}>Total Amount</Text>
            <View style={styles.container}>
              <TextInput
                style={styles.deliver11}
                value={total}
                placeholder='Total Amount'
                onChangeText={onChangeTotal}
                keyboardType='numeric'
                placeholderTextColor="#000"
              />
            </View>
          </View>
          <View style={{ width: "50%" }}>
            <Text style={styles.labelPrice1}>Total Paid</Text>
            <View style={styles.container}>
              <TextInput
                style={styles.deliver11}
                value={paid}
                placeholder='Total Paid'
                onChangeText={onChangePaid}
                keyboardType='numeric'
                placeholderTextColor="#000"
              />
            </View>
          </View>
        </View>
        <Text style={styles.label}>Total Dues Amount is <Text style={styles.labelPrice}>₹. {Number(data?.DUE_AMOUNT ? data?.DUE_AMOUNT : 0) + Number(total) - Number(paid)}</Text></Text>
        <View  style={styles.container}>

          {
            spinner ? <ActivityIndicator style={styles.deliver111} size="large" color="#fff" /> : <Text style={[styles.btnText, {opacity: clicked ? 0.7 : 1}]} onPress={submitDetaill}>Add Entry</Text>
          }

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#E6F4FE"
  },
  container: {
    padding: 1,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },
  deliver: {
    fontSize: 17,
    paddingLeft: 15,
    width: "100%",
    backgroundColor: '#F0F6F6',
    // backgroundColor: '#D8EBFB',
    fontFamily: "Poppins-Regular",
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
  deliver1: {
    fontSize: 17,
    paddingRight: 15,
    paddingLeft: 15,
    width: "100%",
    backgroundColor: '#F0F6F6',
    // backgroundColor: '#D8EBFB',
    fontFamily: "Poppins-Regular",
    minHeight: 30,
    maxHeight: 95,
    color: "#000",
    // paddingHorizontal: 6,
    borderRadius: 10,


    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4
    },
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: "Poppins-Medium",
    marginBottom: -8,
    color: "#000"
  },
  labelPrice: {
    fontSize: 22,
    marginLeft: 20,
    fontFamily: "Poppins-Regular",
    color: "red",
    marginBottom: -10,
  },
  container1: {
    // paddingLeft: 5,
    // paddingRight: 5,
    flex: 1,

    // margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  deliver11: {
    fontSize: 17,
    paddingLeft: 15,
    // width: 165,
    width: "100%",

    backgroundColor: '#F0F6F6',
    fontFamily: "Poppins-Regular",
    height: 50,
    color: "#000",
    // paddingHorizontal: 6,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4
    },
    elevation: 1,
  },
  deliver111: {
    fontSize: 20,
    paddingLeft: 10,
    marginTop: 20,
    width: "70%",
    // backgroundColor: '#ff0c6c',
    backgroundColor: '#62A4FB',

    fontFamily: "Poppins-Regular",
    height: 55,
    // color: "#000",
    paddingHorizontal: 6,
    borderRadius: 20,
    textAlign: "center",
    alignContent: "center",
    marginBottom: 60,
  },
  btnText: {
    fontSize: 20,
    paddingLeft: 10,
    marginTop: 20,
    paddingTop: 12,
    width: "70%",
    // backgroundColor: '#fff',
    backgroundColor: '#62A4FB',

    fontFamily: "Poppins-Medium",
    height: 55,
    color: "#fff",
    paddingHorizontal: 6,
    borderRadius: 20,
    textAlign: "center",
    alignContent: "center",
    marginBottom: 60,
  },



  main: {
    paddingRight: 15,
    paddingLeft: 15,
  },
  mainContent: {
    // paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"

  },

  text: {
    fontSize: 25,
    fontFamily: "Poppins-SemiBold",
    color: "black",
    margin: 10,
    marginLeft: 10
  },

  icon1: {
    paddingLeft: 5,
  },
  icon: {
    paddingRight: 10
  },

  labelPrice1: {
    fontSize: 16,
    // marginLeft: 6,
    fontFamily: "Poppins-Medium",
    marginBottom: -10,
    color: "#000"
  },
});

export default InputFormScreen;
