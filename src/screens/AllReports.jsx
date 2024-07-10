import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';

const AllReports = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1,marginTop: 260 }}>
            <Text style={styles.title}>Detailed Reports</Text>
            <View style={styles.container}>
                <Text style={styles.textBox} onPress={() => navigation.navigate("PatientReport")}>Daily Patient Detail</Text>
                <Text style={styles.textBox} onPress={() => navigation.navigate("DailySummaryReport")}>Daily Patient Count</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 5,
        marginTop: 5,
        paddingHorizontal: 2,
        justifyContent: "center"
    },
    textBox: {
        flex: 0.5,
        fontFamily: "Poppins-Regular",
        textAlign: "center",
        backgroundColor: "#F0F6F6",
        fontSize: 15,
        paddingVertical: 10,
        color: "black",

        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
        borderRadius: 10
    },
    title: {
        fontSize: 17,
        fontFamily: "Poppins-Regular",
        color: "black",
        marginTop: 12,
    },


});

export default AllReports;
