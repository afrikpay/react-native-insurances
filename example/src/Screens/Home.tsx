import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTYzNzEzMTksImV4cCI6MTc1NjQ1NzcxOSwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY4MjYwNTk0NSIsInRva2VuS2V5IjoiYUhrMVMyZHZlUzk2VmpWbFJ6aEZjVVYzWVZSbFVUMDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiIwRTYzQThERTg1MURBQjM2IiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.H7E2mj7CHq_ml50AEPsr6wK7RnSfCwxaHHhujrWBaNOMKQVyuIUn0P6mId2CCrLs_lpo1Jp1NufW1ZQBPE8w6vDeLWOTkqlN60VIrNte8oBV2RMyaWmDvuXOSYdJMkL-pRV9cqZfHNZwBNExXV7Pc_qZLIluxrG_MWLEmCELrjBgM4-dwuGSAifyfNONfgfy031V3fZkVRYt2QkTSyZkDzl1W6KGdWfGwPxFsfffwAuSWBlGfLc296neArxYk0bVELZT1xAdhAfU-lzInz8b5oNFNQsH0eDAjQcyrI5_injusSLd9ofy1XpA0tpvd9_Jyzj3fsye4ZXgTS9bZylWIg'
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