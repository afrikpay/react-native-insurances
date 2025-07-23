
import * as SecureStore from 'expo-secure-store';

async function setLang(lang: string) {
  return await SecureStore.setItemAsync('lang-afrikpay-insurance', lang);
}

async function getLang() {
  return await SecureStore.getItemAsync('lang-afrikpay-insurance') as string;
}

async function logout() {
  return await SecureStore.setItemAsync('account-afrikpay-insurance', '');
}

async function setToken(token:string) {
  return await SecureStore.setItemAsync('token-afrikpay-insurance', token);
}

async function getToken() {
  return await SecureStore.getItemAsync('token-afrikpay-insurance') as string | undefined;
}


export default {
  logout,

  setToken,
  getToken,

  getLang,
  setLang

};