import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTg3MDIwODQsImV4cCI6MTc1ODc4ODQ4NCwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI0QkRBQkQ1ODQ3Q0YxNTcyIiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.nk8ia3g_O7HkoQ9nAKHqJLnf0-JR55rwodIUL22Atmmjg9829Ooblmgdr1sl2f3KLrbUFDdS3F0p4L3Xu8-Aov9AC_jKGIp9FGR1nocEKOQ29AcOdIgrSrxCcAwTS1OOxwyg-7Kgs9ApTqJoFbIXiOVy5NKNoVuU3ufS1KxlaQm26OK40ysDiljFGuVJytkMSnM6BvAsdFFUYx--ZygigHCPocuU7UsHekv7wYc4Td31qwn3sNh7eNJ0_9KbjIbVtjvMctDR-_QLODY1OKc8L7vxigflmqfOkEi6evpwdHP8_N8iBzjFdbKHyA-qSVXZKzaameBx9ptzh13TWzXFGQ'
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