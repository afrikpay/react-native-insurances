import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { COLORS } from '../constants/Colors';
import { ROUTES } from '../constants/Routes';
import MainContainer from './MainContainer';
import Assureurs from '../screens/assureurs';
import DetailAssurance from '../screens/detail-assurance';
import DetailFormule from '../screens/detail-formule';
import Souscriptions from '../screens/souscriptions';
import DetailSouscription from '../screens/detail-souscription';
import SouscriptionForm from '../screens/forms/souscription-form';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'float',
        headerShown: false,
        cardStyle: {
          backgroundColor: COLORS.dark,
        },
        headerBackgroundContainerStyle: {
          backgroundColor: COLORS.dark,
        },
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName={ROUTES.BOTTOMPTAPS}
    >
      <Stack.Screen name={ROUTES.BOTTOMPTAPS} component={MainContainer} />
      <Stack.Screen name={ROUTES.ASSUREURS} component={Assureurs} />
      <Stack.Screen
        name={ROUTES.DETAIL_ASSURANCE}
        component={DetailAssurance}
      />
      <Stack.Screen name={ROUTES.DETAIL_FORMULE} component={DetailFormule} />
      <Stack.Screen name={ROUTES.SOUSCRIPTIONS} component={Souscriptions} />
      <Stack.Screen
        name={ROUTES.DETAIL_SOUSCRIPTIONS}
        component={DetailSouscription}
      />
      <Stack.Screen
        name={ROUTES.SOUSCRIPTION_FORM}
        component={SouscriptionForm}
      />
    </Stack.Navigator>
  );
};
export default AppStack;
