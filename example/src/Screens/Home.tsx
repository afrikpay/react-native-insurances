import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTg2MTQ3NTQsImV4cCI6MTc1ODcwMTE1NCwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI0QkRBQkQ1ODQ3Q0YxNTcyIiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.nhmA-TJQGd-nj-iJEVqLGjO2J_KdaJz8qISsmXywobBo2_XHYUxtSafxQDM7XEOc4kV0VG0Ypv-ujlbNzZeAODJxydoG9aKTdmV1mE9TIZmANNS1dL-QTscR_BP0Vm1C-O1BvtvRJoMTIqeqXm4VvrID-v8QCt3vOEW_rJWeXIzi9ib46bDFu7_4hhkYjOVbHBVlUJvpRYvUYz0epVey0mnxC9ix-4oZCdCWdmi_IlS1E5Z1XmrdJCHDqoOr3kfIGDxS0Ujr3lDD5xJBZOdKmHrLvEReAyeePi_kjd_HXVjtBKTwJk061t9wJpRrgr9dfWfcguCf5qo19bQymK-Xzw'
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