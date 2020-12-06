import { Body, Icon, List, ListItem, Right, Text, View } from 'native-base'
import * as React from 'react'
import { useState } from 'react'
import { NavigationInjectedProps } from 'react-navigation'
import { AppConfig } from '../../app-config'
import { ErrorCentered } from '../../components/error'
import { AddButton, LoadingCentered } from '../../components/index'
import { UiSearchBar } from '../../components/ui-search'
import { InfusionsoftCompany, useCompaniesQuery } from '../../sdk'

export interface CompanyListScreenProps extends NavigationInjectedProps<{}> {}

export const CompanyListScreen: React.FunctionComponent<CompanyListScreenProps> = ({ navigation }) => {
  const [query, updateQuery] = useState('')
  const { data, loading, error, refetch } = useCompaniesQuery()

  if (loading) {
    return <LoadingCentered msg="Loading..." />
  }

  if (error) {
    return <ErrorCentered msg="Error loading accounts" report={error} />
  }

  const selectItem = (item) => navigation.navigate('CompanyDetails', { companyId: item.id })

  const createItem = () => navigation.navigate('CompanyCreate', { refetch })

  const renderItem = ({ item }: { item: InfusionsoftCompany }) => {
    const champion = item.customFieldMap[AppConfig.customFieldIdsCompany.Champion]

    return (
      <ListItem onPress={() => selectItem(item)}>
        <Body>
          <Text>{item.name}</Text>
          {champion ? <Text note>{champion}</Text> : <Text note>No Account Champion</Text>}
        </Body>
        <Right>
          <Text>
            <Icon name='chevron-forward'/>
          </Text>
        </Right>
      </ListItem>

    )
  }

  const filtered = data.companies.filter((item) => item?.name?.toLowerCase().includes(query.toLowerCase()))
  return (
    <View style={{ flex: 1 }}>
      <UiSearchBar placeholder="Search Accounts" onChangeText={updateQuery} value={query} />
      {filtered.length > 0 ? (
        <List dataArray={filtered} renderItem={renderItem} />
      ) : (
        <ErrorCentered msg="No accounts found" />
      )}
      <AddButton onPress={createItem} />
    </View>
  )
}
