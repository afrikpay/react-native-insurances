import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function App() {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTI3NjQyODIsImV4cCI6MTc1Mjg1MDY4Miwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6InN1cGVyS0o3IiwicGFzc3dvcmQiOiI3dTcwbzYiLCJwaW4iOiIiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJtb2JpbGUiLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzOC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiaXBBZGRyZXNzIjoiMTI3LjAuMC4xIn0.UNBO0FeOhZF92cwdCgUb4MXaSiFdaQYXYcEoS8PSYwfDVguw6HnaNadTOXVd6CB0-ghcCfGxFeG31XvIOEVi9HzQD1eRPjnoCPmfUCnppXTEjDoLwyAY9G1bpXwh9FAda2-MhI_pnvyrJISJTZ6rbSDMtvM3Qzfdkj2-OWzR4k1pO6FTkLLrwp22aZ9aIy9j4UHyH3y2o0w6IMtrYoztubXILe9AzEYaqrRkMlDYIvu0-Ncy2qCprXl9ki7pvf0QFBzixPdCJ1p5q3S7-UwUE52AyBSbEPVZYZcbSIZIpYBU9JDUMKVmpZaeUMO0ekaUKwlmGhU1uCLMPDhpKrBSaQ"
  return (
    <View style={styles.container}>
      <InsuranceApp appToken={token} lang='fr' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
