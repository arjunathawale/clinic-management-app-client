import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

const SplashScreen = () => {
    
    return (<>
        <View style={styles.mainContainer}>
            <Image
                style={styles.Logo}
                source={require('../assets/medicine.png')}
            />
            <ActivityIndicator size="small" color="#62A4FB" style={styles.name} />
            <Text style={styles.name1}>© Arjun Athawale</Text>
        </View>
    </>
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
        // marginTop: -150,
        marginBottom: 25,
        width: 200,
        height: 200,
        margin: 10,
    },
    name: {
        fontSize: 5,
        fontFamily: "Poppins-Bold",
        color: "#0EC2DB",
        // color: "#0EC2DB",
        top: 230,

        letterSpacing: 1
    },
    name1: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: "#62A4FB",
        // color: "#ff0c6c",
        top: 240,
        letterSpacing: 1
    },

});

export default SplashScreen;
