import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PatientEntryScreen from '../screens/PatientEntryScreen';
import LoginScreen from '../screens/LoginScreen';
import InputFormScreen from '../screens/InputFormScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin, setLogin, setUser } from '../reduxStore/userSlice';
import PatientHistoryScreen from '../screens/PatientHistoryScreen';
import PatientReport from '../screens/PatientReport';
import DailySummaryReport from '../screens/DailySummaryReport';
import InternetConCheck from '../screens/InternetConCheck';
import NetInfo from "@react-native-community/netinfo";
import UpdateFormScreen from '../screens/UpdateFormScreen';



const Stack = createStackNavigator();
const Router = () => {

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state?.name)
  const [isLogin, SetIsLogin] = useState("NO")
  const [loading, setLoading] = useState(false)
  const [isInternet, setIsInternet] = useState(true)
  const isReload = async () => {
    setLoading(true)
    let STORAGE_KEY = "IS_LOGIN"
    var isLogined = await AsyncStorage.getItem(STORAGE_KEY)
    var DOCTOR_DATA = await AsyncStorage.getItem("DOCTOR_DATA")
    var newData = await JSON.parse(DOCTOR_DATA)
    dispatch(setLogin(isLogined == "YES" ? true : false))
    dispatch(setUser(newData))
    dispatch(setAdmin(newData?.IS_ADMIN == 1 ? true : false))
    SetIsLogin(isLogined)
    setLoading(false)
  }
  useEffect(() => {
    isReload()
  }, [isLoggedIn])
  
  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setIsInternet(state.isConnected)
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        {
          !isInternet ?
            <Stack.Screen name="InternetConCheck" component={InternetConCheck} />
            :
            isLoggedIn ?
              (
                <>
                  <Stack.Screen name="HomeScreen" component={HomeScreen} initialParams={{ login: SetIsLogin }} />
                  <Stack.Screen name="PatientEntryScreen" component={PatientEntryScreen} />
                  <Stack.Screen name="InputFormScreen" component={InputFormScreen} />
                  <Stack.Screen name="UpdateFormScreen" component={UpdateFormScreen} />
                  <Stack.Screen name="PatientHistoryScreen" component={PatientHistoryScreen} initialParams={{ data: {} }} />
                  <Stack.Screen name="PatientReport" component={PatientReport} />
                  <Stack.Screen name="DailySummaryReport" component={DailySummaryReport} />
                </>
              )
              : loading ?
                (
                  <Stack.Screen name="Splash" component={SplashScreen} />
                ) : (
                  <Stack.Screen name="Login" component={LoginScreen} initialParams={{ login: SetIsLogin }} />
                )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
