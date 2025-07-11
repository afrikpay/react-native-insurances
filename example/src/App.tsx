import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function App() {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTIyMzE3NTksImV4cCI6MTc1MjMxODE1OSwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6InN1cGVyS0o3IiwicGFzc3dvcmQiOiI3dTcwbzYiLCJwaW4iOiIiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJtb2JpbGUiLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzOC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiaXBBZGRyZXNzIjoiMTI3LjAuMC4xIn0.Dr1dq0qeeqmnsiBKeUtI_vaacLWPxDIq-EdpFc1QaC8JBDmURXe-NDDcjevmrj9R41SIZKNDAH34CI-1HTaK0m_7uxNSV7dOhrE4wuCwozu-iOwQw140H8EKir8jUp36a19wDPrhxhvDgB4EjxM-V6jYCbGCKlKudowEcX1vel7HqO6VcNK_WeP_ekiTnyGqgP892o_t1lWXiPTVanZvJkenrjfxSJhUBWjuWHDB_XGvaIAr4F612a6ZuRApbUdLLhr3i3nyLkK2pYGTRvskugnSLPx7lsn_n9nh--cBGsELx0iQhbvd3y5va0f_I7mPKcsEaoQtOAGlyQbk5pjNtw"
  return (
    <View style={styles.container}>
      <InsuranceApp appToken={token} />
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
