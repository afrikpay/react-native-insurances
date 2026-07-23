import { InsuranceApp, FetchClientProvider } from '@afrikpay/react-native-insurances';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const handleOnReady = (data: any) => {
    console.log("InsuranceApp is ready with data:");
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <FetchClientProvider client={{ fetch: {} }}>
      <View style={styles.container}>
        <InsuranceApp
          lang="fr"
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
            accountStatus: 'active'
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
