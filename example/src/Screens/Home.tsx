import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTczMTY4MTMsImV4cCI6MTc1NzQwMzIxMywicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6InN1cGVyS0o3IiwidG9rZW5LZXkiOiJNVlJFVFdvNWMyVmlhMEV2U1ZFMGJUUm1Zems0VVQwOSIsInRlcm1pbmFsSWRlbnRpZmllciI6IjBFNjNBOERFODUxREFCMzYiLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Im9raHR0cC80LjkuMiIsImlwQWRkcmVzcyI6IjE2OS4yNTQuMTY5LjEyNiJ9.i2ehr7AkL2oDeFEja5yORRYwNvfaNdFA2cxsOvVtXR4oFlNjIReT3qdtqGrDA-XrqehF_i8pAaizQ3EdhZUiBercFpJZ3x1AYFDZSnS1kAlpU5EA6xdlnYBTIJg2m6y7Fyi9D05qye2PBu2f9lT89M2eXvdZ6HXjxk8dpum6H8B9X8VlPAoxEuxY8D6YZc-h8QT6IJ4FOpkIRE-MfWYigaZ6xuOe7Rt-erZh7GP35Gav5Kg06_R16DnPurWA5dlwT5uBra5sHJ-v0lwF_fczlFg_9qfG4L5mxFtVjmDdwmJrn25kr2M7NmvJGmd6QcdBnhYk4CilIRos1zXjBVVBxQ'
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