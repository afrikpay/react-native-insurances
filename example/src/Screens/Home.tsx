import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTg3MzE5MjMsImV4cCI6MTc1ODgxODMyMywicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI0QkRBQkQ1ODQ3Q0YxNTcyIiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.mrts3BowI-GyOts-_QyDzerwPS2GMNVMBq34ENWeFzS_DDm5y_aYvDbY4sxFsqDd_5bFmo6lSppq261VGLwf13gu0Jq_TztgI8Ssx7OX_LegVxkjvyUuCaAuBa3-hivKiAQWGrqoL0hndQwLoUsmoqv-tvlK8jitlCv8yVN5ZSQfsedeYh-AHeZl5BXO05dyeoc48KH61-foxp3GAd8BdPft-lNiepGWC9FEZX9Pz4icrWSOx1g7DvlMQV3RM1_xZyu-1ttPI8cdNyryS6MQyFfD0cTnSC_i4RGGPuCFltldizcsADsSN1OzuX9LI_MLtq_Hl_PStljVN7W6cR7QMA'
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