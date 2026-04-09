import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from '@afrikpay/react-native-insurances';

export default function Home() {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzU3MjIxOTYsImV4cCI6MTc3NTgwODU5Niwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJmMDlmZTNjOS1kZTVjLTRlYjYtOGQzOS1hYjQyZmQwZTU0NjciLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Im9raHR0cC80LjkuMiIsImlwQWRkcmVzcyI6IjE2OS4yNTQuMTY5LjEyNiJ9.EhGu-TuoB7GhpPrdzKmA1cTG8X8WcOUQNcBqW0Iw9Q-QeSaTjOnRMxKkbKES4m9Rv9cOb-hzoaAT0ECqGlk9cvPfo3uAQeHGsIGl5sDfLkPuYBVhnSZbhIib5QhdyOtfH4Q2DbsojRXyRpa1WUnzLl9eHPoOdrf9nIJiNnYff1pDrCepXGqGwZyxmp3uz-h_9uW2zLBUzkOb2_sZqsmw_2QnvSIpTi1MiSlULv_bAjU8GZ7Zw5ZREPfvMkzgdxhCZTqzLJzEzj5cvL-oqdwz5HgK6bKYwovz-vJDaVBYXnNwKYwXYMnt5Z8YRi6Nq5rioW_Y7WdJl18HY7y8PWRkzQ';
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
    height: '100%',
    width: '100%',
  },
});
