import { Picker } from 'native-base'
import * as React from 'react'
import { InfusionsoftCompany, useCompaniesQuery } from '../sdk'
import { ErrorCentered } from './error'
import { LoadingCentered } from './loading'

export interface UiCompanyPickerProps {
  addEmptyItem: boolean
  currentCompanyId: string
  saveCompany: (company: InfusionsoftCompany, reason?: string) => void
}

export const UiCompanyPicker: React.FunctionComponent<UiCompanyPickerProps> = (props) => {
  const { data, error, loading } = useCompaniesQuery()

  if (loading) {
    return <LoadingCentered msg="Loading..." />
  }

  if (error) {
    return <ErrorCentered msg="Error loading accounts" />
  }

  const { companies } = data

  const selectNewCompany = (companyId: string) => {
    const company = companies.find((company) => company?.name === companyId)

    return props.saveCompany(company)
  }

  const pickerItems = companies.map((company) => (
    <Picker.Item key={company?.name} label={company.name} value={company?.name} />
  ))

  if (props.addEmptyItem) {
    pickerItems.unshift(
      <Picker.Item key={null} label={props.currentCompanyId ? 'No filter' : 'Filter by account'} value={null} />,
    )
  }

  return (
    <Picker
      inlineLabel={true}
      placeholder="Account Filter"
      mode="dropdown"
      iosHeader="Select Account"
      selectedValue={props.currentCompanyId}
      onValueChange={(company) => selectNewCompany(company)}
    >
      {pickerItems}
    </Picker>
  )
}
