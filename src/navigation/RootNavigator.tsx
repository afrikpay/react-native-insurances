import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { COLORS } from '../constants/Colors';
import { ROUTES } from '../constants/Routes';
import AppStack from './AppStack';
import { PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <PaperProvider theme={{
      dark: false,
      colors: {
        background: COLORS.white,
        text: COLORS.dark
      }
    }}>
      <Stack.Navigator
        detachInactiveScreens={false}
        initialRouteName={ROUTES.APPSTACK}
        screenOptions={{
          headerMode: 'float',
          headerShown: false,
          cardStyle: { backgroundColor: COLORS.white },
          gestureEnabled: true,
          headerBackgroundContainerStyle: {
            backgroundColor: COLORS.dark,
          },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name={ROUTES.APPSTACK} component={AppStack} />
      </Stack.Navigator>
    </PaperProvider>
  );
};

export default RootNavigator;
