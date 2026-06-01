import { InsuranceApp } from '@afrikpay/react-native-insurances';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3ODAzMDQ1MzUsImV4cCI6MTc4MDM5MDkzNSwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJmMDlmZTNjOS1kZTVjLTRlYjYtOGQzOS1hYjQyZmQwZTU0NjciLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Im9raHR0cC80LjkuMiIsImlwQWRkcmVzcyI6IjE2OS4yNTQuMTY5LjEyNiJ9.mOShml3OPx9eaxgRDNnJh3NrStH8qgvxaD1qeOrthaFRoxKWiivUt7Uk4Ge41LGsxYd2cqe09Pfj2V0v3Vm4vuCbwzqR_Ile2j93M9zfbw0co_jSORnElsw-mnUiVidXVmtSxuaQEtagtII-uM-JPzxKmYr2WeXjLcFlHEl4IZgIKHtTU8sSriSvIdzbHGa8D89OOLLcR5BuAR4ZQTRMRsKld3el9jDbFaBM_ND8isdk_Y3rj6mGherPXiXUbkCMxAQAHKuxcLQOzKEa6AVJzXfnwuxy-QxiXX3iSLfm0pZ1fDiV94DFjLLI0N8_6D-PpwRsJXJ5wV3RpCSFfYA8EQ';
  const terminalId = 'f09fe3c9-de5c-4eb6-8d39-ab42fd0e5467';

  const handleOnReady = (data: any) => {
    console.log("InsuranceApp is ready with data:");
    console.log(JSON.stringify(data, null, 2))
  }

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
        onReady={handleOnReady}
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
