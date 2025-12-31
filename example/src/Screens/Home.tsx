import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NjcxMDM4NjEsImV4cCI6MTc2NzE5MDI2MSwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI0OTEwRTZBMEM5OTM5NDlCIiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.Ro8On6hM25HIdmGJdwGP8AQ3mC4KbQSWVeTq6ikFJYn2BenA62-U3vHMw1L5q8Tm3LLtEMRiczONbF6Chr908U4haKwJHyTehNooiWHA3ok4sBtwrFNchXdBGTRHMTKBzg2BFRz0_yzOTQCQIwHIFPGnKQHpIn6JLb03nuvxx2WLNF5TuUJ60lulc_T-gGWeaju5bsUz5-AnnXK2D7feJjhx7gm8GfXZcekFNzcF5A9X5VdgigH6QxJpzKxOx-PaqLjWj5QOB4dMR-g-dZ9O3rz8o9Ah02WIRracYCgSzXb23GghkUfGQNRYlzUW2B17av3srIuxuz-dtMtfAEb-DQ'
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