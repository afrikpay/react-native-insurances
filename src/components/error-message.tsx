import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

export default function ErrorMessage({ message }: { message: string }) {
  if (!message) {
    return null
  }
  return (
    <View style={styles.errorContainer}>
      <Ionicons name="warning-outline" size={20} color="#e10019" />
      <Text style={styles.errorText}>{ message }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe6e6',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#e10019',
  },
  errorText: {
    color: '#e10019',
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
})