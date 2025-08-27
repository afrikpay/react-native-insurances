import { StyleSheet, View } from 'react-native';
import { InsuranceApp } from 'react-native-insurances';

export default function Home() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTYyODg2MTgsImV4cCI6MTc1NjM3NTAxOCwicm9sZXMiOlsiUk9MRV9PV05FUiJdLCJ1c2VybmFtZSI6IjIzNzY4MjYwNTk0NSIsInRva2VuS2V5IjoiYUhrMVMyZHZlUzk2VmpWbFJ6aEZjVVYzWVZSbFVUMDkiLCJ0ZXJtaW5hbElkZW50aWZpZXIiOiI5QkUwMzZFNERBQkYxNEMzIiwidGVybWluYWxUeXBlIjoibW9iaWxlIiwidGVybWluYWxVc2VyQWdlbnQiOiJva2h0dHAvNC45LjIiLCJpcEFkZHJlc3MiOiIxNjkuMjU0LjE2OS4xMjYifQ.XrI_oO8FNVeC1jGXfue_1IFYbunhPK1zPHfso0Ac_fweKx1ZjTw6FKiUYQkeY2lZxHSKYNG5Vg5XXX47fvu9IHc1wXDjPJ3TXIxbqAEIf_u0LwID6Vnrkt70UJbznDiMlHZgdiTmWHjfZdTiCne8XlQl0bSyfUjW1Rn6evr5tqvbWMN1VaAEegK8lTWeIk2AEXVsvx4DrhI9zLJbY673Yj2WDjXXupu1KB8-DX4-OM66ZC5wb5ZSTo2RxUINn9VVi41QKmkBPZQPipWj97P6mniMLu7UEt_FYiAESanoXOB8eW-o2Jg8MxL4yRznxQPG5WVwco7Cxs8ZIefD93k3mQ'
    const terminalId = '9BE036E4DABF14C3';
    
    return (
        <View style={styles.container}>
            <InsuranceApp appToken={token} lang="en" terminalId={terminalId} />
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