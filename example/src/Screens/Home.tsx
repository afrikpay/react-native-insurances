import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTY0NjIzMTMsImV4cCI6MTc1NjU0ODcxMywicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6InN1cGVyS0o3IiwidG9rZW5LZXkiOiJNVlJFVFdvNWMyVmlhMEV2U1ZFMGJUUm1Zems0VVQwOSIsInRlcm1pbmFsSWRlbnRpZmllciI6IjBFNjNBOERFODUxREFCMzYiLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Im9raHR0cC80LjkuMiIsImlwQWRkcmVzcyI6IjE2OS4yNTQuMTY5LjEyNiJ9.FZbDvGQvCMcuEgpe4TlZ8j0xV__YbIw1MWi562HpewfmBSZpMXZS_ukQ_QOGNIaO2IZChJfQephnzO1nFk3HjRpNtfVP7thW0fIzIxoXRPo1YmjkD620Bnv5btKj7qc552IBOTAh9GxeEWbFp0ZCIYcj_1MHZO6U3EEa0kfWqd7pZ6lwJeqrCtQrly2FxEFM9UcNBIQFqa5aHtDzMShGg0aA-qcoXi7f30hWBBTa-7HdOumulJEEj9fUyHpipj69nCHLWS_yR6kPZMdT2FRNZHpMqtxlMzkBCxpXwgqGKReaH7qXlBJd-Rmntxx2Qo6dCsbvx8Zz30XKpReaubjj9g'
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