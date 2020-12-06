import { View } from 'native-base'
import * as React from 'react'
import { Text, TextStyle, ViewStyle } from 'react-native'
import Spinner, { SpinnerType } from 'react-native-spinkit'

export interface LoadingProps {
  size?: number
  type?: SpinnerType
  isVisible?: boolean
  color?: string
  msg?: string
}

const centered: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
}
const message: TextStyle = {
  fontSize: 30,
}

export const Loading: React.FunctionComponent<LoadingProps> = ({
  size = 100,
  type = 'ThreeBounce',
  isVisible = true,
  color = '#4f2d7f',
}) => <Spinner size={size} type={type} color={color} isVisible={isVisible} />

export const LoadingCentered: React.FunctionComponent<LoadingProps> = ({
  size = 100,
  type = 'ThreeBounce',
  isVisible = true,
  color = '#4f2d7f',
  msg,
}) => (
  <View style={centered}>
    {msg ? <Text style={message}>{msg}</Text> : null}
    <Loading size={size} type={type} isVisible={isVisible} color={color} />
  </View>
)
