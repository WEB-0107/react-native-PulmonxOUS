import { Body, Icon, ListItem, Right, Text } from 'native-base'
import * as React from 'react'

export interface UiNoteListItemProps {
  item: any
  onPress: () => void
}

export const UiNoteListScreen: React.FunctionComponent<UiNoteListItemProps> = ({ item, onPress }) => (
  <ListItem onPress={onPress}>
    <Body>
      <Text>{item.title}</Text>
      <Text note>{item.body ? item.body : ' [empty] '}</Text>
    </Body>
    <Right>
      <Text>
        <Icon name='chevron-forward'/>
      </Text>
    </Right>
  </ListItem>
)
