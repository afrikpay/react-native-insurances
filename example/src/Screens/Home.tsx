import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTYyMjQ2NjcsImV4cCI6MTc1NjMxMTA2Nywicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY4MjYwNTk0NSIsInRva2VuS2V5IjoiYUhrMVMyZHZlUzk2VmpWbFJ6aEZjVVYzWVZSbFVUMDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJzZGtncGhvbmV4ODZRU1IxMjExMTEyMDExMTMxMzU0MzIiLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Im9raHR0cC80LjkuMiIsImlwQWRkcmVzcyI6IjE2OS4yNTQuMTY5LjEyNiJ9.oS3Wi9Jig8T_Rl0wYhItOdydZ8O6pSBzMYajcqxp3m847pX0ZHeCuE3GmfortcOIBYNiFNIDVcQE5UzOPSjayWpv7n6vn4DiEt8XJysxWXZ7XiytiJFj28eZVPToESbraWInJW-kTXMnNFqIzQy5QKfUQWWcsAIf-kGgDb8HZkf9OFB4M9Ir4utim3cRtG3ofscr2ptVJjWA_rSyIlSDaBt2wX4AJpb0qt1FqEr6FGEFWYZ1WsS_aaeBHjYXMC6hbTaaqMAjGsPWDWpbT1Y_OFGjF05zY3x1XOhDbPEpSHdOLQrU2J3cbKNb0SjfBkzOdPQ2G711a0MdoSJcC-fw5w'
    return (
        <View style={styles.container}>
            <InsuranceApp appToken={token} lang="en" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%"
    }
});