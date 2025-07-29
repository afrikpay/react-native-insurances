import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Icon from "react-native-feather"
import { COLORS } from '../constants/Colors'
import { ROUTES } from '../constants/Routes'
import Home from '../screens/home'
import Infos from '../screens/infos'
import Products from '../screens/products'
import Souscriptions from '../screens/souscriptions'

const Tab = createBottomTabNavigator()

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
          let rn = route.name
          
          if (rn.includes(ROUTES.HOME)) {
            icon = <Icon.Home color={focused ? COLORS.primary : COLORS.gray} strokeWidth={3} width={20} height={20} />
          }
          else if (rn.includes(ROUTES.PRODUITS)) {
            icon = <Icon.Package color={focused ? COLORS.primary : COLORS.gray} strokeWidth={3} width={20} height={20} />
          }
          else if (rn.includes(ROUTES.SOUSCRIPTIONS)) {
            icon = <Icon.FileText color={focused ? COLORS.primary : COLORS.gray} strokeWidth={3} width={20} height={20} />
          }
          else if (rn.includes(ROUTES.INFOS)) {
            icon = <Icon.Info color={focused ? COLORS.primary : COLORS.gray} strokeWidth={3} width={20} height={20} />
          }
          return icon;
        }
      })}>

    <Tab.Screen
      name={ROUTES.HOME}
      component={Home} />

    <Tab.Screen
      name={ROUTES.PRODUITS}
      component={Products} />

    <Tab.Screen
      name={ROUTES.SOUSCRIPTIONS}
      component={Souscriptions} />

    <Tab.Screen
      name={ROUTES.INFOS}
      component={Infos} />

    </Tab.Navigator>
  )
}

export default MainContainer