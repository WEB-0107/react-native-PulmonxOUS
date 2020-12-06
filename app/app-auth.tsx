import AsyncStorage from '@react-native-community/async-storage'
import * as Keychain from 'react-native-keychain'

export const clearCredentials = async () => {
  await Keychain.resetGenericPassword()
}

export const setCredentials = async (credentials) => {
  await Keychain.setGenericPassword('oauth', JSON.stringify(credentials))
}

export const getCredentials = async () => {
  try {
    const credentials = await Keychain.getGenericPassword()
    if (credentials) {
      return JSON.parse(credentials.password)
    }
    return false
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error)
  }
}

export const setToken = async (token: string) => {
  await AsyncStorage.setItem('token', token)
  console.log(`[setToken] ${token}`)
}
export const removeToken = async () => {
  await AsyncStorage.removeItem('token')
  console.log(`[removeToken]`)
}
