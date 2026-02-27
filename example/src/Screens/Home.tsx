import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzIxNzkzNTYsImV4cCI6MTc3MjI2NTc1Niwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI2QkRFMTNENDlDQzA5M0E1IiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.X2BPF3n9iI-CmEPbXOVwlTAU13q9YVZ3EBKbVfGBx17HGdBV3kyUlaibhn3WnMcN3FUI_l1a3pGzzj0FqLTmAv5S-QVP0G5v07LZoPef3IEzDbUWhOw0L2xsaHlVo3fuTgsatOYMbjP2lM1gLZ8kZbeI1-gKdK0pxFJaM1sR7-K7XHCWhcswXsPP_Ybx96MNPf-p3w64P2LcXOWErXniv1p4jMQvTrpwRNauE05xWuds_Bymn0oLGrlCRulgciq1vMapG9-N9dBRYtKujHhYcvbiOBFibAfS94oEF4fuKQKgJX033fmVNfYnLFQfoJ_eL8XrVUVDrwmdN00RTWwZeQ'
  const terminalId = '6BDE13D49CC093A5';
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
          terminalIdentifier: "6BDE13D49CC093A5"
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