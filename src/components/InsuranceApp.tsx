import { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { ThemeProvider } from 'react-native-paper';
import RootNavigator from '../navigation/RootNavigator';
import Auth from '../utils/Auth';

const InsuranceApp = ({
  appToken,
  lang,
  terminalId,
  username,
  user,
}: {
  appToken: string;
  lang: string;
  terminalId: string;
  username: string;
  user?: any;
}) => {
  useEffect(() => {
    (async () => {
      await Auth.setToken(appToken);
      await Auth.setLang(lang);
      await Auth.setTerminalId(terminalId);
      await Auth.setUsername(username);
      if ( user ){await Auth.setUser(user);}
    })();
  }, [appToken, terminalId, username, lang, user]);

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
