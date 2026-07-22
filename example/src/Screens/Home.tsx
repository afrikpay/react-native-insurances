import { InsuranceApp } from '@afrikpay/react-native-insurances';
import { FetchClientProvider } from '@afrikpay/react-native-insurances';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3ODQ3MDY2MzAsImV4cCI6MTc4NDc5MzAzMCwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI2ZDdlZTUxNS03OGE4LTQxODMtOTdkMy00ZDEyYzEzMWI1OTkiLCJ0ZXJtaW5hbFR5cGUiOiJtb2JpbGUiLCJ0ZXJtaW5hbFVzZXJBZ2VudCI6Im9raHR0cC80LjkuMiIsImlwQWRkcmVzcyI6IjE2OS4yNTQuMTY5LjEyNiJ9.Vl4ULTgC62OiCN2D73kbCXIuOKIgdueiiGM94oS3gQFO5ghvKhLbxk-gJgFsBblR9h-nNFtniMepAkAHDyCIsAkIWOspTLrkm-SzGCd5yb-xofttYdSQqsUxbn_0v_cBbirtS0_MNB31M-Zyu5RRhYEzTiFQh-p0sx7kYjqHeIsrZ8BfxeLVtZBgnpfkzkfH5boJ9I18I2PJUhPUsVr3GMv2gZBEHE1jCnvMWQ_A2GZCY-GiZKiKdHxeZUvD7XhVs-hsZBLd_Sp-7gV9tDFrxTd5hSTIfqsO8r-upvu4JwnH0wvU1-gkW6EROGTx_DRwvHJkUx0SK8UG-2TCdeZ6oQ';
  const terminalId = '6d7ee515-78a8-4183-97d3-4d12c131b599';

  const handleOnReady = (data: any) => {
    console.log("InsuranceApp is ready with data:");
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <FetchClientProvider client={{}}>
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
    </FetchClientProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
  },
});
