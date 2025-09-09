import * as SecureStore from 'expo-secure-store';
import type { User } from '../types';

async function setLang(lang: string) {
  return await SecureStore.setItemAsync('lang-afrikpay-insurance', lang);
}

async function getLang() {
  return (await SecureStore.getItemAsync('lang-afrikpay-insurance')) as string;
}

async function logout() {
  return await SecureStore.setItemAsync('account-afrikpay-insurance', '');
}

async function setToken(token: string) {
  return await SecureStore.setItemAsync('token-afrikpay-insurance', token);
}

async function getToken() {
  return (await SecureStore.getItemAsync('token-afrikpay-insurance')) as
    | string
    | undefined;
}

async function setTerminalId(terminalId: string) {
  return await SecureStore.setItemAsync('terminal-identifier-afrikpay-insurance', terminalId);
}

async function getTerminalId() {
  return (await SecureStore.getItemAsync('terminal-identifier-afrikpay-insurance')) as
    | string
    | undefined;
}


async function setUsername(username: string) {
  return await SecureStore.setItemAsync('username-afrikpay-insurance', username);
}

async function getUsername() {
  return (await SecureStore.getItemAsync('username-afrikpay-insurance')) as
    | string
    | undefined;
}

async function setUser(user: User) {
  return await SecureStore.setItemAsync('user-afrikpay', JSON.stringify(user));
}

async function getUser() {
  const user = (await SecureStore.getItemAsync('user-afrikpay')) as
    | string
    | undefined;
  if (user != undefined) return JSON.parse(user) as User
  else return undefined
}

export default {
  logout,
  setToken,
  getToken,
  getLang,
  setLang,
  setTerminalId,
  getTerminalId,

  setUsername,
  getUsername,

  setUser,
  getUser,
};
