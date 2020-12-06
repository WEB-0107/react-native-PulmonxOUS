import { View } from 'native-base'
import * as React from 'react'
import { Image, ViewStyle } from 'react-native'

const headerLogo = require('../assets/Logo-RGB.png')
const headerStyle: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: 0,
  paddingTop: 20,
}

export const LoginHeader: React.FunctionComponent = () => {
  return (
    <View>
      <View style={headerStyle}>
        <Image source={headerLogo} style={{ width: 250, resizeMode: 'contain' }} />
      </View>
    </View>
  )
}
