import { Icon } from 'native-base'
import * as React from 'react'
import { Image, ImageStyle, TextStyle, View, ViewStyle } from 'react-native'
import { Text } from '../text/text'
import { spacing } from '../../theme'
import { BrandProps } from './brand.props'

export const brandLogo = require('./kikstart-logo.png')

const BRAND: ImageStyle = {
  alignSelf: 'center',
  height: 100,
  width: 100,
  borderRadius: 10,
}

const ROOT: ViewStyle = {
  alignContent: 'center',
  paddingTop: spacing[5],
  paddingBottom: spacing[5],
}
const TEXT: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: spacing[4],
  alignItems: 'center',
  paddingTop: spacing[5],
  paddingBottom: spacing[5],
  justifyContent: 'flex-start',
}
const TEXT_SHADOW: Text = {
  textShadowColor: '#555',
  textShadowOffset: { height: 0, width: 0 },
  textShadowRadius: 5,
}
const TEXT_NAME: TextStyle = {
  fontSize: 30,
  fontWeight: '500',
  paddingLeft: 10,
  ...TEXT_SHADOW,
}
const TEXT_SEPARATOR: TextStyle = {
  color: '#999',
  fontSize: 30,
  fontWeight: '500',
  paddingLeft: 5,
  ...TEXT_SHADOW,
}
const TEXT_PRODUCT: TextStyle = {
  color: '#efefef',
  fontSize: 30,
  fontWeight: '300',
  paddingLeft: 5,
  ...TEXT_SHADOW,
}
export const Brand: React.FunctionComponent<BrandProps> = (props) => {
  const { style, name = 'kikstart', separator = '.', product = 'dev', source = brandLogo } = props
  return (
    <View style={{ ...ROOT, ...style }}>
      <View>
        <Image source={source} style={BRAND} />
        <Icon name="ios-rocket" />
      </View>
      <View style={{ ...TEXT }}>
        <Text style={TEXT_NAME} text={name} />
        <Text style={TEXT_SEPARATOR} text={separator} />
        <Text style={TEXT_PRODUCT} text={product} />
      </View>
    </View>
  )
}
