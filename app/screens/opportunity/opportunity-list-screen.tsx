import moment from 'moment-timezone'
import { Body, Col, Grid, Icon, List, ListItem, Right, Text, View } from 'native-base'
import * as React from 'react'
import { orderBy } from 'lodash'
import { useEffect, useState } from 'react'
import { Alert, Modal, StyleSheet } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { NavigationInjectedProps } from 'react-navigation'
import { ErrorCentered } from '../../components/error'
import { AddButton, LoadingCentered } from '../../components'
import { UiCompanyPicker } from '../../components/ui-company-picker'
import { UiContactPicker } from '../../components/ui-contact-picker'
import { DateRange, UiDateRangePicker } from '../../components/ui-date-range-picker'
import { UiSearchBar } from '../../components/ui-search'
import { SortFilter, UiSortPicker } from '../../components/ui-sort-picker'
import { UiStagePicker } from '../../components/ui-stage-picker'

import {
  InfusionsoftCompany,
  InfusionsoftContact,
  InfusionsoftOpportunity,
  useCompaniesQuery,
  useContactsQuery,
  useOpportunitiesQuery,
  useOpportunityStagesQuery,
} from '../../sdk'

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  openButton: {
    backgroundColor: '#ededed',
    borderRadius: 10,
    elevation: 2,
    padding: 10,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
export interface OpportunityListScreenProps extends NavigationInjectedProps<{}> {}

const pickerOptions: SortFilter[] = [
  { key: 'created', dir: 'asc', label: 'Case Created Date (Old to New)' },
  { key: 'created', dir: 'desc', label: 'Case Created Date (New to Old) (default)' },
  { key: 'estimatedCloseDate', dir: 'asc', label: 'Case Scheduled Date (Old to New)' },
  { key: 'estimatedCloseDate', dir: 'desc', label: 'Case Scheduled Date (New to Old)' },
  { key: 'contact.name', dir: 'asc', label: 'Contact Name (A to Z)' },
  { key: 'contact.name', dir: 'desc', label: 'Contact Name (Z to A)' },
]

export const OpportunityListScreen: React.FunctionComponent<OpportunityListScreenProps> = ({ navigation }) => {
  // @ts-ignore
  const contactId = navigation.getParam('contactId')
  const [companyFilterName, setCompanyFilterName] = useState(null)
  const [modalVisible, setModalVisible] = useState(null)
  const [contactFilterId, setContactFilterId] = useState(null)
  const [sortFilter, setSortFilter] = useState<SortFilter>(pickerOptions[1])
  const [caseScheduledDateRange, setCaseScheduledDateRange] = useState<DateRange>(null)
  const [caseCreatedDateRange, setCaseCreatedDateRange] = useState<DateRange>(null)
  const [stageFilterIds, setStageFilterIds] = useState<string[]>(null)
  const [query, updateQuery] = useState('')
  const { loading: companiesLoading } = useCompaniesQuery()
  const { loading: contactsLoading } = useContactsQuery()
  const { data, loading, error, refetch } = useOpportunitiesQuery({
    fetchPolicy: 'network-only',
  })
  const { data: stagesData, error: stagesError, loading: stagesLoading } = useOpportunityStagesQuery()

  useEffect(() => {
    setContactFilterId(typeof contactId === 'undefined' ? null : contactId)
  }, [contactId])

  if (loading || stagesLoading || contactsLoading || companiesLoading) {
    return <LoadingCentered msg="Loading..." />
  }

  if (error || stagesError || !stagesData || !data || !data.opportunities) {
    return <ErrorCentered msg="Error loading cases" report={error || stagesError} />
  }

  const selectOpportunity = (item) => navigation.navigate('OpportunityDetails', { refetch, opportunityId: item.id })

  const createOpportunity = () => navigation.navigate('OpportunityCreate', { refetch })

  const formatWithMoment = (date?: string) => {
    return moment(date).format('dddd, MMM Do YYYY')
  }

  const renderItem = ({ item }: { item: InfusionsoftOpportunity }) => (
    <ListItem onPress={() => selectOpportunity(item)}>
      <Body>
        <View>
          <Text style={{}}>{item.title}</Text>
        </View>
        <View style={{ marginTop: 4 }}>
          <Text note>{item.contact.name ? item.contact.name : 'No contact assigned'}</Text>
        </View>
        <View style={{ marginTop: 4 }}>
          <Text note>{item.stage.name ? item.stage.name : 'No stage assigned'}</Text>
        </View>
        <View style={{ marginTop: 4 }}>
          <Text note>
            {item.estimatedCloseDate ? formatWithMoment(item.estimatedCloseDate) : 'No case scheduled date'}
          </Text>
        </View>
      </Body>
      <Right>
        <Text>
          <Icon name='chevron-forward'/>
        </Text>
      </Right>
    </ListItem>
  )

  const clearFilters = () => {
    setCompanyFilterName(null)
    setContactFilterId(null)
    setStageFilterIds(null)
    setCaseScheduledDateRange(null)
    setCaseCreatedDateRange(null)
    setModalVisible(false)
  }

  const filterTitle = (item: InfusionsoftOpportunity) => item?.title?.toLowerCase().includes(query.toLowerCase().trim())

  const filterContactId = (item: InfusionsoftOpportunity) =>
    contactFilterId ? item.contact?.id?.toString() === contactFilterId?.toString() : true

  const filterCompanyName = (item: InfusionsoftOpportunity) => {
    return companyFilterName ? item.contact?.companyName?.toString() === companyFilterName?.toString() : true
  }

  const filterStageIds = (item: InfusionsoftOpportunity) =>
    stageFilterIds?.length ? stageFilterIds.includes(item.stage?.id?.toString()) : true

  const filterCaseScheduledDateRange = (item: InfusionsoftOpportunity) => {
    const filterDate = item.estimatedCloseDate

    const startFilter = caseScheduledDateRange?.start
      ? new Date(filterDate) >= new Date(caseScheduledDateRange.start)
      : true
    const endFilter = caseScheduledDateRange?.end ? new Date(filterDate) <= new Date(caseScheduledDateRange.end) : true

    return caseScheduledDateRange ? startFilter && endFilter : true
  }

  const filterCaseCreatedDateRange = (item: InfusionsoftOpportunity) => {
    const filterDate = item.created ? item.created.split('T')[0] : null

    const startFilter = caseCreatedDateRange?.start ? new Date(filterDate) > new Date(caseCreatedDateRange.start) : true
    const endFilter = caseCreatedDateRange?.end ? new Date(filterDate) < new Date(caseCreatedDateRange.end) : true

    return caseCreatedDateRange ? startFilter && endFilter : true
  }

  const filtered = data?.opportunities
    .filter(filterTitle)
    .filter(filterContactId)
    .filter(filterCompanyName)
    .filter(filterStageIds)
    .filter(filterCaseScheduledDateRange)
    .filter(filterCaseCreatedDateRange)

  function selectCompany(company: InfusionsoftCompany) {
    setCompanyFilterName(company?.name ? company.name : null)
  }

  function selectContact(contact: InfusionsoftContact) {
    setContactFilterId(contact?.id ? contact.id : null)
  }

  function selectCaseScheduledDateRange(range: DateRange) {
    setCaseScheduledDateRange(range)
  }

  function selectCaseCreatedDateRange(range: DateRange) {
    setCaseCreatedDateRange(range)
  }

  function selectSortFilter(filter: SortFilter) {
    setSortFilter(filter)
  }

  function selectStage(stageIds: string[]) {
    setStageFilterIds(stageIds?.length ? stageIds : null)
  }

  function sortFiltered(items) {
    const sorted = orderBy(items, sortFilter.key)
    return sortFilter.dir === 'desc' ? sorted.reverse() : sorted
  }

  return (
    <View style={{ flex: 1 }}>
      <UiSearchBar placeholder="Search Cases" onChangeText={updateQuery} value={query} />

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true)
        }}
      >
        <Text style={styles.textStyle}>Show Filters</Text>
      </TouchableHighlight>
      <Text style={{ textAlign: 'center', padding: 12 }}>{filtered?.length} Cases Found</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 10 }}>Filter by Case Scheduled Date</Text>
            <UiDateRangePicker
              label="Case Scheduled Date"
              currentDateRange={caseScheduledDateRange}
              saveDateRange={selectCaseScheduledDateRange}
            />
            <Text style={{ fontSize: 10 }}>Filter by Case Created Date</Text>
            <UiDateRangePicker
              label="Case Created Date"
              currentDateRange={caseCreatedDateRange}
              saveDateRange={selectCaseCreatedDateRange}
            />
            <Text style={{ fontSize: 10 }}>Filter by Contact</Text>
            <UiContactPicker addEmptyItem={true} currentContactId={contactFilterId} saveContact={selectContact} />
            <Text style={{ fontSize: 10 }}>Filter by Account</Text>
            <UiCompanyPicker addEmptyItem={true} currentCompanyId={companyFilterName} saveCompany={selectCompany} />
            <Text style={{ fontSize: 10 }}>Filter by Stages</Text>
            <UiStagePicker currentStageIds={stageFilterIds} saveStage={selectStage} />
            <Text style={{ fontSize: 10, marginTop: 12 }}>Choose Sort Order</Text>
            <UiSortPicker filters={pickerOptions} currentFilter={sortFilter} selectFilter={selectSortFilter} />

            <Grid>
              <Col>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#4f2d7f', margin: 15 }}
                  onPress={() => {
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text style={{ ...styles.textStyle, color: 'white' }}>Set Filters</Text>
                </TouchableHighlight>
              </Col>
              <Col>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#4f2d7f', margin: 15 }}
                  onPress={() => clearFilters()}
                >
                  <Text style={{ ...styles.textStyle, color: 'white' }}>Clear Filters</Text>
                </TouchableHighlight>
              </Col>
            </Grid>
          </View>
        </View>
      </Modal>

      {filtered?.length > 0 ? (
        <List dataArray={sortFiltered(filtered)} renderItem={renderItem} />
      ) : (
        <ErrorCentered msg="No Cases Found" />
      )}
      <AddButton onPress={createOpportunity} />
    </View>
  )
}
