import { StatusBar, View } from 'react-native';
import RootNavigator from '../navigation/RootNavigator';
import { useEffect } from 'react';
import Auth from '../utils/Auth';
import { ThemeProvider } from 'react-native-paper';
import * as SecureStore  from "expo-secure-store";

const InsuranceApp = ({
  appToken,
  lang,
  terminalId,
  username,
}: {
  appToken: string;
  lang: string;
  terminalId: string;
  username: string;
}) => {
  useEffect(() => {
    (async () => {
      await Auth.setToken(appToken);
      await Auth.setLang(lang);
      await Auth.setTerminalId(terminalId);
      await Auth.setUsername(username);
      const appId = await SecureStore.getItemAsync("app-id")
      console.log("Application id", appId);
    })();
  }, [appToken, terminalId, username, lang]);

  return (
    <ThemeProvider theme={{ dark: false, mode: 'exact' }}>
      <View style={{ flex: 1, height: '100%' }}>
        <StatusBar barStyle={'dark-content'} hidden={false} />
        <RootNavigator />
      </View>
    </ThemeProvider>
  );
};

export default InsuranceApp;
