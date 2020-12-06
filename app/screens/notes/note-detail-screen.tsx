import { Text, View } from 'native-base'
import * as React from 'react'
import { NavigationInjectedProps } from 'react-navigation'
import { ErrorCentered } from '../../components/error'
import { InfusionsoftNote } from '../../sdk'

export interface NoteDetailScreenProps extends NavigationInjectedProps<{ note: InfusionsoftNote }> {}

export const NoteDetailScreen: React.FunctionComponent<NoteDetailScreenProps> = ({ navigation }) => {
  const note = navigation.getParam('note')

  if (!note) {
    return <ErrorCentered msg="Error loading note" />
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>{note.title}</Text>
      <Text>{note.body}</Text>
    </View>
  )
}
