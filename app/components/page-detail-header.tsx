import { Button, Col, Icon, Row, Text, View } from 'native-base'
import * as React from 'react'
import { Image, ImageSourcePropType, TextStyle, ViewStyle } from 'react-native'

const headerWrapper: ViewStyle = {
  backgroundColor: '#efefef',
}
const headerStyle: ViewStyle = {
  justifyContent: 'center',
  paddingBottom: 20,
  backgroundColor: '#dee8ee',
  borderBottomLeftRadius: 20,
}

const headerRows: ViewStyle = {
  paddingBottom: 20,
  paddingTop: 20,
  paddingLeft: 20,
}

const headerTop: ViewStyle = {
  paddingTop: 20,
  backgroundColor: '#dee8ee',
  borderBottomLeftRadius: 20,
}
const headerButtonGroup: ViewStyle = {
  justifyContent: 'space-around',
  alignItems: 'center',
  flexDirection: 'row',
  paddingTop: 10,
}

const imageStyle = {
  width: 35,
  height: 35,
}

const headerButton = {
  marginLeft: 10,
  marginRight: 10,
}

const headerButtonIcon = {
  color: '#3095b4',
  fontSize: 32,
}

const headerTitle: TextStyle = {
  textAlign: 'center',
  fontSize: 20,
  paddingBottom: 10,
}

const headerDescription: TextStyle = {
  fontSize: 16,
  textAlign: 'center',
}

export interface PageHeaderButton {
  action: string
  icon?: string
  iconType?: 'Ionicons' | 'FontAwesome'
  imagePath?: ImageSourcePropType
}

export interface PageDetailProps {
  onPress?: (button: PageHeaderButton) => void
  header: PageHeader
}
export interface PageHeader {
  buttons?: PageHeaderButton[]
  description?: string
  title?: string
  cols?: any[]
}

export const PageDetailHeader: React.FunctionComponent<PageDetailProps> = ({ onPress, header }) => {
  const filter = (items = []) => items.filter((item) => !!item || (item && item.trim() === ''))

  const printItems = (items: string[]) => filter(items).map((item, idx) => <Text key={idx}>{item}</Text>)

  const printCols = (cols: Array<string[]>) => cols.map((items, idx) => <Col key={idx}>{printItems(items)}</Col>)

  const cols = header.cols || []
  return (
    <View style={headerWrapper}>
      <View style={headerStyle}>
        <View style={headerTop}>
          <Text style={headerTitle}>{header.title}</Text>
          <Text style={headerDescription}>{header.description}</Text>
          {cols.length ? <Row style={headerRows}>{printCols(cols)}</Row> : <Text> </Text>}
        </View>
        <View style={headerButtonGroup}>
          {header?.buttons?.map((button, idx) => (
            <Button style={headerButton} key={idx} onPress={() => onPress(button)} transparent>
              {button.icon ? <Icon style={headerButtonIcon} name={button.icon} type={button.iconType} /> : null}
              {button.imagePath ? <Image source={button.imagePath} style={imageStyle} /> : null}
            </Button>
          ))}
        </View>
      </View>
    </View>
  )
}
