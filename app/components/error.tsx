import { View, Text } from 'native-base'
import * as React from 'react'
import { ViewStyle } from 'react-native'
// import { rollbar } from '../app-rollbar'

export interface ErrorProps {
  msg?: string
  report?: any | object
}

const centered: ViewStyle = {
  alignItems: 'center',
  marginTop: 100,
  height: 100,
}

export const Error: React.FunctionComponent<ErrorProps> = ({ msg, children }) => (
  <View>
    {msg && <Text>{msg}</Text>}
    {children && children}
  </View>
)

export const ErrorCentered: React.FunctionComponent<ErrorProps> = ({ msg, report, children }) => {
  if (report) {
    // rollbar.error(msg, report)
  }
  return (
    <View style={centered}>
      <Error msg={msg}>{children}</Error>
    </View>
  )
}
