import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../constants/Colors';
import { ROUTES } from '../constants/Routes';
import Home from '../screens/home';
import Infos from '../screens/infos';
import Products from '../screens/products';
import Souscriptions from '../screens/souscriptions';
import i18n from '../translations/i18n';

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <Tab.Navigator
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
              <AntDesign name="home" size={24} color={focused ? COLORS.primary : COLORS.gray} />
            );
          } else if (rn.includes(ROUTES.PRODUITS)) {
            icon = (
              <AntDesign name="isv" size={24} color={focused ? COLORS.primary : COLORS.gray} />
            );
          } else if (rn.includes(ROUTES.SOUSCRIPTIONS)) {
            icon = (
              <AntDesign name="filetext1" size={24} color={focused ? COLORS.primary : COLORS.gray} />
            );
          } else if (rn.includes(ROUTES.INFOS)) {
            icon = (
              <AntDesign name="infocirlceo" size={24} color={focused ? COLORS.primary : COLORS.gray} />
            );
          }
          return icon;
        },
      })}
    >
      <Tab.Screen 
        options={{ tabBarLabel: i18n('home') }}
        name={ROUTES.HOME} component={Home}
      />
      <Tab.Screen 
        options={{ tabBarLabel: i18n('produits') }}
        name={ROUTES.PRODUITS} component={Products}
      />
      <Tab.Screen 
        options={{ tabBarLabel: i18n('souscriptions') }}
        name={ROUTES.SOUSCRIPTIONS} component={Souscriptions}
      />
      <Tab.Screen
        options={{ tabBarLabel: i18n('infos') }}
        name={ROUTES.INFOS} component={Infos}
      />
    </Tab.Navigator>
  );
};

export default MainContainer;
