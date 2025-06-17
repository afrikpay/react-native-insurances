import { StyleSheet, View } from 'react-native';
import InsurancesGateway from 'react-native-insurances';

export default function App() {
  return (
    <View style={styles.container}>
      <InsurancesGateway />
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
