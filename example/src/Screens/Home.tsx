import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NjY1NjU5MzIsImV4cCI6MTc2NjY1MjMzMiwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI0OTEwRTZBMEM5OTM5NDlCIiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.iYKbnvXnEO5tGFFId49e7iGsHUXbUS1MGZpktBkJv6JYMsHfm6b3W1aImPHDw_pZKx2j7sSfxvp2EuP2nZ0iagdRO1mMm_DA4vVU0jLRIgI7_mPo9dmc2MOLe24DUisSpxdEPlrQvmax4pY_1FIwYBfOkwEiaOUrNl_9XEMoNEOVH2qdTBOD2bOrm29IJjV7WB0AgJsBG6av4yFIxr6FAP_lFQ1wiWApyfI0CWtZXrmz7E4wX9tnpFNiLhVTU-_i-1L1IxZAGA3NODijxxsFfUTCijaFRSjuRj8zYMfFGGDJcTcqIrDrPd9GHcV3fLQgD2gbFtTJgQpXshoyEERhwA'
  const terminalId = '4910E6A0C993949B';
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
          terminalIdentifier: "4910E6A0C993949B"
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
})