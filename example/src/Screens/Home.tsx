import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NjQ5MjUxMTgsImV4cCI6MTc2NTAxMTUxOCwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY1MjMxMDgyOSIsInRva2VuS2V5IjoiZDJ0UU1XMXhZMnhpVDFwMWJEaGtRamRVVFZWNlp6MDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI5QzREMUUxMjM2QzA4MUQxIiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC4xMi4wIiwiaXBBZGRyZXNzIjoiMTY5LjI1NC4xNjkuMTI2In0.JYMmJU1yfqoyfAM875BCtC2Y664VaDVdxtKwKzwF4ydW06ioYHiTpk4D_O5WDWUFxj5V432Xwya5OyIfwKVPK2oHuQhlLjY4LyrXxGcZkb2R-ZC-9LMITysLVNp4yLEbQTTFooSZtQD_E0zHaHvlaLNhZHhY4edwKBOArCVWAiJhBFY7XFt1cgc39k39SVKOIvnSn9Akp1rB86Xz35BRVRAi9qseSfEzfqo0hhI-Ez1S8tsLzA4GZH5DJCedX9OED8czr9fhhvjj2Hdk7jI9L-3AJYIlpfrcq08lzyOzRbAG8PlVn9IX7KVajhdEdlaSgIl4TXqHH8d8AZlSaR2Z1A'
    const terminalId = '9C4D1E1236C081D1';
    
    return (
        <View style={styles.container}>
            <InsuranceApp 
                appToken={token} 
                lang="fr" 
                terminalId={terminalId}
                username="Manu Decca"
                user={{
                    accountId: 1830034508703473,
                    username: "237652310829",
                    name: "KENNE Patrick",
                    phone: "237652310829",
                    email: "patrick1kenne@gmail.com",
                    accountNumber: "237652310829",
                    idNumber: "1234567890",
                    gender: "male",
                    language: "fr",
                    accountStatus: "active",
                    terminalIdentifier: "9C4D1E1236C081D1"
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%"
    }
});