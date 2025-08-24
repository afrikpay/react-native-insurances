import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/Colors';
import { ROUTES } from '../constants/Routes';
import Home from '../screens/home';
import Infos from '../screens/infos';
import Products from '../screens/products';
import Souscriptions from '../screens/souscriptions';

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={({ route }: any) => ({
        tabBarShowLabel: true,
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 2,
        },
        tabBarIcon: ({ focused }: any) => {
          let icon;
          let rn = route.name;

          if (rn.includes(ROUTES.HOME)) {
            icon = (
              <Feather
                name="home"
                color={focused ? COLORS.primary : COLORS.gray}
                strokeWidth={3}
                width={20}
                height={20}
              />
            );
          } else if (rn.includes(ROUTES.PRODUITS)) {
            icon = (
              <Feather
                name="package"
                color={focused ? COLORS.primary : COLORS.gray}
                strokeWidth={3}
                width={20}
                height={20}
              />
            );
          } else if (rn.includes(ROUTES.SOUSCRIPTIONS)) {
            icon = (
              <Feather
                name="file-text"
                color={focused ? COLORS.primary : COLORS.gray}
                strokeWidth={3}
                width={20}
                height={20}
              />
            );
          } else if (rn.includes(ROUTES.INFOS)) {
            icon = (
              <Feather
                name="info"
                color={focused ? COLORS.primary : COLORS.gray}
                strokeWidth={3}
                width={20}
                height={20}
              />
            );
          }
          return icon;
        },
      })}
    >
      <Tab.Screen name={ROUTES.HOME} component={Home} />
      <Tab.Screen name={ROUTES.PRODUITS} component={Products} />
      <Tab.Screen name={ROUTES.SOUSCRIPTIONS} component={Souscriptions} />
      <Tab.Screen name={ROUTES.INFOS} component={Infos} />
    </Tab.Navigator>
  );
};

export default MainContainer;
