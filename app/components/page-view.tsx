import { Body, Button, Container, Header, Icon, Input, Item, Left, Right, Title, View } from 'native-base'
import * as React from 'react'
import { useState } from 'react'
import { ViewStyle } from 'react-native'
import { LoadingCentered } from './loading'

const viewStyle: ViewStyle = {
  flex: 1,
}

export interface PageViewProps {
  header: PageView
  loading?: boolean
}
export interface PageView {
  icon?: string
  title?: string
}

export const PageView: React.FunctionComponent<PageViewProps> = ({ header, loading, children }) => {
  const [search, showSearch] = useState(false)
  return (
    <Container>
      {!search && (
        <Header>
          <Left />
          <Body>
            <Title>{header.title}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => showSearch(!search)}>
              <Icon name="search" />
            </Button>
          </Right>
        </Header>
      )}
      {search && (
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name={header.icon} />
          </Item>
          <Button transparent onPress={() => showSearch(!search)}>
            <Icon name="close" />
          </Button>
        </Header>
      )}
      <View style={viewStyle}>{loading ? <LoadingCentered /> : children}</View>
    </Container>
  )
}
