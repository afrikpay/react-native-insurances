import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTgxOTA3NzgsImV4cCI6MTc1ODI3NzE3OCwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI0QkRBQkQ1ODQ3Q0YxNTcyIiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.eHc1TGb03_KUkfKBRvnE8nq8la38YdPt0J2OFiQMG9855ZtwdyFwKG7GO-Nv2EYAefWBiMftFFB78s_tKQQ3ly3JV6Q4K8WZim8ihRkdMlFRP4yLkJsU4N3yCriRHMzTdwKJwG_GzZTJhkOXN_d6SmHBuq4RsUc1B-0rviracacmOG90t4o6-VBhH7hWRNiUp-sIuRiFszDWSPiuzbUeu9LoZL4DeRra3yA2R_yqzIcDeeOAT-WjGc9r7CdQA0qw8jWNXquygtx0DHQg4p03bIIoOnHvaSgy58me-OR6OhpRuGohZfowj7BWwSrTrlUfwSozvweJFhe9_3_JRZOzFw'
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