import { List, View } from 'native-base'
import * as React from 'react'
import { NavigationInjectedProps } from 'react-navigation'
import { AddButton, LoadingCentered } from '../../components'
import { ErrorCentered } from '../../components/error'
import { UiNoteListScreen } from '../../components/ui-note-list-item'
import { useNotesQuery } from '../../sdk'

export interface CompanyNotesListScreenProps extends NavigationInjectedProps<{}> {}

export const CompanyNoteListScreen: React.FunctionComponent<CompanyNotesListScreenProps> = ({ navigation }) => {
  //@ts-ignore
  const companyId = navigation.getParam('companyId')
  const { data, loading, refetch } = useNotesQuery({
    variables: { contactId: companyId },
  })

  if (loading) {
    return <LoadingCentered msg="Loading..." />
  }

  const selectNote = (note) => {
    navigation.navigate('CompanyNoteDetail', { note })
  }

  const createNote = () => {
    navigation.navigate('CompanyNoteCreate', {
      itemId: companyId,
      returnScreen: 'CompanyNoteList',
      refetch,
    })
  }

  return (
    <View style={{ flex: 1 }}>
      {data?.infusionsoftNotes?.length ? (
        <List
          dataArray={data?.infusionsoftNotes.reverse()}
          renderItem={({ item }) => <UiNoteListScreen item={item} onPress={() => selectNote(item)} />}
        />
      ) : (
        <ErrorCentered msg="No notes found" />
      )}
      <AddButton onPress={createNote} />
    </View>
  )
}
