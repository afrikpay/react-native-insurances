import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, StyleSheet, View } from 'react-native';
import Home from './Screens/Home';
import Navigation from '../../src/services/Navigation';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <RootNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%"
  },
});


const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer ref={r => Navigation.setTopLevelNavigator(r)}>
      <Stack.Navigator
        screenOptions={{
        headerMode: 'float',
        headerShown: false,
        gestureEnabled: true }}>
        <Stack.Screen
          name="home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}