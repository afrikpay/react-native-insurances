import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTg4ODE2MjksImV4cCI6MTc1ODk2ODAyOSwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI0QkRBQkQ1ODQ3Q0YxNTcyIiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.hhhgcJj0eRhtBw648Y_TPt91i69mXTTaOpUcb9RtFnjS6R2iTBCST4E25kOYaMmm5ugdr8rgbMzi2ejsCfu_94gkIfDf1b3t0vgUlYdqWMOcC3IUXEKDK31To2w2hwjxU3yS72FUQQHkbDl1WP_LZluDhAmnV_3wnVsivYG6QPtBfOF1NiLEN3PBOchvqdwqsJO14lVriySHIaLd4dSroxr3Z3Lru042SAb3CWmNTRUVUiOdV3fWVNCrTwLLWty-TtTgipoe4fCm4XYi1nWZCgCQQ2qrPR0V4ZDXGjjgSy-qlnJ4EiJTlOPG8J7v2IacRgZ278TpAedRlLC80ZQTtw'
    const terminalId = '4BDABD5847CF1572';
    
    return (
        <View style={styles.container}>
            <InsuranceApp 
                appToken={token} 
                lang="fr" 
                terminalId={terminalId}
                username="Manu Decca"
                user={{
                    accountId: 1830034508703473,
                    username: "237652310829",
                    name: "KENNE Patrick",
                    phone: "237652310829",
                    email: "patrick1kenne@gmail.com",
                    accountNumber: "237652310829",
                    idNumber: "1234567890",
                    gender: "male",
                    language: "fr",
                    accountStatus: "active",
                    terminalIdentifier: "4BDABD5847CF1572"
                }}
            />
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