import { StatusBar, View } from 'react-native';
import RootNavigator from '../navigation/RootNavigator';
import { useEffect } from 'react';
import Auth from '../utils/Auth';

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
    })();
  }, [appToken, lang]);

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <StatusBar hidden />
      <RootNavigator />
    </View>
  );
};

export default InsuranceApp;
