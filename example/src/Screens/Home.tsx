import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NjY1MDE0OTcsImV4cCI6MTc2NjU4Nzg5Nywicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI0OTEwRTZBMEM5OTM5NDlCIiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.WIIpqbaUPg_Jwr2AfadBoGbbADzKteb2HK7qjmsq0IZS7nXitHSs9NTJGAEOyttrEa3eDRxYByDutTSqd4Usb9GeCTdWFhdkwgn-YEwoDrlvpRYpg0Fqo4BVUKhfITxBLKKEFL8egefPJOyhrmd8qoV12j51kfkDkzHuxYd0Lhaokncwf_WQThQccs3eWpkp1xt1KnQzbdi0lTMb16_NJVzL31vGVOQW56iwh8yMdDseeqX-hs-EXC0krQ8GWNEV4ucyZ-EtC0DZ_PERWyGSBQvygFLN80Nz-q90CgTaAfOHdGNdoHqgfXFRlq84Vbpbdgm_VJBVathmeUD7GMoPwA'
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