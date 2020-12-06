import { Button, Text } from 'native-base'
import * as React from 'react'
import { TextStyle, ViewStyle } from 'react-native'

export const primaryButtonStyle: ViewStyle = {
  backgroundColor: '#4f2d7f',
  margin: 10,
  marginTop: 20,
  marginBottom: 20,
}
export const buttonTextStyle: TextStyle = {
  textAlign: 'center',
  width: '100%',
}

export interface SaveButtonProps {
  disabled?: boolean
  label?: string
  onPress: (param?: any) => void
}

export const SaveButton: React.FunctionComponent<SaveButtonProps> = ({ label, onPress, disabled }) => {
  return (
    <Button success style={primaryButtonStyle} onPress={onPress} disabled={disabled || false}>
      <Text style={buttonTextStyle}>{label || 'Save '}</Text>
    </Button>
  )
}
