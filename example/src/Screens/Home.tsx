import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { InsuranceApp } from '@afrikpay/react-native-insurances';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3Nzk5NTQzNDYsImV4cCI6MTc4MDA0MDc0Niwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiJmMDlmZTNjOS1kZTVjLTRlYjYtOGQzOS1hYjQyZmQwZTU0NjciLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Im9raHR0cC80LjkuMiIsImlwQWRkcmVzcyI6IjE2OS4yNTQuMTY5LjEyNiJ9.Q92Y3BfC9Qm9IQiH_1Ldvq-Sw7sw1zW1lvM4LrOZdUOclond8mrbsO3CvyfLvuxTGmUOl-dOCBKbHrbIKb10mxKGlNSOb961hWiAEhKbCOczXKoTOmuks-raxFvcEBMuQNsUm1jYutLqnIrrtc2ndlxvGcH4-Ub5dnb9DK-KkoYxgi5J3DmmSvkIkuxWnW8QN0cv7sRa06eVTUxP3qeG12Qgguu7IiSvG9VRs2Rl9oqfwhM9hBRODLlo04qZ2T07TCMn_48FN_8S4MdKHx3H2wrDjFVeX-g8ZaxDZLOWREgSaPDk--6lzBOrk38pk0IltiMbuunXsI8j3Myobl5R0g';
  const terminalId = 'f09fe3c9-de5c-4eb6-8d39-ab42fd0e5467';

  const [step, setStep] = useState(1)

  const handleOnReady = (data: any) => {
    setStep(prev => prev + 1)
    console.log("InsuranceApp is ready with data:");
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <View style={styles.container}>
      {
        step === 1 && (
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
        )
      }
      {
        step === 2 && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading...</Text>
          </View>
        )
      }

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
