import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function App() {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTI0ODM2MjAsImV4cCI6MTc1MjU3MDAyMCwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6InN1cGVyS0o3IiwicGFzc3dvcmQiOiI3dTcwbzYiLCJwaW4iOiIiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJtb2JpbGUiLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzOC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiaXBBZGRyZXNzIjoiMTI3LjAuMC4xIn0.mmH14ErGD_omAu_qfI-uC7EJuQMKPloiCIb73olwL4r0t1o-8OjLL8ZV2FuzLNFE5Opea8KIVdlisqrAOFrAcUfudwY3MaAOtMyKVpFdtYMG16s6gZVwqiO5R3uVz40odMGFVaXRVTv7sn-Tx47tN3KEOqDxJAsGQccBaWzPoA9cbz3QpmTcIFzR6a5FS92ble7yWs5Ot5bGHJy90kJO_DVc8QQe18eHMWVf2hiuPRmZ4DaKG_DxC5odHY31e-7DmV4s7F1rN_M-eJhCwoksA_wdrxckdt0LMSXurXR3IQIzQultZGL8vVxPpzB4HCXBOGOA6qTjn514iO763txzBg"
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
