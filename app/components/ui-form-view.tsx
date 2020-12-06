import { Container, Content, View } from 'native-base'
import React, { FunctionComponent } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

export interface UiFormViewProps {
  saving?: boolean
}

export const UiFormView: FunctionComponent<UiFormViewProps> = ({ children, saving }) => (
  <Container>
    <Content>
      <View style={{ flex: 1 }}>
        <Spinner visible={saving} textContent={'Saving...'} />
        {children}
      </View>
    </Content>
  </Container>
)
