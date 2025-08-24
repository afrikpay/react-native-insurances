import React from 'react';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator } from 'react-native';

interface WebviewScreenProps {
  paymentUrl: string;
  onPaymentSuccess?: () => void;
  onPaymentFailed?: () => void;
  onPaymentCancel?: () => void;
}

const WebviewScreen: React.FC<WebviewScreenProps> = ({
  paymentUrl,
  onPaymentSuccess,
  onPaymentFailed,
  onPaymentCancel,
}) => {
  const handleUrlCheck = (url: string) => {
    if (url.includes('accept') && onPaymentSuccess) {
      console.log('Accept', url);
      onPaymentSuccess();
    }
    if (url.includes('decline') && onPaymentFailed) {
      console.log('Decline', url);
      onPaymentFailed();
    }
    if (url.includes('cancel') && onPaymentCancel) {
      console.log('Cancel', url);
      onPaymentCancel();
    }
  };

  return (
    <WebView
      source={{ uri: paymentUrl }}
      startInLoadingState
      onNavigationStateChange={(navState) => {
        handleUrlCheck(navState.url);
      }}
      onLoadEnd={({ nativeEvent }) => {
        handleUrlCheck(nativeEvent.url);
      }}
      renderLoading={() => (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    />
  );
};

export default WebviewScreen;
