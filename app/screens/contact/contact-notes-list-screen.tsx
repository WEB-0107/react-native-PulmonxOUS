import { List, View } from 'native-base'
import * as React from 'react'
import { NavigationInjectedProps } from 'react-navigation'
import { AddButton, LoadingCentered } from '../../components'
import { ErrorCentered } from '../../components/error'
import { UiNoteListScreen } from '../../components/ui-note-list-item'
import { useNotesQuery } from '../../sdk'

export interface ContactNotesListScreenProps extends NavigationInjectedProps<{}> {}

export const ContactNoteListScreen: React.FunctionComponent<ContactNotesListScreenProps> = ({ navigation }) => {
  // @ts-ignore
  const contactId = navigation.getParam('contactId')
  const { data, error, loading, refetch } = useNotesQuery({
    variables: { contactId: contactId },
  })

  if (loading) {
    return <LoadingCentered msg="Loading..." />
  }

  if (error) {
    return <ErrorCentered msg="Error retrieving notes" report={error} />
  }

  const selectNote = (note) => {
    navigation.navigate('ContactNoteDetail', { note })
  }

  const createNote = () => {
    navigation.navigate('ContactNoteCreate', {
      itemId: contactId,
      returnScreen: 'ContactNoteList',
      refetch,
    })
  }

  return (
    <View style={{ flex: 1 }}>
      {data?.infusionsoftNotes?.length ? (
        <List
          dataArray={data.infusionsoftNotes.reverse()}
          renderItem={({ item }) => <UiNoteListScreen item={item} onPress={() => selectNote(item)} />}
        />
      ) : (
        <ErrorCentered msg="No notes found " />
      )}
      <AddButton onPress={createNote} />
    </View>
  )
}
