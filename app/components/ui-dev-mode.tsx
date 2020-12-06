import { Text, View } from 'native-base'
import React from 'react'
import { TextStyle, ViewStyle } from 'react-native'
import { spacing } from '../theme'

const developmentMode: ViewStyle = {
  justifyContent: 'center',
  backgroundColor: 'red',
  padding: spacing[4],
  alignContent: 'center',
}
const developmentModeDescription: TextStyle = {
  textAlign: 'center',
  color: 'white',
}
const developmentModeHeader: TextStyle = {
  ...developmentModeDescription,
  fontSize: 20,
  marginBottom: spacing[3],
}

export const UiDevMode: React.FunctionComponent<{ message: string; show: boolean }> = ({ show, message }) => {
  return show ? (
    <View style={developmentMode}>
      <Text style={developmentModeHeader}>Development Mode</Text>
      {message ? <Text style={developmentModeDescription}>{message}</Text> : null}
    </View>
  ) : null
}
