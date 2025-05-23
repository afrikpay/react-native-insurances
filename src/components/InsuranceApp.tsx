import { StatusBar, View } from 'react-native'
import RootNavigator from '../navigation/RootNavigator'

const InsuranceApp = () => {
  return (
    <View style={{ flex: 1, height: '100%' }}>
        <StatusBar hidden/>
        <RootNavigator />
      </View>
  )
}

export default InsuranceApp


