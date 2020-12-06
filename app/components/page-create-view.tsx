import { Body, Button, Container, Header, Icon, Left, Right, Title, View } from 'native-base'
import * as React from 'react'
import {  ViewStyle } from 'react-native'
import { LoadingCentered } from './loading'

const viewStyle: ViewStyle = {
  flex: 1,
}

export interface PageCreateViewProps {
  header: PageCreateView
  loading: boolean
  scrollView?: boolean
  onBack?: () => void
}

export interface PageCreateView {
  title?: string
}

export const PageCreateView: React.FunctionComponent<PageCreateViewProps> = ({
  header,
  loading,
  // scrollView = true,
  onBack,
  children,
}) => {
  return (
    <Container style={viewStyle}>
      <Header>
        <Left>
          <Button transparent onPress={() => onBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{header.title}</Title>
        </Body>
        <Right />
      </Header>
      <View style={viewStyle}>{loading ? <LoadingCentered /> : children}</View>
      {/*{scrollView ? (*/}
      {/*  <ScrollView style={viewStyle}>{loading ? <LoadingCentered /> : children}</ScrollView>*/}
      {/*) : (*/}
      {/*  <View style={viewStyle}>{loading ? <LoadingCentered /> : children}</View>*/}
      {/*)}*/}
    </Container>
  )
}
