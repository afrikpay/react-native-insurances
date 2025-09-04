import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTY5MTk1MzIsImV4cCI6MTc1NzAwNTkzMiwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiIwRTYzQThERTg1MURBQjM2IiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.MHMm4-48w-hUMd4l4oTAEEmbek51-X_9drTd-SYOHSfMPEwYko1mQHlqyPF0FsOc7bAZgg8b3X0N_eR-7ZMRE7x5_XYeK2ok8CQBeHA9Io8fDywGDxaEmtVfk3G6TLtcuIIwPx3JR-_ifRXIfZN7Ol9NxZTbvG-n64xzyZHtxsd2Oevy-K4VLrJ-3QBoJqaLBRXS833HWvoveXgYwbiCP6pdZ1CErc9pib6Uj1Nw6y4DeviUg63SMggBtmrCXHqQ9Yy56ATLjzZlTBJIgET2BosYR-ZZHzgjCD9Dw0pzh5VHVjfyr9QMibaulHpX9apAbf502wZ6JhqAvW-I87zLWg'
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