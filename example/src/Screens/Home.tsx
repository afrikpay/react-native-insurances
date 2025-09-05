import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTcwNjU5OTMsImV4cCI6MTc1NzE1MjM5Mywicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY4MjYwNTk0NSIsInRva2VuS2V5IjoiYUhrMVMyZHZlUzk2VmpWbFJ6aEZjVVYzWVZSbFVUMDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiIwRTYzQThERTg1MURBQjM2IiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.eT8KkH2CamaQ7Dw8xmKzhTNWP_ZifpxTW3vg3AtmFVjfhziTQed1tKJ_DxtULLcygZbatpY6oqC-MktcLahSMLnO-FyIlp4X_4MCd8EhWBctnXWf2JiGrajfT-UIa6A0JEZT_lzXmMas3HTuXJeAyE6RVAFL4CUTrCew6NlOqO-XZY7AKbDiLddGTBZNowzEezq535ZOmtq-Azc4N1oX7rdxRRQv0srLfsKSgOdX5pd3NYSxvcArHdwmznRlM6kyeZiwIsr0gr0LrVI78IDbXdI1ZXH08oRunewm9vSfTbLE3yb9eq-eEGL8IH5-9z6Or3DBQBuc9jxmxuBdHEgLLQ'
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