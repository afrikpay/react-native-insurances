import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzMzOTA0MTcsImV4cCI6MTc3MzQ3NjgxNywicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJmMDlmZTNjOS1kZTVjLTRlYjYtOGQzOS1hYjQyZmQwZTU0NjciLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Im9raHR0cC80LjkuMiIsImlwQWRkcmVzcyI6IjE2OS4yNTQuMTY5LjEyNiJ9.QthhUlQfGX5bSVG0A1wYSzrspdcFTiIV8iQTJTxVt9F6GLBp7oYv7dWGUtBDOuSb98qFmGbKX3gawfmIZIcgIXQNQyH4I34dcOELnknrL7OhwIVesKHaNacgE-S2A1FI7L94LUClqrs4aFTvs5wUSigYNCw9jXj6wX4x9kerZmhuibWN6xOI5BVnchTNGCvpNHAaB6QE4tiBKFqEXaotJI6TIMtb-yRlQmk6o0ZTyOaAFkH6mhkxxBqf9PkIjCeTw0_c2BDOZSMJiLW35FxFZr_p24jB1S9k5hG9sEKH4O_g-kDyGPyxV2QUHIKqhBB3NOMf4hbDsFFoawAqDloJ-g'
  const terminalId = 'f09fe3c9-de5c-4eb6-8d39-ab42fd0e5467';
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
          terminalIdentifier: "f09fe3c9-de5c-4eb6-8d39-ab42fd0e5467"
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