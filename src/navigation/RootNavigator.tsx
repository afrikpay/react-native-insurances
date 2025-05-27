import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS } from "../constants/Colors";
import { ROUTES } from "../constants/Routes";
import AppStack from "./AppStack";
import Navigation from '../services/Navigation'
import { height, width } from "../constants/size";
import { PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();

const RootNavigator = () => {
    return (
        <PaperProvider>
            <SafeAreaProvider style={{ height: height, width: width }}>
                <NavigationContainer
                    ref={r => Navigation.setTopLevelNavigator(r)}
                    >
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
                        }}>
                        
                        <Stack.Screen
                            name={ROUTES.APPSTACK}
                            component={AppStack}
                        />
                    </Stack.Navigator>
                
                </NavigationContainer>
            </SafeAreaProvider>
        </PaperProvider>
    )
}

export default RootNavigator