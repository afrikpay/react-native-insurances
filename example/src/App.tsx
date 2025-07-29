import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function App() {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTM4MDIyNTQsImV4cCI6MTc1Mzg4ODY1NCwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6InN1cGVyS0o3IiwicGFzc3dvcmQiOiI3dTcwbzYiLCJwaW4iOiIiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJtb2JpbGUiLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzOC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiaXBBZGRyZXNzIjoiMTI3LjAuMC4xIn0.qtJ8DW1KIlstKqLvzul-dUF7p_Ps-XXnWiRF4c1WUb30fXTW0BCjjHIAikowmhE-EDky4cXrCWfg0UXff8tdkbw1gVmjqpHpT5T2eyWqnxUofykl3iKMyb-W9ciyEaHGiGZtVwj7W7C3YSuYc9O7KkyE2GHErfP3woV9F6YrhJ2ulkS4BM0jm-Kh00gmdy_ohRQBwVhlhz7Vbq1lrHr9_C6sFqbQLvm_4gRJjfmaAxxzv9sOXpPtTGg1ejOi8DwSas32Uu43c1wj_Qs5KrqIPCkLUJCKRfJgyNBvJtrKMxFI2sS1C1LP0_zXgx1be7SCJbvgDfJ2EYqDPgAaPCRigQ"
  return (
    <View style={styles.container}>
      <InsuranceApp appToken={token} lang='en' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})