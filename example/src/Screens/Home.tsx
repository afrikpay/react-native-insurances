import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTY4MjA5MjIsImV4cCI6MTc1NjkwNzMyMiwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6InN1cGVyS0o3IiwidG9rZW5LZXkiOiJNVlJFVFdvNWMyVmlhMEV2U1ZFMGJUUm1Zems0VVQwOSIsInRlcm1pbmFsSWRlbnRpZmllciI6IjBFNjNBOERFODUxREFCMzYiLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Im9raHR0cC80LjkuMiIsImlwQWRkcmVzcyI6IjE2OS4yNTQuMTY5LjEyNiJ9.ep9qxsK6Jdqfx5sw8NZPLfaS8jsUmOkX88rGy5gqu7GvxjLnNqNcFUQXtHUL3ohjlc_MhYd79RUtCTw1cdxBRRN4sl3R_XjXRHI7hSb4LjlmpAOhY1whMpC5tolhr6-9LyD3xJVNs1kCY6zGMTPXQZNGMJLR6kbGvVRC3nskyis9Uqg0ar4nOek7rkuiKQsua2osNtoLQYjGmUrZiFLeyAROpX3cXgHskyJW_5VlGmuhdahtHXFIanq5HMyZHgGa6XuBK4lNi7y1v5-03hYVNIVC1NU3Xdtw1VTIireStPpIu0ucsKC_efAF-3hcxhQD0C-56Jaq51HV4WKubqXm2Q'
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