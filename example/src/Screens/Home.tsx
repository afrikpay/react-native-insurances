import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTYzOTI4MTIsImV4cCI6MTc1NjQ3OTIxMiwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY4MjYwNTk0NSIsInRva2VuS2V5IjoiYUhrMVMyZHZlUzk2VmpWbFJ6aEZjVVYzWVZSbFVUMDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiIwRTYzQThERTg1MURBQjM2IiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.Uj3OiG7J7zB4Pj4OS7tkXvpF_gvwF205Aj7JItV7fGv5riRwEo7g3BenHnWbG3eMwty3gs0kt-QVes18cjy_YFhwSxD5NKv5pq-DpN7jd01CO6PHHWdlGkdBP5kJycI0jchKvq7kkkCZhzFbji4cxR2h7Mnn_pm9TCv9mqZMarMyzp5jy2CFiGxAXsqNaRil7vYcDDx7L1L07yWJYyZQRiDm_G8DvQDucvcHNZOVW1fjXBjVi062gFUBStjcWLib85d6dNxtKRDsd_QKJDag45TWi4jnL9Y7dppl2aAXMPttUxOSb_GqyE2lb2-Bdf3ymVJPwVz_aTWDkbFLpYG1og'
    const terminalId = '0E63A8DE851DAB36';
    
    return (
        <View style={styles.container}>
            <InsuranceApp 
                appToken={token} 
                lang="fr" 
                terminalId={terminalId}
                username="Manu Decca"
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