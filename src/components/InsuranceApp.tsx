import { useEffect } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'react-native-paper';
import RootNavigator from '../navigation/RootNavigator';
import { ProviderCallback } from '../screens/forms/context';
import Auth from '../utils/Auth';

const InsuranceApp = ({
  lang,
  username,
  user,
  onReady,
}: {
  appToken: string;
  lang: string;
  terminalId: string;
  username: string;
  user?: any;
  onReady?: (payload: any) => void;
}) => {
  useEffect(() => {
    (async () => {
      await Auth.setLang(lang);
      await Auth.setUsername(username);
      if ( user ){await Auth.setUser(user);}
    })();
  }, [ username, lang, user]);

  return (
    <ProviderCallback onReady={onReady}>
      <ThemeProvider theme={{ dark: false, mode: 'exact' }}>
        <View style={{ flex: 1, height: '100%' }}>
          <RootNavigator />
        </View>
      </ThemeProvider>
    </ProviderCallback>
  );
};

export default InsuranceApp;
