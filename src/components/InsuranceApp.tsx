import { StatusBar, View } from 'react-native'
import RootNavigator from '../navigation/RootNavigator'
import { useEffect } from 'react'
import Auth from '../utils/Auth'

const InsuranceApp = ({ appToken, lang }:{appToken: string, lang: string}) => {
  useEffect(() => {
    ( async() => {
      await Auth.setToken(appToken)
      await Auth.setLang(lang)
    })()    
  }, [appToken])
  
  return (
    <View style={{ flex: 1, height: '100%' }}>
      <StatusBar hidden/>
      <RootNavigator />
    </View>
  )
}

export default InsuranceApp


