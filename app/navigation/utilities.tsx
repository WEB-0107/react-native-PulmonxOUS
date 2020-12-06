import { Platform } from 'react-native'
export const getDeepLink = (path = '') => {
  const scheme = 'com.pulmonx.ous'
  // const prefix = Platform.OS === 'android' ? `${scheme}://my-host/` : `${scheme}://`
  const prefix = Platform.OS === 'android' ? `${scheme}://` : `${scheme}://`
  return prefix + path
}
