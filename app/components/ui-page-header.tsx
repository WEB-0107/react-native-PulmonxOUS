import { Text, View } from 'native-base'
import * as React from 'react'
import { TextStyle, ViewStyle } from 'react-native'

const pageSection: ViewStyle = {
  padding: 20,
  backgroundColor: '#efefef',
  marginBottom: 20,
}
const pageSectionTitle: TextStyle = {
  fontVariant: [],
}

export interface PageHeaderProps {
  title: string
}

export const UiPageHeader: React.FunctionComponent<PageHeaderProps> = ({ title }) => {
  return (
    <View style={pageSection}>
      <Text style={pageSectionTitle}>{title}</Text>
    </View>
  )
}
