import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTg4MTQxMzgsImV4cCI6MTc1ODkwMDUzOCwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI0QkRBQkQ1ODQ3Q0YxNTcyIiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.RlVuiu2TxUSQabD9sjPRD4nsvicDFa9gYmhrCuRrT_08jW7X9EOftvpPDsJK8-hallF5Ho6h6TaJnpCM2LQBWQ9xbspXxsjY0bvFdM0b_nA28B1_pJs3OIpJHidzH9BTFtbgCpLuywY_RTyQ5hdCD7ZiU5MNESq-rOi_Q2FUZWVCse3tUEW9Ou2p5HUH0APoaWwGWhtLlnR-Fjfi8lDDSlNLuo2RG7u8huIG2bjDa_yiElhkGcKxddNzfYXWK7IVs7g9EJ6fMlYhj6OUoRoHIf3CXgQgFn6vf1t-rscWJqLkCTeu3XlO2ug0bnBKAdqMciygW3Hv608KPmB4-9DoCA'
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