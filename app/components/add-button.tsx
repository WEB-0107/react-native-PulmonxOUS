import { Fab, Icon } from 'native-base'
import React from 'react'
import { ViewStyle } from 'react-native'

const addButton: ViewStyle = {
  backgroundColor: '#4f2d7f',
  margin: 0,
  padding: 0,
}

export interface AddButtonProps {
  onPress: () => void
}

export const AddButton: React.FunctionComponent<AddButtonProps> = ({ onPress }) => {
  return (
    <Fab containerStyle={{}} style={addButton} position="bottomRight" onPress={onPress}>
      <Icon name="ios-add" style={{ fontSize: 50, paddingTop: 28, paddingLeft: 4 }} />
    </Fab>
  )
}
