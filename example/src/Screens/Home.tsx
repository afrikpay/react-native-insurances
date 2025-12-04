import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NjQ4MzgxOTEsImV4cCI6MTc2NDkyNDU5MSwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI5RDJFNDA4QTRFNjAxRTM3IiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.dJ-Sh_yiTry0GWESPSKazx3qKxi4NXrVcV7HeV3IP49A4uSuIhxlbbuehA_1tGgNGHg7cd_qzI_iJ8pBdNka4p6MMNCF9Ln-TvdugTQ_BvleZ3hf1-T27dG7chTyDLLaQke9w3IoL3R2gYhfHr_h16rwgoyjh5Yt802xiUfbHejyZpjknzGbZdej8iDNPs7J4VcPmeuXB-GT52vRx8HMXgSEoMmw5rXyB1uRogewioDY8Mp_-QoGAHgtodTE8RSUvQOTQXIMvw0eMWinqF3frF29XFwD0SAh2WiM2h6yUhC_Gw3gsfDha-JD2S_584cXf3H5u6P3SNyTvhjB_NYBQg'
    const terminalId = '9D2E408A4E601E37';
    
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
                    terminalIdentifier: "9D2E408A4E601E37"
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