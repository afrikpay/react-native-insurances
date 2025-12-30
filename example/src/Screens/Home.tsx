import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NjcwODkzODgsImV4cCI6MTc2NzE3NTc4OCwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI0OTEwRTZBMEM5OTM5NDlCIiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.F0aG-taT2fKnGF86T9KiumD_wAAH5WdjP0vupu7fvp6PE8hXPTL9jDrpzBpT0AO4fZii1ZmTmFcnMVKoc-Fu3Q0P7EKtMTLr4NWYRn66Ux6cEPvVOKFBZmLcXZSVTcsmMX5B9xcHJH-w5POzYnC9ns-JPcC9D8AoQ2KezZks4qFtmN_sQWPNuf-4uFRcd6ulShCvotgi8S_yxwf2gzf_BNjPEMEf2e7bmlebNc3KOML4ff-YFefERcZ2v8Bp3MXGQ1Kjz8YkjTXPMjApVoyzMWndb8EW3Y8CO_vYi4fN0_q3ax10CYXtwTIlLvKRMk7Ks0vtr7OKJK3jQNEQ43-sdA'
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