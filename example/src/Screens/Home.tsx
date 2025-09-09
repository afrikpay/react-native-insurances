import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTczNDk5MzgsImV4cCI6MTc1NzQzNjMzOCwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiIwRTYzQThERTg1MURBQjM2IiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.IVWT0TwdwVXuFMKzkk4aVMbjpclhjc1Ms5cIbNPMtq4b8_2qLpLxtGeAo46sBEXbkQHmXcPyEhYMPF3PWlBsRyln73fVR5GPypMSvS815OrDxiFg8DBGuIulmF59StBot1SLKsFVrIiyUt8vaf5ajtGD4tXJmGdyL9pDy2xO4KHJw4GeaYghVPMLk0II4PnMOAYDb16npah6sZ_c8vT_Kvz53cFDVw1ORv5vta4SpQHYPX6z2bAPH7ozivDj4xPJBYJCgqKV_gWPpjU3w9JuJ5RE2idnen2VcnWzn9CAYlpIerZ758wOV27rW8ceP9rm-g36rQhgrSd8rn67vCFAGA'
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