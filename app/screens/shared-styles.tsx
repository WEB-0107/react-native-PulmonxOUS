import { TextStyle, ViewStyle } from 'react-native'
import { color, spacing } from '../theme'

export const FULL: ViewStyle = { flex: 1 }
export const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
}

export const TEXT: TextStyle = {
  color: color.palette.white,
  // fontFamily: 'Montserrat',
}
export const BOLD: TextStyle = { fontWeight: 'bold' }
export const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: 'center',
  marginVertical: spacing[5],
}
export const ERROR: TextStyle = {
  color: 'red',
}
export const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: 'center',
}
export const DESCRIPTION: TextStyle = {
  color: '#BAB6C8',
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
}

export const pageContainer: ViewStyle = {
  backgroundColor: '#ffffff',
}
