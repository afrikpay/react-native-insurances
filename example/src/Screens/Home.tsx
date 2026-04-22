import { Dimensions, StyleSheet, View } from 'react-native';
import { InsuranceApp } from '@afrikpay/react-native-insurances';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzY4Njc3NzksImV4cCI6MTc3Njk1NDE3OSwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJmMDlmZTNjOS1kZTVjLTRlYjYtOGQzOS1hYjQyZmQwZTU0NjciLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Im9raHR0cC80LjkuMiIsImlwQWRkcmVzcyI6IjE2OS4yNTQuMTY5LjEyNiJ9.GezlOiOl9rZdmb9a5Bzgipi2p9SuIzS14fMhQ0pMIYpYaNt6rqrg5m9Qz_BAn5ZhMw-I11cs25WdhoBGP51evf-ykteimCW6kFcTk73q3s-WIH6WKyC7cLmUq7U7xp8S296fggs3a6E-niwCxYn_4YOVrC58Dr35fedcSfYo4-GX6gvgx7UKTtIWmofEVMaVXUoLAknhcKuQNmsNARNJMpMUm1dtzFH4GCwB9tsE02Ng9DA7kcmAhIZWNyZsQmrFoGMqDEweQNh6q5OabHkMM1ne-X3bvBSsyqfSsRWTAvFFhgSpF2A4y97fQ_xxXIl3qEW3n_-mJh5Htb08uhZpRg';
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
          username: '237652310829',
          name: 'KENNE Patrick',
          phone: '237652310829',
          email: 'patrick1kenne@gmail.com',
          accountNumber: '237652310829',
          idNumber: '1234567890',
          gender: 'male',
          language: 'fr',
          accountStatus: 'active',
          terminalIdentifier: terminalId,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
  },
});
