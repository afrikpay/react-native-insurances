import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTcwNTkwMzQsImV4cCI6MTc1NzE0NTQzNCwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiIwRTYzQThERTg1MURBQjM2IiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.c-xNyZ3MBISrr2VNsYsq7xY7X0-vuQoTc0siF6wob1TlYkpU4ytQb3_VNf_WWWA0CMoNZUcBpRlEzu-ca5jbREfTVQsyK6Mc_UDaLJKJTZKLjrL36oox-pxPbAIuuriv0A1Y_doiTCpeQKfhFjQXA7XIO-ZbDbvzdX9AHFs11vLsoOVozquoP2GloMUe6ZPtdHMK8EWm1d6nMYhumCR_IZJZoOEjIgbJxqxjcZHL3yvWKUQuD17_5X-xp-prnAc7_0PBmORxVUB-WpNyYJLofcxb0jXwx10L4HAPx_iocRCO63PtfM9cU5UQd21UT3BiZgdS8ND3v3ekjU1oP_wYOg'
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