import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

export default function ErrorMessage({ message, bgColor, borderLeftColor, iconColor, errorText, children }: { 
  message: string, bgColor?: string, borderLeftColor?: string, iconColor?: string, errorText? : string, children?: React.ReactNode}) {
  if (!message) {
    return null
  }
  return (
    <View style={[styles.errorContainer, { 
      backgroundColor: bgColor ?? '#ffe6e6', 
      borderLeftColor: borderLeftColor ?? '#e10019'}
      ]}> 
      <View style={{ flexDirection: 'row',
        alignItems: 'center', }}>
        <Ionicons name="warning-outline" size={20} color={iconColor ?? "#e10019"} />
        <Text style={[styles.errorText, {color: errorText ?? '#e10019'}]}>{ message }</Text>
      </View>
      <View>
        { children }
      </View>
    </View>
  )
} 

const styles = StyleSheet.create({
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    borderLeftWidth: 4
  },
  errorText: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
})