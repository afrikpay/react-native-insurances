import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTgwOTI4MTAsImV4cCI6MTc1ODE3OTIxMCwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI0QkRBQkQ1ODQ3Q0YxNTcyIiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.c4EI1lBYNqOMVZawhTwCeDELLisozksILTUCNGcRsvtFXpSXj-NIA9iwOWmZsHAQNPfnRaxJ3VjdgGNJOAsrG49gxAu9KpBVBlSFwY36k856_9UoTfba8TovIMyBer0wBt8JAX0P7JdaMK2gbp49SnUVekSsJNa_olXdGLoce_6rsN1ER-yj6sbE103hTEArHle1r_qO8ZiC6RzyCtfeKixVPIOvJCbThC1kTv0A8MLWq3NOWTrac7FZr-nJdQLwvOLRDw-Ga63Gou3-XIr-oHOKwAQBS1v0Tv5g69cFE6IrQg0GWWTLpGipGmaBwIVl0blRlbAxSiyjijwHSWjlXw'
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