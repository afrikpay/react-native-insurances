import { Dimensions, StyleSheet, View } from 'react-native';
import { InsuranceApp } from '@afrikpay/react-native-insurances';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzY5MzA0MzYsImV4cCI6MTc3NzAxNjgzNiwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJmMDlmZTNjOS1kZTVjLTRlYjYtOGQzOS1hYjQyZmQwZTU0NjciLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Im9raHR0cC80LjkuMiIsImlwQWRkcmVzcyI6IjE2OS4yNTQuMTY5LjEyNiJ9.IlmxYsK1a_3yr9sq1MaiRSHgtDLJdUIK6zjP_W9Smv4ie9estgT_-uRDO3eYJTFU1NYAswx268rP3cFmPFB9Qrt6TRW_EFeat2_Zn3DlplmrXJPTBwhZ5reiaO8SYbIxZPMeJYSlIy13o_wxqui-OAPQTW4_r8V2qjwGSdktb_bKS3XwD0eHl4QkZR4Scd5g0erNRraqO1CVER9LTSiVR-NupHAtf5WMa6LTOLNnFfI-u2yXL0vNtYC6jL7hUWEIalxeX9OhoDXuypQ4JwI2Q1aAv0FSqdBL9RrAgHgCuLP3eE4QBsqlHhEy5og156an8ECONfkqCmma_igxfW2pJQ';
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
