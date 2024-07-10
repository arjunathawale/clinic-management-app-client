import {TouchableOpacity, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react';
import Top10Patients from '../components/Top10Patients';
import Dashboard from '../components/Dashboard';
import Feather from 'react-native-vector-icons/dist/Feather';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { apiPost } from '../utils/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { enableAdmin, setAdmin, setLogin, setUser } from '../reduxStore/userSlice';
import AllReports from './AllReports';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  let { login } = route.params
  const { isAdminEnabled, isAdmin } = useSelector(state => state?.name)
  const { USER_ID, NAME } = useSelector(state => state?.name?.userData)
  // const { NAME } = useSelector(state => state?.name?.userData?.NAME ? state?.name?.userData?.NAME : O_NAME)



  const [dashboardCount, setDashbaordCount] = useState([]);
  const [top10Pateint, setTop10Pateint] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const setAdminUser = () => {
    setDashbaordCount([])
    setTop10Pateint([])
    if (isAdminEnabled) dispatch(enableAdmin(false))
    else dispatch(enableAdmin(true))
  }


  const getData = async () => {
    setLoading(true)
    if (USER_ID) {
      let newFilter = ''
      if (isAdminEnabled) newFilter = ""
      else newFilter = " AND DOCTOR_ID = " + USER_ID
      const dashboard = await apiPost("api/patient/getDashboardCount", {
        filter: newFilter
      });
      const patientData = await apiPost("api/patient/getTop10DueAmountPatient", {
        filter: newFilter
      });
      if (dashboard && dashboard.statusCode === 200) {
        await setDashbaordCount(dashboard.data)
      }
      if (patientData && patientData.statusCode === 200) {
        await setTop10Pateint(patientData.data)
      }
    }
    setLoading(false)
  }

  useFocusEffect(useCallback(() => {
    getData()
  }, [USER_ID, isAdminEnabled]))





  const logout = async () => {
    let STORAGE_KEY = "IS_LOGIN"
    await AsyncStorage.setItem(STORAGE_KEY, "NO")
    dispatch(setLogin(false))
    dispatch(setUser({}))
    // dispatch(setAdmin(false))
    setDashbaordCount([])
    setTop10Pateint([])
    login("NO")
  }


  return (
    <>
      < View style={styles.main} >
        <View style={styles.mainContent}>
          <Text style={styles.text}><Text style={styles.text2}>Welcome Back,{'\n'}</Text>{NAME}</Text>
          {/* <Text style={styles.text}>Welcome,{"\n"} {doctorName}</Text> */}
          <View style={styles.mainContent}>
            {
              isAdmin && <TouchableOpacity onPress={setAdminUser} style={styles.logout}>
                <Feather name="users" style={{
                  fontSize: 30,
                  color: isAdminEnabled ? "red" : "#17202A",
                  top: 5,
                }} />
              </TouchableOpacity>
            }
            <TouchableOpacity onPress={logout} style={styles.logout}>
              <Feather name="log-out" style={styles.textWa} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          {dashboardCount.length >= 0 && top10Pateint.length >= 0 ?
            <>
              <View style={{ flex: 1 }}>
                <Dashboard data={dashboardCount} loading={loading} />
                <AllReports />
              </View>
              <View style={{ flex: 0.5 }} >
                <Top10Patients data={top10Pateint} loading={loading} />
              </View>
            </>
            : loading &&
            <>
              <ActivityIndicator color="black" size="large" style={{ position: "absolute", top: "40%", left: "45%" }} />
              <Text style={{ position: "absolute", top: "45%", left: "42%", fontSize: 16, fontFamily: "Poppins-Medium", color: "#000" }}>Loading</Text>
            </>
          }
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('PatientEntryScreen')}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 58,
          position: 'absolute',
          bottom: 45,
          right: 20,
          height: 58,
          backgroundColor: '#0EC2DB',
          opacity: .9,
          borderRadius: 15,
        }}>
          <Feather name="plus" size={40} color="#fff" />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    backgroundColor: "#E6F4FE",
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  text2: {
    fontSize: 17,
    fontFamily: "Poppins-Regular",
    color: "black",
  },
  text: {
    fontSize: 29,
    fontFamily: "Poppins-SemiBold",
    color: "#0EC2DB",
  },
  textWa: {
    fontSize: 30,
    color: "#17202A",
    top: 5,
  },
  logout: {
    width: 32,
    height: 40,
    marginLeft: 10,
    justifyContent: "space-between",
    alignItems: "center",
  }
})

export default HomeScreen;
