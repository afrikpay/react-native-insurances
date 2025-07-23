import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function App() {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTI4NDk5MjEsImV4cCI6MTc1MjkzNjMyMSwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6InN1cGVyS0o3IiwicGFzc3dvcmQiOiI3dTcwbzYiLCJwaW4iOiIiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJtb2JpbGUiLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzOC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiaXBBZGRyZXNzIjoiMTI3LjAuMC4xIn0.M5j6WyfMsUHtgEp94vRbrFtoCFJ-96M-g4TOfwfJXdrvNA-cOXf0Tor1FeCfuPMS00qO6fk7OQqeclTU-JA4gq6HY9_j9-a2o6koaGwhdU8_SugKmCn4TRQZgMRVzlyLTWUrke1vVvQ397Lv2QPU8ALywX1BgFX6s5FhWdIM8wwm24yN_Afh72F4D-CeHsPz3LiVYU0tgaSzA_H8uUI3Jmz6AUBCKCHX1uFgou-5MLmRWbShuUiA8QLSQXpZDtn_4ulZHmvdpE9xylv9FFPmNnW5Kfcf_2uKmnffS4HQYFWvdMoeaX9u1BJZ7kFWJIQezce4RQWf0Qo6VgDNNC9c2g"
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