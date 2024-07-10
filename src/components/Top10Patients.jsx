import { View, Text, StyleSheet, FlatList, } from 'react-native';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/dist/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const Top10Patients = ({ data, loading }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Top 10 Due Amount Patients</Text>
      <View style={styles.listSection}>

        <ScrollView showsVerticalScrollIndicator={false} >
          {

            loading ? <>
              <ShimmerPlaceHolder
                style={styles.mg}
                shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
              />
              <ShimmerPlaceHolder
                style={styles.mg}
                shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
              />
              <ShimmerPlaceHolder
                style={styles.mg}
                shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
              />
              <ShimmerPlaceHolder
                style={styles.mg}
                shimmerColors={["#F0F6F6", "#c9edf0", "#F0F6F6"]}
              />
            </> :
              data.length > 0 ?
                data.map((item, i) => (
                  <View style={styles.mg} key={item.ID} >
                    <View style={styles.touchView}>
                      <Text style={styles.nameText} onPress={() => navigation.navigate("PatientHistoryScreen", { data: item })}>{i + 1}. {item.PATIENT_NAME}</Text>
                      <Text style={styles.ruppes} onPress={() => navigation.navigate("PatientHistoryScreen", { data: item })}>₹. {item.DUE_AMOUNT}</Text>
                    </View>
                    <View style={styles.touchView}>
                      <Text style={styles.add} onPress={() => navigation.navigate("PatientHistoryScreen", { data: item })}> <Feather name="phone" size={15} color="green" /> <Text style={{ fontFamily: "Poppins-Regular" }}>{item.MOBILE_NO}</Text></Text>
                      <Text style={styles.visited} onPress={() => navigation.navigate("PatientHistoryScreen", { data: item })}>Visted <Text style={{ fontFamily: "Poppins-SemiBold" }}>{item.VISITED_COUNT}</Text> Times</Text>
                    </View>
                  </View>
                ))
                : <Text style={{ textAlign: "center", fontSize: 20, fontFamily: "Poppins-Light" }}>No Dues Found</Text>
          }
        </ScrollView>
      </View >
    </View>
  );
};

const styles = StyleSheet.create({
  listSection: {
    backgroundColor: "#fff",
    // backgroundColor: "rgba(0,0,0,0.1)",
    // height: 219,
    // flex: .3,
    flex: 1,
    // width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15
  },

  touchView: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingRight: 10,
    paddingLeft: 10,

  },
  mg: {
    paddingHorizontal: 1,
    backgroundColor: "#F0F6F6",
    borderRadius: 10,
    width: "90%",
    height: 58,
    marginBottom: 10,
    marginHorizontal: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    paddingVertical: 3,
  },

  nameText: {
    fontSize: 17,
    fontFamily: "Poppins-Medium",
    color: "black",
  },

  ruppes: {
    fontSize: 17,
    fontFamily: "Poppins-Medium",
    color: "black",
  },
  add: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "black",
    paddingLeft: 0,
  },
  visited: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "black",
  },

  title: {
    fontSize: 17,
    fontFamily: "Poppins-Regular",
    color: "black",
    // marginTop: 12,
  },

});

export default Top10Patients;
