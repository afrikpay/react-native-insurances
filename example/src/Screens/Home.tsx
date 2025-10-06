import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTk3MzU2OTUsImV4cCI6MTc1OTgyMjA5NSwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI0QkRBQkQ1ODQ3Q0YxNTcyIiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.vsQuWE61fHMbD7ff3Gv-A3RICS8SVMudex9f0a52SEWJJY0vvi8gWymw8_Y3-1NZT-zvUAKPcvkFN9eS7dgsfI0KWh3GUyBg6jolmY2VDY3voa_lMMcfiNBPjj7kGt56UDQxrHjswvGu_rMIXFd-bJT-CDqLQITSLMpDf3grNs4ib9PkTasO2cbKagNF7FPVqYWn6qWpcJvHH08dhmX_VO3krAOwi5d52B--DZdlOlg9QcwujOTelHve3NMrsQbzcrI7vJbx4E5GQ35Vq-Cb3iAFsCTi21RU7PrbqQCpGMxUFAeMRyJchK073t7h__-Wx2Er2VdeEbcGwyvluv-7QA'
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