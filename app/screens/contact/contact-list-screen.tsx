import * as React from 'react'
import { AddButton, LoadingCentered } from '../../components'
import { Body, Icon, List, ListItem, Right, Text, View } from 'native-base'
import { ErrorCentered } from '../../components/error'
import { NavigationInjectedProps } from 'react-navigation'
import { UiSearchBar } from '../../components/ui-search'
import { useContactsQuery } from '../../sdk'
import { useState } from 'react'

export interface ContactListScreenProps extends NavigationInjectedProps<{}> {}

export const ContactListScreen: React.FunctionComponent<ContactListScreenProps> = ({ navigation }) => {
  const [query, updateQuery] = useState('')
  const { data, loading, error, refetch } = useContactsQuery()

  if (loading) {
    return <LoadingCentered msg="Loading..." />
  }

  if (error) {
    return <ErrorCentered msg="Error loading contacts" report={error} />
  }

  const selectItem = (item) => navigation.navigate('ContactDetails', { contactId: item.id, refetch })

  const createItem = () => navigation.navigate('ContactCreate', { refetch })

  const renderItem = ({ item }) => (
    <ListItem onPress={() => selectItem(item)}>
      <Body>
        <Text>
          {item.firstName} {item.lastName}
        </Text>
        <Text note>{item.email ? item.email : 'No email address found'}</Text>
      </Body>
      <Right>
        <Text>
          <Icon name='chevron-forward'/>
        </Text>
      </Right>
    </ListItem>
  )

  const filtered = data.contacts.filter((item) => item?.name?.toLowerCase().includes(query.toLowerCase()))

  return (
    <View style={{ flex: 1 }}>
      <UiSearchBar placeholder="Search Contacts" onChangeText={updateQuery} value={query} />
      {filtered?.length ? (
        <List dataArray={filtered} renderItem={renderItem} />
      ) : (
        <ErrorCentered msg="No contacts found" />
      )}
      <AddButton onPress={createItem} />
    </View>
  )
}
